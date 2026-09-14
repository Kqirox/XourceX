# XourceX Backend

Axum (Rust) service for the XourceX protocol: plan orchestration, inactivity
watchdog, KYC integration, and fiat off-ramping via Stellar anchors.

## Features

- **Planning API** — plan CRUD, due-for-claim queries, payouts, reports, analytics.
- **Inactivity watchdog** — background detection of dormant plans.
- **KYC webhooks** — HMAC-verified inbound notifications from KYC providers.
- **Stellar Anchor client** — SEP-31 off-ramp to local fiat / mobile money.
- **Loan lifecycle** — freeze, recall, and liquidate-and-settle flows.
- **Operational** — metrics, structured logging, geo-restriction, rate limiting,
  security headers, caching (Redis or in-process), PDF reporting.

## Quick Start

```bash
cp .env.example .env    # adjust variables
cargo run --no-default-features   # minimal build
cargo run                         # full build (redis + metrics + pdf)
```

Health check: `GET /api/health`.

## Configuration

All configuration is via environment variables — see [.env.example](.env.example) and
[../docs/security.md](../docs/security.md).

## Tests

```bash
cargo test --no-default-features
```

Integration suites live in `tests/`; see [../docs/testing.md](../docs/testing.md).

## Layout

```
src/
  api.rs                  HTTP routes/handlers
  auth.rs                 signature + JWT auth
  db.rs                   Postgres pool, query guards, migrations
  config.rs               environment configuration
  inactivity_watchdog.rs  dormancy scanner
  kyc_webhook.rs          KYC provider webhook handling
  loan_lifecycle.rs       freeze/recall/liquidation flows
  middleware.rs           rate limiting, geo, security headers
  metrics.rs              Prometheus metrics
  pdf.rs                  report generation
  stellar_anchor.rs       SEP-31 anchor client
  stellar_submit.rs       transaction submission to Stellar
  webhooks.rs / ws.rs     webhooks and websockets
  xdr.rs                  Stellar XDR helpers
  yield_calculator.rs     on-chain yield consumption
```