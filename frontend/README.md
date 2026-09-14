# XourceX Frontend

Next.js DApp for the XourceX protocol — landing page, plan configuration, and a
visual claim/settlement simulator.

## Stack

- Next.js 14+ (App Router) + TypeScript
- pnpm package manager
- Stellar wallet kit integration
- Vitest (unit) and Playwright (e2e)
- PWA + image optimisation (optional feature set)

## Development

```bash
pnpm install
pnpm run dev        # http://localhost:3000
```

Optional deps (e2e, PWA, image optimiser, cross-chain bridge SDK):

```bash
pnpm install --optional
```

## Scripts

| Script | Description |
| --- | --- |
| `pnpm run dev` | Start dev server |
| `pnpm run build` | Production build |
| `pnpm run start` | Serve production build |
| `pnpm run lint` | ESLint |
| `pnpm test` | Vitest unit tests |
| `pnpm test:e2e` | Playwright e2e tests |
| `pnpm run analyze` | Bundle analysis build |

## Tests

```bash
pnpm test            # unit
pnpm test:e2e        # e2e (requires optional deps)
```

## Environment

Public/frontend variables may be set via `frontend/.env.local` (never commit real
secrets). The app reaches the backend through the configured API base URL.

## Structure

```
app/
  components/       shared + landing components
  plans|about|faqs|admin|asset-owner  routes
  lib/              api client, seo helpers
components/         wallet modal, dashboard layouts, plan widgets
context/            wallet session state
lib/                seo, mock store, notification templates
messages/           i18n (en, es, fr)
tests/              unit + e2e suites
```

See [../docs/development.md](../docs/development.md) and
[../docs/architecture.md](../docs/architecture.md).