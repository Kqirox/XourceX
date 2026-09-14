# Smart Contracts

The Soroban smart contracts live in the `contracts/` Cargo workspace and compile to
`wasm32-unknown-unknown`.

## Workspace Layout

| Crate | Responsibility |
| --- | --- |
| `access-control` | Shared role definitions and reentrancy guard |
| `plan-vault` | Plan creation and asset custody |
| `inheritance-contract` | Vault state, pings, yield accounting, payouts, disputes |
| `lending-contract` | Yield-generating lending pool integration |
| `loan-nft` | Loan-position NFTs (lock while loan active) |
| `mock-token` | Issued asset for tests and local demos |

## Build

```bash
cd contracts
cargo build --target wasm32-unknown-unknown --release
```

Artifacts are produced as `target/wasm32-unknown-unknown/release/*.wasm`.

## Test

```bash
cargo test
```

The suite covers, among other things:

- **Reentrancy protection** — a RAII-style guard on financial entry points; a snapshot
  test verifies reentrancy attacks fail.
- **Yield math** — accrual and split arithmetic (`yield_math.rs`, mocked variants).
- **Access control** — role enforcement across the contract suite.
- **NFT compliance** — loan positions are non-transferable while a loan is active.
- **Disputes** — escalation flows (`disputes.rs`).

## Key Concepts

- **Ping (proof-of-life)** — owners periodically "ping" the plan to prove they are
  alive and active; missed pings within the inactivity window mark the plan eligible
  for activation.
- **Basis-point splits** — beneficiary allocations are expressed in basis points
  (`5000 bps` = 50%) and must sum to `10000`.
- **Temporary storage** — critical state uses temporary storage to reduce rent and
  clear automatically after execution, guarded against accidental deletion.
- **Storage TTL** — contracts extend TTL for durable keys with a helper worker
  (see `feat: implement Soroban storage TTL extension`).

## Security Properties

- All financial entry points are protected by the shared reentrancy guard.
- Role changes and plan mutations require the authorised roles from `access-control`.
- Loan NFTs are locked (`Transferable(false)`) while the underlying loan is active.
- Payout math operates in atomic units to avoid precision loss on splits.

For deployment specifics see [docs/deployment.md](deployment.md).