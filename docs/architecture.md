# Architecture

XourceX is composed of three independently deployable layers: Soroban smart contracts,
a Rust backend, and a Next.js frontend.

## High-Level Diagram

```
┌──────────────────────────────────────────────────────────────────┐
│                         Frontend (Next.js)                        │
│        Landing DApp · Plan configuration · Claim simulator        │
└───────────────┬──────────────────────────────────┬────────────────┘
                │ HTTP / WebSocket                 │
                ▼                                  ▼
┌──────────────────────────────┐  ┌────────────────────────────────┐
│        Soroban Contracts      │  │           Backend (Axum)         │
│------------------------------│  │--------------------------------│
│ access-control   (shared RBAC)│  │ /api/plans       planning API   │
│ plan-vault       (custody)    │◄►│ inact. watchdog  background job │
│ inheritance-contract (vault)  │  │ kyc webhooks     HMAC verified  │
│ lending-contract  (yield)     │  │ anchor client    SEP-31 off-ramp│
│ loan-nft          (loan posit)│  │ pdf/metrics/cache optional      │
│ mock-token        (test asset)│  └───────────────┬────────────────┘
└──────────────────────────────┘                    │
                                                   ▼
                                    Stellar Network
                                 Anchors (fiat settlement)
```

## Layers

### 1. Contracts (`contracts/`)

A Cargo workspace of Soroban smart contracts compiled to `wasm32-unknown-unknown`:

- **`access-control`** — shared library defining the roles authorised to manage plans,
  vaults, and lending positions across every contract. Provides a reentrancy guard used by
  the financial entry points.
- **`inheritance-contract`** — the core vault. Manages plan state, pings (proof-of-life),
  yield accounting, payouts, and dispute/escalation flows.
- **`plan-vault`** — plan creation and asset custody primitives shared with the vault.
- **`lending-contract`** — interfaces with yield-generating lending pools so dormant
  capital accrues yield for heirs.
- **`loan-nft`** — loan-position NFTs bound to lending flows; intentionally
  non-transferable while a loan is active.
- **`mock-token`** — standard issued-asset used by tests and local demos.

Payout math uses basis points for beneficiary splits; yield is tracked on-chain so
principal + accrued yield are settled atomically in a single transaction.

### 2. Backend (`backend/`)

An Axum (Rust) service with no mandatory external database (Postgres optional, enabled
through features):

- **Planning API** — CRUD for plans, due-for-claim queries, payout triggering, plan
  reports, and cache-timing headers.
- **Inactivity watchdog** — background service that detects dormant plans and prepares
  them for activation.
- **KYC integration** — submit/status/requirements endpoints plus an HMAC-secured
  webhook receiver for KYC providers.
- **Stellar Anchor client** — SEP-31 style off-ramp integration for settling payouts to
  local fiat bank accounts or mobile money.
- **Loan lifecycle** — freeze, recall, and liquidate-and-settle flows with trigger info
  for the lending protocol.
- **Cross-cutting** — rate limiting, geo-restriction, security headers, metrics,
  structured logging, and caching (Redis or in-process fallback).

The backend is layered feature-gated:

| Feature | Purpose |
| --- | --- |
| (default) | Postgres, watchdog, KYC, anchor client, PDF reports |
| `redis-cache` | Redis-backed plan/analytics cache |
| `metrics` | Prometheus metrics endpoint |
| `geoip` | MaxMind GeoIP2 country checks |

### 3. Frontend (`frontend/`)

A Next.js DApp built with TypeScript, pnpm, and Vercel-first deployment:

- Landing page, plan configuration, and a visual claim/settlement simulator.
- Wallet integration (Stellar wallet kit) with persisted session state.
- SEO metadata, OpenGraph images, sitemap, robots, and PWA support.
- Vitest unit tests and Playwright e2e tests with mocked anchor/flows.

## Data Flows

### Create a plan

1. Owner configures splits and conditions in the frontend.
2. `POST /api/plans` persists plan state (interfacing with the contracts).
3. Assets are deposited into the inheritance vault (`inheritance-contract`).

### Activate (inactivity)

1. The inactivity watchdog identifies plans past their ping deadline.
2. Ownership is transferred to beneficiary claims per the configured splits.
3. A single library call distributes principal + accrued yield to all heirs.

### Fiat settlement

1. Beneficiaries request exit via a Stellar Anchor.
2. The anchor client triggers a SEP-31 payment into the local fiat rail
   (bank account or mobile money).

## Environments & Deployment

Refer to:
- [docs/development.md](development.md) — local setup.
- [docs/deployment.md](deployment.md) — build and deployment.
- [docs/security.md](security.md) — environment variables and hardening.