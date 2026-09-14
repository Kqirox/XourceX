# FAQ

## What is XourceX?

XourceX is a cross-border digital inheritance protocol built on Stellar Soroban.
It lets you lock digital assets so that, when a predefined inactivity condition is met,
they are automatically distributed to multiple heirs — off-ramped by Stellar anchors
into local fiat bank accounts or mobile money.

## Do heirs need crypto wallets?

No. Heirs can receive payouts in local fiat (e.g. `NGN`, `KES`, `EUR`, `USD`) through
Stellar anchors. The anchor flow bridges the payout to bank/mobile-money rails.

## What happens to my assets before activation?

They stay under your control and can be supplied to yield-generating Soroban lending or
liquidity vaults. Yield accrues on-chain and is added to the principal at payout.

## How are beneficiary splits defined?

Each beneficiary gets an allocation in basis points (`5000 bps` = 50%). Splits must sum
to `10000` (100%) and can be any number of beneficiaries.

## What is a "ping"?

A ping is a proof-of-life signature that keeps your plan active. Missing pings for longer
than the configured inactivity window marks the plan eligible for activation.

## What is the inactivity watchdog?

A backend service that scans plans on an interval, identifies dormant plans, and
prepares them for claim by the configured heirs.

## Which Stellar network is supported?

Development targets testnet first. Contract deployment scripts accommodate testnet, and
the architecture is network-agnostic (see `scripts/deploy.sh`).

## Is KYC required?

It depends on the payout jurisdiction. The platform exposes KYC status/requirements
endpoints and verifies provider webhooks with HMAC signatures.

## How do I report a vulnerability?

See [SECURITY.md](../SECURITY.md) — report privately, not in a public issue.

## How can I contribute?

See [CONTRIBUTING.md](../CONTRIBUTING.md). XourceX intentionally ships open interfaces
(contract math, API handlers, anchor hooks, and the claim simulator) ready to implement.