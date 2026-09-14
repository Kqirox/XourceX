# Deployment

XourceX deploys three independent layers. This guide covers contract publish,
backend rollouts, and frontend hosting.

## 1. Smart Contracts

### Build

```bash
cd contracts
cargo build --target wasm32-unknown-unknown --release
```

### Deploy to a Soroban network

The generated `*.wasm` artifacts are installed and invoked with `soroban` (Stellar CLI):

```bash
soroban contract install --network testnet --source <deployer> \
  --wasm target/wasm32-unknown-unknown/release/inheritance_contract.wasm

soroban contract deploy --wasm target/wasm32-unknown-unknown/release/inheritance_contract.wasm \
  --network testnet --source <deployer>
```

After deployment:

1. Set the admin/roles on the deployed instances via the access-control entry points.
2. Start `$soroban` with a proof-of-life ping schedule from the backend watchdog.
3. Verify storage TTL extension is configured (see `docs/contracts.md`).

> Refer to `scripts/deploy.sh` for the canonical deploy pipeline.

## 2. Backend (Axum / Rust)

### Build

```bash
cd backend
cargo build --release                     # full
cargo build --release --no-default-features  # minimal
```

### Run

```bash
DATABASE_URL=postgres://... \
ANCHOR_API_URL=https://anchor.example.com \
KYC_WEBHOOK_SECRET=<secret> \
LOG_FORMAT=json \
./target/release/xourcex-backend
```

> `LOG_FORMAT=json` is mandatory for log-aggregator compatibility (see `.env.example`).

### Recommended production shape

- Run behind a reverse proxy/TLS terminator.
- Use Postgres with `DB_STATEMENT_TIMEOUT_MS` and connection-pool caps set.
- Enable `redis-cache` and `metrics` features only when the corresponding services exist.
- Keep `OFAC_BLOCKED_COUNTRIES` policy aligned with your license/regulatory scope.
- Set `GEOIP_DB_PATH` to a MaxMind country database when `geoip` is compiled in.

## 3. Frontend (Next.js)

### Build

```bash
cd frontend
pnpm install
pnpm run build
pnpm start
```

### Hosting

The frontend is built for Vercel. Configure:

- Framework preset: Next.js.
- Build command: `pnpm run build`.
- Install command: `pnpm install`.
- Output directory: `.next` (handled automatically).

Enable the optional features when needed: `pnpm install --optional` covers e2e,
PWA, image optimisation (`sharp`), and the cross-chain bridge SDK.

## CI/CD

- GitHub Actions workflows (`backend.yml`, `contracts.yml`, `frontend.yml`) build and
  test each layer.
- `sast.yml` runs CodeQL.
- Container images (where published) are scanned with Trivy, and results upload to the
  GitHub Security tab.

## Rollout Checklist

- [ ] Contracts deployed on testnet and roles configured
- [ ] `DATABASE_URL` points to the environment database (migrations applied)
- [ ] `KYC_WEBHOOK_SECRET` set and shared with the KYC provider
- [ ] `ANCHOR_API_URL` points to the settlement anchor
- [ ] `LOG_FORMAT=json` set; log forwarding configured
- [ ] Frontend envs mirrored in the hosting provider
- [ ] Trivy/CodeQL report clean or deviations documented