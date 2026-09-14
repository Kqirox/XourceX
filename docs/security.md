# Security Configuration

This document is the operational reference for securing a XourceX deployment.

## Backend Environment Variables

| Variable | Default | Purpose |
| --- | --- | --- |
| `DATABASE_URL` | — | Postgres connection string (required for persisted state) |
| `LOG_FORMAT` | `json` | `json` \| `pretty` \| `compact`; use `json` in production |
| `DB_MAX_CONNECTIONS` | `10` | Cap on pooled connections |
| `DB_MIN_CONNECTIONS` | `2` | Minimum idle connections kept |
| `DB_ACQUIRE_TIMEOUT` | `30` | Seconds before failing to acquire a connection |
| `DB_IDLE_TIMEOUT` | `600` | Seconds before recycling idle connections |
| `DB_STATEMENT_TIMEOUT_MS` | `10000` | Hard per-query timeout, prevents stuck queries |
| `DB_SLOW_QUERY_WARN_MS` | `500` | Log threshold for slow queries |
| `INACTIVITY_WATCHDOG_INTERVAL_SECS` | `3600` | Watchdog scan interval |
| `INACTIVITY_WATCHDOG_BATCH_SIZE` | `500` | Watchdog batch size |
| `KYC_WEBHOOK_SECRET` | — | HMAC secret verifying `X-KYC-Signature`; **required** |
| `ANCHOR_API_URL` | `http://localhost:8081` | Stellar Anchor (SEP-31) base URL |
| `PLAN_CACHE_TTL_SECS` | `15` | Plan cache TTL |
| `PLAN_STATISTICS_CACHE_TTL_SECS` | `60` | Analytics cache TTL |
| `OFAC_BLOCKED_COUNTRIES` | `CU,IR,KP,SY` | Sanctions-region blocklist at the API edge |
| `GEOIP_DB_PATH` | — | MaxMind `.mmdb` path used with the `geoip` feature |

## Threat Model & Controls

| Threat | Control |
| --- | --- |
| Reentrancy on financial entry points | Shared RAII reentrancy guard in `access-control` |
| Unauthorised plan mutation | Stellar-signature auth on user routes |
| Admin abuse | JWT-protected admin routes |
| Forged KYC webhooks | HMAC-SHA256 signature verification |
| SQL injection / stuck queries | Parameterised queries + `DB_STATEMENT_TIMEOUT_MS` |
| Sanctioned jurisdictions | `OFAC_BLOCKED_COUNTRIES` geo guard |
| Dependency risk | `cargo audit`, `npm audit` in CI |
| Supply-chain / SAST | CodeQL + Trivy scans in CI |

## Frontend

- CORS is restricted to the production origin (and subdomains):
  `xourcex.com`, `*.xourcex.com`, `staging.xourcex.com`, `api.xourcex.com`.
- Wallet session state is stored locally (localStorage) and removed on logout.
- PWA/manifest metadata identifies the app as **XourceX**.

## Secrets Management

- **Never commit `.env*` files.** `.gitignore` excludes them (with `!.env.example`).
- `KYC_WEBHOOK_SECRET` and admin JWTs must be provisioned from a secret manager in
  production.
- Rotate `KYC_WEBHOOK_SECRET` regularly and on personnel changes.

## Reporting a Vulnerability

Follow the process in [SECURITY.md](../SECURITY.md). Do not open public issues for
security findings.