#!/usr/bin/env bash

set -Eeuo pipefail

IMAGE="${SEQGEN_IMAGE:-ghcr.io/vanyakrotov/seqgen}"
TAG="${1:-latest}"
HOST_PORT="${2:-${SEQGEN_PORT:-3000}}"
CONTAINER_NAME="${SEQGEN_CONTAINER_NAME:-seqgen}"
BIND_ADDRESS="${SEQGEN_BIND_ADDRESS:-0.0.0.0}"

log() {
  printf '[seqgen] %s\n' "$1"
}

fail() {
  printf '[seqgen] Error: %s\n' "$1" >&2
  exit 1
}

if [[ "${EUID}" -ne 0 ]]; then
  fail "Run this script as root, for example: sudo bash scripts/deploy.sh ${TAG}"
fi

if [[ ! "${HOST_PORT}" =~ ^[0-9]+$ ]] || (( HOST_PORT < 1 || HOST_PORT > 65535 )); then
  fail "Port must be an integer between 1 and 65535."
fi

if [[ ! -r /etc/os-release ]]; then
  fail "Unable to determine the operating system."
fi

# shellcheck disable=SC1091
source /etc/os-release

if [[ "${ID:-}" != "ubuntu" ]]; then
  fail "This deployment script supports Ubuntu only."
fi

export DEBIAN_FRONTEND=noninteractive

log "Installing system dependencies"
apt-get update
apt-get install -y --no-install-recommends ca-certificates curl

install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg \
  -o /etc/apt/keyrings/docker.asc
chmod a+r /etc/apt/keyrings/docker.asc

ARCHITECTURE="$(dpkg --print-architecture)"
UBUNTU_SUITE="${UBUNTU_CODENAME:-${VERSION_CODENAME}}"
printf '%s\n' \
  "Types: deb" \
  "URIs: https://download.docker.com/linux/ubuntu" \
  "Suites: ${UBUNTU_SUITE}" \
  "Components: stable" \
  "Architectures: ${ARCHITECTURE}" \
  "Signed-By: /etc/apt/keyrings/docker.asc" \
  > /etc/apt/sources.list.d/docker.sources

apt-get update
apt-get install -y \
  docker-ce \
  docker-ce-cli \
  containerd.io \
  docker-buildx-plugin \
  docker-compose-plugin

systemctl enable --now docker

if [[ -n "${GHCR_TOKEN:-}" ]]; then
  log "Authenticating with GitHub Container Registry"
  printf '%s' "${GHCR_TOKEN}" | docker login ghcr.io \
    --username "${GHCR_USERNAME:-vanyakrotov}" \
    --password-stdin
fi

FULL_IMAGE="${IMAGE}:${TAG}"

log "Pulling ${FULL_IMAGE}"
docker pull "${FULL_IMAGE}"

if docker container inspect "${CONTAINER_NAME}" >/dev/null 2>&1; then
  log "Removing the previous ${CONTAINER_NAME} container"
  docker rm --force "${CONTAINER_NAME}" >/dev/null
fi

log "Starting ${CONTAINER_NAME}"
docker run --detach \
  --name "${CONTAINER_NAME}" \
  --restart unless-stopped \
  --publish "${BIND_ADDRESS}:${HOST_PORT}:3000" \
  --env NODE_ENV=production \
  "${FULL_IMAGE}" >/dev/null

log "Waiting for the container health check"
for _ in {1..30}; do
  STATUS="$(docker inspect \
    --format '{{if .State.Health}}{{.State.Health.Status}}{{else}}{{.State.Status}}{{end}}' \
    "${CONTAINER_NAME}")"

  if [[ "${STATUS}" == "healthy" ]]; then
    log "Deployment completed: http://${BIND_ADDRESS}:${HOST_PORT}"
    docker ps --filter "name=^/${CONTAINER_NAME}$"
    exit 0
  fi

  if [[ "${STATUS}" == "unhealthy" || "${STATUS}" == "exited" || "${STATUS}" == "dead" ]]; then
    docker logs --tail 100 "${CONTAINER_NAME}" >&2 || true
    fail "Container entered the ${STATUS} state."
  fi

  sleep 2
done

docker logs --tail 100 "${CONTAINER_NAME}" >&2 || true
fail "Container did not become healthy in time."
