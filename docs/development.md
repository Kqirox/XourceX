# Development Setup

## Prerequisites

| Tool | Version | Notes |
| --- | --- | --- |
| Rust | 1.75+ | `rustup` recommended; target `wasm32-unknown-unknown` required for contracts |
| Node.js | 22 | See `.nvmrc`; `nvm use` will pick it up |
| pnpm | 9+ | `corepack enable` or install via npm |
| Docker | 20+ | Optional, for local Postgres/Redis |

## Bootstrap

```bash
rustup target add wasm32-unknown-unknown

# Local services (optional)
docker compose up -d postgres redis

# Frontend deps
cd frontend && pnpm install

# Backend deps are fetched automatically by cargo on first build
```

## Daily Workflows

```bash
# Frontend dev server
cd frontend && pnpm run dev            # http://localhost:3000

# Backend (minimal)
cd backend && cargo run --no-default-features

# Backend (full)
cd backend && cargo run
```

## Editing Smarter

- **Rust**: use `rust-analyzer`. Workspace crates: `contracts/`, `backend/`.
- **Frontend**: ESLint + Prettier integrated with your editor; configs ship in-repo
  (`.prettierrc.json`, `frontend/.eslintrc*`).
- **Formatting**: `make fmt` formats Rust and frontend sources.
- **Checks**: `make lint` runs clippy + eslint; `make test` runs all suites.

## Environment

Backend configuration is read from environment variables. Copy references:

```bash
cp backend/.env.example backend/.env    # adjust as needed
```

Frontend public variables (if any) go in `frontend/.env.local`.

See [docs/security.md](security.md) for the full variable reference, and
[backend/.env.example](../backend/.env.example) for defaults.

## Troubleshooting

| Issue | Fix |
| --- | --- |
| Missing wasm target on contract build | `rustup target add wasm32-unknown-unknown` |
| DB connection refused | `docker compose up -d postgres`; check `DATABASE_URL` |
| e2e tests fail after `pnpm test` | install optional deps first: `pnpm install --optional` |
| Backend slow to compile | use `--no-default-features` to skip optional crates |