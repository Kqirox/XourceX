# Testing

## Matrix

| Layer | Tool | Command | Notes |
| --- | --- | --- | --- |
| Contracts | `cargo test` | `cd contracts && cargo test` | Unit + integration, reentrancy snapshots, yield math |
| Backend | `cargo test` | `cd backend && cargo test` | API, KYC webhooks, inactivity watchdog, DB query guards |
| Frontend unit | Vitest | `cd frontend && pnpm test` | Component + store tests |
| Frontend e2e | Playwright | `cd frontend && pnpm test:e2e` | Full user flows with mocked anchor service |
| Security/lint | Clippy + ESLint | see *Lint* below | Gates on CI |

## Contracts

```bash
cd contracts
cargo test
```

Key coverage areas:

- Reentrancy attack failing via the RAII guard (snapshot-based regression test).
- Yield accrual and basis-point splits across beneficiary configurations.
- Access-control role enforcement.
- Loan NFT transfer restrictions while loans are active.

## Backend

```bash
cd backend
cargo test --no-default-features
```

Integration tests live in `backend/tests/`:

- `api_tests.rs` — routing, CORS origin validation, plan flows.
- `kyc_webhook_test.rs` — HMAC signature verification and payload handling.
- `inactivity_watchdog_db_test.rs` — watchdog behaviour against a test database.
- `db_query_guards_test.rs` — query timeout/slow-query guards.
- `middleware_tests.rs` — rate limiting, geo-restriction, security headers.

> Tests use `postgres://postgres:postgres@localhost:5432/xourcex_test` when an
> integration database is required. Start one with `docker compose up -d postgres`.

## Frontend

```bash
cd frontend
pnpm install          # base deps
pnpm test             # unit tests (Vitest)

pnpm install --optional
pnpm test:e2e         # e2e (Playwright) — requires optional deps
```

Component tests include the inactivity timer card and wallet modal. E2E fixtures mock
wallets and the anchor service (`frontend/tests/e2e/fixtures`, `frontend/tests/mocks`).

## Lint

```bash
# Rust
cd backend && cargo clippy --all-targets --all-features -- -D warnings
cd contracts && cargo clippy --all-targets --all-features -- -D warnings

# Frontend
cd frontend && pnpm lint
```

`cargo fmt`/Prettier formatting is enforced as well (`make fmt`).

## CI

GitHub Actions runs the contractual matrix on every push/PR:

- `backend.yml`, `contracts.yml`, `frontend.yml` — build + test for each layer.
- `sast.yml` — CodeQL static analysis.

See [`make test`](../Makefile) for a local shortcut.