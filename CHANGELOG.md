# Changelog

All notable changes to XourceX are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased]

### Added

- Repository rebrand to the XourceX protocol identity.
- Professional project documentation:
  - `docs/architecture.md` — system architecture overview.
  - `docs/contracts.md` — Soroban contract reference.
  - `docs/api.md` — HTTP API reference.
  - `docs/testing.md` — testing matrix.
  - `docs/development.md` — local development setup.
  - `docs/deployment.md` — build and deployment guide.
  - `docs/security.md` — security configuration reference.
- Governance files: `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`, `LICENSE`.
- Developer tooling: `Makefile`, `.editorconfig`, `.nvmrc`, `docker-compose.yml`,
  `rust-toolchain.toml`, Dependabot configuration and issue/PR templates.

## [0.1.0] — Testnet Preview

### Added

- Soroban inheritance vault contract with:
  - Single-transaction mass beneficiary payouts with basis-point allocations.
  - On-chain yield accounting integrated with lending vaults.
  - Ping (proof-of-life) and inactivity activation flows.
  - Dispute and escalation handling.
- Lending and loan-position NFT contracts with compliance-oriented transfer restrictions.
- Access-control library shared across all contracts, including a reentrancy guard.
- Axum (Rust) backend:
  - Planning API with pagination, caching headers, and query guards.
  - Inactivity watchdog service.
  - KYC webhook receiver with HMAC signature verification.
  - Stellar Anchor (SEP-31) off-ramp client for fiat settlement.
  - Metrics, telemetry, rate limiting, geo-restriction, and security headers.
- Next.js frontend:
  - Interactive plan configuration and claim/settlement simulator.
  - Wallet integration, e2e and component test suites.
  - SEO metadata, PWA, and asset optimisation pipeline.

[0.1.0]: https://github.com/Kqirox/XourceX/releases