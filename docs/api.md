# API Reference

The backend is an Axum (Rust) service. Unless otherwise noted, base URL is
`http://localhost:8080` locally.

## Authentication

Three authentication layers are used depending on the route family:

| Middleware | Applies to | Mechanism |
| --- | --- | --- |
| Signature auth | User routes (`/api/plans*`) | Stellar signature verification on requests |
| JWT auth | Admin routes (`/api/plans/{id}/report`, `/api/analytics/*`) | Bearer JWT |
| JWT or signature | Loan lifecycle routes | Either accepted |

## Plan Routes

### Create a plan

`POST /api/plans` — signature protected.

Creates a new inheritance plan. Expects beneficiary splits, inactivity conditions,
and asset/collateral details in the request body.

### Get plans (list)

`GET /api/plans`

Returns paginated plans. When Redis caching is enabled, responses include
cache-timing headers:

- `x-plan-cache-status`
- `x-plan-cache-lookup-ms`
- `x-plan-db-query-ms`
- `x-plan-total-latency-ms`

### Get a plan

`GET /api/plans/{id}`

### Update / cancel / claim / ping / payout

| Method | Path | Description |
| --- | --- | --- |
| `PUT` | `/api/plans/{id}` | Update plan configuration |
| `POST` | `/api/plans/{id}/cancel` | Cancel a plan |
| `POST` | `/api/plans/{id}/claim` | Claim a plan (beneficiary) |
| `POST` | `/api/plans/ping` | Proof-of-life ping |
| `POST` | `/api/plans/payout` | Trigger payout |

All of the above require signature authentication.

### Due-for-claim queries (public)

| Method | Path | Description |
| --- | --- | --- |
| `GET` | `/api/plans/due-for-claim` | Plans eligible for claim |
| `GET` | `/api/plans/due-for-claim/{id}` | Due-for-claim status of one plan |

## Admin Routes (JWT)

| Method | Path | Description |
| --- | --- | --- |
| `GET` | `/api/plans/{id}/report` | Generated plan report (PDF-capable build) |
| `GET` | `/api/analytics/plan-statistics` | Aggregate analytics |

## Loan Lifecycle (JWT or signature)

| Method | Path | Description |
| --- | --- | --- |
| `POST` | `/api/lending/freeze-loans` | Freeze loans matching criteria |
| `POST` | `/api/lending/recall-loans` | Recall loans |
| `POST` | `/api/lending/liquidate` | Liquidate and settle position(s) |
| `GET` | `/api/loan-lifecycle/trigger-info` | Trigger metadata for the lending flow |

## Anchor & KYC

| Method | Path | Description |
| --- | --- | --- |
| `GET` | `/api/anchor/payout-status` | Status of fiat payouts via Stellar anchors |
| `GET` | `/api/lending/current-rate` | Current lending/yield rate |
| `GET` | `/api/kyc/status` | KYC status |
| `POST` | `/api/kyc/submit` | Submit KYC details |
| `POST` | `/api/kyc/upload` | Upload KYC document |
| `GET` | `/api/kyc/required` | Whether KYC is required |
| `GET` | `/api/kyc/requirements` | KYC requirements for a jurisdiction |
| `POST` | `/api/kyc/webhook` | KYC provider webhook (HMAC-SHA256 verified via `X-KYC-Signature`) |

## Health

`GET /api/health` — liveness endpoint.

## Caching

`PLAN_CACHE_TTL_SECS` (default `15`) controls the Redis-backed or in-process plan
cache. `PLAN_STATISTICS_CACHE_TTL_SECS` (default `60`) controls analytics caching.
When Redis is unavailable and `redis-cache` is enabled, an in-process fallback is used.