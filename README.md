# Seqgen

Набор генераторов криптографически стойких данных на React Router v7 SSR,
React, TypeScript, TanStack Query, Axios, Tailwind CSS, Framer Motion и
i18next.

## Локальная разработка

```bash
npm ci
npm run dev
```

Проверка и production-сборка:

```bash
npm run typecheck
npm run build
```

Описание серверного API находится в [API_DOCS.md](./API_DOCS.md).

## Docker-образ

Production-образ собирается из `Dockerfile`. Приложение внутри контейнера
слушает порт `3000` и содержит health check для `/api/health`.

Локальная сборка и запуск:

```bash
docker build -t seqgen:local .
docker run --rm -p 3000:3000 seqgen:local
```

После запуска сайт доступен по адресу `http://localhost:3000`.

## Публикация через GitHub Actions

Workflow `.github/workflows/docker-publish.yml` запускается при отправке любого
Git-тега. Он собирает образы для `linux/amd64` и `linux/arm64`, после чего
публикует их в GitHub Container Registry:

```text
ghcr.io/vanyakrotov/seqgen
```

Для выпуска версии создайте и отправьте тег:

```bash
git tag v1.0.0
git push origin v1.0.0
```

После успешной сборки будут опубликованы теги `v1.0.0`, `1.0.0`, `1.0`, `1`
и `latest`. Дополнительные secrets для workflow не требуются: публикация
выполняется с помощью встроенного `GITHUB_TOKEN`.

Если GHCR-пакет должен скачиваться без авторизации, установите для него
видимость `Public` в настройках пакета на GitHub.

## Развёртывание на Ubuntu

Скрипт `scripts/deploy.sh` поддерживает Ubuntu, устанавливает Docker Engine и
необходимые плагины из официального репозитория Docker, скачивает образ и
запускает контейнер с политикой перезапуска `unless-stopped`.

Первое развёртывание из клонированного репозитория:

```bash
sudo bash scripts/deploy.sh v1.0.0
```

Либо без клонирования репозитория:

```bash
curl -fsSL \
  https://raw.githubusercontent.com/VanyaKrotov/seqgen/main/scripts/deploy.sh \
  -o /tmp/seqgen-deploy.sh
sudo bash /tmp/seqgen-deploy.sh v1.0.0
```

Первый аргумент задаёт тег образа. Второй необязательный аргумент задаёт
внешний порт:

```bash
sudo bash scripts/deploy.sh v1.0.0 8080
```

В этом примере Seqgen будет доступен на `http://SERVER_IP:8080`.

### Обновление контейнера

Для обновления вызовите тот же скрипт с новым тегом:

```bash
sudo bash scripts/deploy.sh v1.1.0
```

Скрипт сначала скачает новый образ, затем заменит существующий контейнер
`seqgen` и дождётся успешного health check.

Для обновления до образа с тегом `latest` аргумент можно не передавать:

```bash
sudo bash scripts/deploy.sh
```

### Переменные окружения

Поведение скрипта можно изменить переменными:

| Переменная | Значение по умолчанию | Назначение |
| --- | --- | --- |
| `SEQGEN_IMAGE` | `ghcr.io/vanyakrotov/seqgen` | Адрес Docker-образа |
| `SEQGEN_PORT` | `3000` | Внешний порт, если второй аргумент не указан |
| `SEQGEN_BIND_ADDRESS` | `0.0.0.0` | Адрес привязки порта |
| `SEQGEN_CONTAINER_NAME` | `seqgen` | Имя контейнера |
| `GHCR_USERNAME` | `vanyakrotov` | Пользователь GHCR |
| `GHCR_TOKEN` | не задан | Токен для скачивания приватного образа |

Чтобы открыть сервис только для локального reverse proxy:

```bash
sudo env SEQGEN_BIND_ADDRESS=127.0.0.1 \
  bash scripts/deploy.sh v1.0.0
```

Для приватного GHCR-пакета создайте GitHub Personal Access Token с правом
`read:packages` и передайте его скрипту:

```bash
sudo env \
  GHCR_USERNAME=YOUR_GITHUB_USERNAME \
  GHCR_TOKEN=YOUR_GITHUB_TOKEN \
  bash scripts/deploy.sh v1.0.0
```

Не добавляйте токен в репозиторий или текст самого скрипта.

## Управление контейнером

```bash
sudo docker ps --filter name=seqgen
sudo docker logs -f seqgen
sudo docker restart seqgen
sudo docker stop seqgen
```
