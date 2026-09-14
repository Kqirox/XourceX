# XourceX Smart Contracts

Soroban (Stellar) smart contracts powering XourceX inheritance and lending flows.

## Contracts

| Crate | Responsibility |
| --- | --- |
| `access-control` | Shared roles + reentrancy guard |
| `plan-vault` | Plan creation and asset custody |
| `inheritance-contract` | Vault state, pings, yield accounting, payouts, disputes |
| `lending-contract` | Yield-generating lending integration |
| `loan-nft` | Loan-position NFTs (locked while loan active) |
| `mock-token` | Issued asset for tests and demos |

## Build

```bash
cargo build --target wasm32-unknown-unknown --release
```

## Test

```bash
cargo test
```

## Highlights

- Single-transaction payouts to any number of heirs via basis-point splits.
- On-chain yield accumulation supplied to lending/liquidity vaults.
- Proof-of-life pings and inactivity activation.
- RAII-style reentrancy guard enforced on financial entry points.
- Loan NFTs intentionally non-transferable while the loan is active.

For a deep dive see [docs/contracts.md](../docs/contracts.md) (repo root docs).