<div align="center">

# XourceX

**Yield-Bearing, Fiat-Native Digital Inheritance Infrastructure on Stellar**

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](#license)
[![Backend](https://img.shields.io/badge/backend-Rust-4e74d8?logo=rust)](backend)
[![Frontend](https://img.shields.io/badge/frontend-Next.js-000000?logo=next.js)](frontend)
[![Smart Contracts](https://img.shields.io/badge/smart--contracts-Soroban-ff6b35)](contracts)

XourceX is a programmable, cross-border digital inheritance protocol built on the
**Stellar network** with **Soroban smart contracts**. Individuals can secure their
digital assets and automatically distribute them to multiple heirs when predefined
inactivity conditions are met — settling directly to local fiat bank accounts or
mobile money wallets via Stellar anchors.

</div>

---

## Why XourceX

Traditional inheritance is slow, paper-heavy, and unavailable to most of the world's
unbanked population. XourceX makes estate planning programmable:

- **Self-custody until activation** — assets remain under the owner's control and earn yield while dormant.
- **No crypto literacy required for heirs** — beneficiaries are paid in local fiat.
- **Global, by default** — built on the Stellar network, settlements work across borders.

---

## Key Features

### 1. Yield-Bearing Inheritance Plans
Assets locked in an inheritance vault never sit idle. Plan owners can opt to supply
their capital into yield-generating Soroban lending or liquidity vaults. Yield
accumulates continuously and increases the principal ultimately distributed to heirs.

### 2. Mass Beneficiary Payouts
Distributions to multiple heirs happen in a single transaction. Owners define custom
allocation splits in basis points (e.g. `5000 bps` = 50%) for any number of
beneficiaries. The contract automatically divides principal and accrued yield on payout.

### 3. Fiat Settlement via Stellar Anchors
Heirs do not need crypto wallets or blockchain literacy. Payouts can be off-ramped
into local fiat currencies (`NGN`, `KES`, `BRL`, `PHP`, `EUR`, `USD`, …) and deposited
directly into bank accounts or mobile money wallets using Stellar Anchors.

### 4. Proof-of-Life & Dispute Handling
Activities ("pings") keep plans active; defined inactivity conditions trigger
activation. Escalation and dispute flows are handled on-chain.

---

## Architecture

```
                  ┌──────────────────────────────────────────────┐
                  │                   Frontend                    │
                  │         Next.js landing DApp + simulator      │
                  └───────────────┬──────────────────┬────────────┘
                                  │  HTTP / WebSocket │
                                  ▼                  ▼
┌──────────────────────────┐  ┌──────────────────────────────┐
│   Soroban Contracts       │  │            Backend           │
│  inheritance-contract     │◄►│  Axum (Rust) — planning API,  │
│  plan-vault               │  │  inactivity watchdog, KYC     │
│  lending-contract         │  │  webhooks, PDF reports, fiat  │
│  loan-nft · mock-token    │  │  (SEP-31) anchor client        │
│  access-control           │  └──────────────┬───────────────┘
└──────────────────────────┘                  │
                               ┌──────────────▼────────────────┐
                               │ Stellar Network + Anchors      │
                               │ (SEP-31 off-ramp to local fiat)│
                               └───────────────────────────────┘
```

### Repository Layout

| Directory | Purpose |
| --- | --- |
| `contracts/` | Soroban smart contracts (workspace) |
| `contracts/inheritance-contract` | Vault state, pings, yield accounting, payouts, disputes |
| `contracts/plan-vault` | Plan creation and asset custody |
| `contracts/lending-contract` | Yield-generating lending vault interactions |
| `contracts/loan-nft` | Non-transferable loan-position NFTs |
| `contracts/access-control` | Shared roles/authority library across contracts |
| `backend/` | Axum (Rust) API service (planning, watchdog, KYC, fiat anchor client) |
| `frontend/` | Next.js DApp (landing, plan configuration, claim simulator) |
| `scripts/` | Deployment and environment setup scripts |

---

## Getting Started

### Prerequisites

- [Rust](https://www.rust-lang.org/) (`1.75+`) with the `wasm32-unknown-unknown` target
- [Node.js](https://nodejs.org/) `18+` and [pnpm](https://pnpm.io/)
- Optional: PostgreSQL 14+, Redis 7+, Docker

```bash
rustup target add wasm32-unknown-unknown
```

### Quick Start (Minimal)

Each layer is independently runnable:

```bash
# Frontend — dev server only
cd frontend && pnpm install && pnpm run dev      # http://localhost:3000

# Backend — minimal build (no Redis / Prometheus / PDF)
cd backend && cargo run --no-default-features

# Smart contracts — build only
cd contracts && cargo build --target wasm32-unknown-unknown --release
```

> **Tip:** `pnpm install --optional` in `frontend/` additionally restores
> `@playwright/test` (e2e), `@ducanh2912/next-pwa` (PWA), `sharp` (image
> optimiser), and `@allbridge/bridge-core-sdk` (cross-chain bridge).

### Smart Contracts

```bash
cd contracts
cargo build --target wasm32-unknown-unknown --release
cargo test          # run the contract test suites (incl. reentrancy, yield math)
```

### Backend

Full build (Redis cache + Prometheus metrics + PDF reports):

```bash
cd backend && cargo run
```

Minimal build (no optional dependencies):

```bash
cd backend && cargo run --no-default-features
```

Selective features:

```bash
cargo run -F redis-cache            # add Redis cache only
cargo run -F redis-cache,metrics    # add Redis + Prometheus
```

Configuration is via environment variables — see [`backend/.env.example`](backend/.env.example)
and [`docs/security.md`](docs/security.md). Notable variables:

```bash
DATABASE_URL=postgres://postgres:postgres@localhost:5432/xourcex
LOG_FORMAT=json                    # json | pretty | compact
KYC_WEBHOOK_SECRET=<hmac-secret>   # required to accept KYC webhooks
ANCHOR_API_URL=http://localhost:8081
```

### Frontend

```bash
cd frontend
pnpm install
pnpm run dev                       # http://localhost:3000

# e2e tests (requires optional deps)
pnpm install --optional
pnpm run test:e2e
```

Unit tests: `pnpm run test` · Coverage: `pnpm run test:coverage`

---

## Testing

| Layer | Command | Notes |
| --- | --- | --- |
| Contracts | `cargo test` | Unit + integration, reentrancy guards, snapshot tests |
| Backend | `cargo test` | API, KYC webhooks, inactivity watchdog, DB query guards |
| Frontend unit | `pnpm test` | Vitest component suites |
| Frontend e2e | `pnpm test:e2e` | Playwright flows |

---

## Documentation

- [Architecture](docs/architecture.md)
- [Smart Contracts](docs/contracts.md)
- [API Reference](docs/api.md)
- [Testing Guide](docs/testing.md)
- [Development Setup](docs/development.md)
- [Deployment](docs/deployment.md)
- [Security](docs/security.md)

---

## Contributing

XourceX is transitioning from development to testnet. The codebase intentionally
contains placeholders, stubs, and interfaces open for implementation.

Please read [CONTRIBUTING.md](CONTRIBUTING.md) and our
[Code of Conduct](CODE_OF_CONDUCT.md). In short:

1. Fork the repository and create a feature branch.
2. Follow the existing code style (`rustfmt` / `clippy` for Rust, ESLint/Prettier for the frontend).
3. Add tests for new behaviour.
4. Open a Pull Request referencing the relevant issue.

Security findings should follow the guidance in [SECURITY.md](SECURITY.md).

---

## Roadmap

- [x] Core inheritance vault & payout logic
- [x] Yield accrual via Soroban lending vaults
- [x] Loan-position NFT surface for lending flows
- [ ] Testnet deployment & stress testing
- [ ] Mainnet anchor integrations and local-fiat settlements

---

## License

Released under the terms described in [LICENSE](LICENSE).