# Seqgen API

Seqgen exposes a JSON API for cryptographically secure server-side generation. All generator endpoints use Node.js `crypto`; responses are never cacheable.

## Base URL

Local development: `http://localhost:5173/api`

## Common request

`POST /api/generate/{type}` is the recommended request format. Send options as a JSON request body with `Content-Type: application/json`.

`GET /api/generate/{type}` is also available when options must be passed in headers:

```http
X-Data: <Base64-encoded UTF-8 JSON>
X-Language: en
```

`X-Data` is standard Base64 for the UTF-8 bytes of the JSON object. `X-Language` controls error messages and supports `en`, `ru`, `de`, `fr`, and `es`; missing or unsupported values fall back to English. `X-Language` can also be supplied with POST requests.

Common field:

| Field | Type | Default | Limits | Description |
| --- | --- | --- | --- | --- |
| `quantity` | integer | `1` | `1..50` | Number of values returned |

Successful response:

```json
{
  "type": "password",
  "values": ["example"],
  "generatedAt": "2026-06-09T18:00:00.000Z"
}
```

Validation error (`400`):

```json
{ "error": "Validation message" }
```

Unknown type returns `404`. Invalid or missing `X-Data`, invalid Base64, and invalid JSON return `400`. Unsupported methods return `405` with `Allow: GET, POST`.

## Password

`GET` or `POST /api/generate/password`

| Field | Type | Default | Limits |
| --- | --- | --- | --- |
| `length` | integer | `20` | `6..128` |
| `uppercase` | boolean | `true` | |
| `lowercase` | boolean | `true` | |
| `numbers` | boolean | `true` | |
| `symbols` | boolean | `true` | |

At least one character set must be selected. The result includes at least one character from each selected set.

```bash
# POST (recommended)
curl -X POST http://localhost:5173/api/generate/password \
  -H "Content-Type: application/json" \
  -H "X-Language: en" \
  -d '{"length":32,"symbols":true,"quantity":2}'

# GET: X-Data is Base64 for {"length":32,"symbols":true,"quantity":2}
curl http://localhost:5173/api/generate/password \
  -H "X-Data: eyJsZW5ndGgiOjMyLCJzeW1ib2xzIjp0cnVlLCJxdWFudGl0eSI6Mn0=" \
  -H "X-Language: en"
```

## Random number

`GET` or `POST /api/generate/number`

| Field | Type | Default | Limits |
| --- | --- | --- | --- |
| `min` | integer | `0` | `-1000000000..1000000000` |
| `max` | integer | `100` | `-1000000000..1000000000` |
| `exclusions` | string[] | `[]` | Up to 1000 entries |

The inclusive range may span at most 10,000,000 values. Sampling is uniform; excluded values are retried.

```json
{ "min": 1, "max": 10, "exclusions": ["3", "7"], "quantity": 4 }
```

## VPN secret

`GET` or `POST /api/generate/vpn`

| Field | Type | Default | Values / limits |
| --- | --- | --- | --- |
| `protocol` | string | `shadowsocks` | `shadowsocks`, `wireguard`, `hex` |
| `length` | integer | `32` | `2..256`; applies to URL-safe output |

`wireguard` returns 32 random bytes in Base64. `hex` returns 32 random bytes in hexadecimal. The endpoint generates secret material, not a complete VPN configuration.

## UUID / compact ID

`GET` or `POST /api/generate/uuid`

| Field | Type | Default | Values / limits |
| --- | --- | --- | --- |
| `format` | string | `standard` | `standard`, `numeric`, `alpha`, `alphanumeric` |
| `length` | integer | `32` | `2..256`; ignored for `standard` |

`standard` returns an RFC 4122 UUID v4. Other formats return a compact random identifier using the selected alphabet.

## Random phrase

`GET` or `POST /api/generate/phrase`

| Field | Type | Default | Limits |
| --- | --- | --- | --- |
| `words` | integer | `12` | `12`, `15`, `18`, `21`, or `24` |
| `separator` | string | space | `1..4` characters |

Phrases are valid English BIP-39 mnemonics with a checksum and cryptographically secure entropy. A custom display separator does not change the underlying word sequence; wallet software commonly expects spaces.

## Random byte sequence

`GET` or `POST /api/generate/seq`

| Field | Type | Default | Values / limits |
| --- | --- | --- | --- |
| `byteLength` | integer | `32` | `2..256` |
| `encoding` | string | `hex` | `hex`, `base64`, `base64url` |

## Xray short ID

`GET` or `POST /api/generate/short-id`

| Field | Type | Default | Limits |
| --- | --- | --- | --- |
| `length` | integer | `8` | `2..256` |

Returns a lowercase hexadecimal ID suitable for Xray REALITY `shortIds`.

## Health

`GET /api/health`

```json
{
  "status": "ok",
  "service": "seqgen",
  "timestamp": "2026-06-09T18:00:00.000Z"
}
```

## Security notes

- Generated values are produced on the server with `node:crypto`.
- Generation responses include `Cache-Control: no-store`.
- Do not log request bodies or generated responses in production.
- Use HTTPS in production.
- Apply external rate limiting before exposing the API publicly.
