# Contributing to XourceX

Thank you for your interest in contributing to XourceX. This document outlines the
processes and conventions we use to keep the codebase consistent and reviewable.

> **Status:** XourceX is transitioning from development to testnet. Part of the
> codebase intentionally contains placeholders, stubs, and interfaces. If you find
> one, implementing it is a great starting point.

## Getting Started

1. Fork the repository.
2. Clone your fork: `git clone git@github.com:<you>/XourceX.git`
3. Create a feature branch: `git checkout -b feat/your-change`
4. Install tooling — see [docs/development.md](docs/development.md).
5. Make changes, add tests, and verify locally.

## How to Contribute

- **Bug reports** — open an issue using the bug report template. Include steps to
  reproduce, expected vs. actual behaviour, and relevant logs.
- **Feature requests** — open an issue using the feature request template, with the
  problem you want to solve and a sketch of the solution.
- **Pull requests** — reference the related issue in the PR description and use the
  pull request template.

## Code Conventions

### Rust (contracts + backend)

- Format with `cargo fmt`.
- Lint with `cargo clippy --all-targets --all-features -- -D warnings`.
- Run `cargo test` for the relevant crate before opening a PR.
- Smart contract changes must keep the existing reentrancy and access-control guarantees.

### TypeScript / Next.js (frontend)

- Format with Prettier (see `.prettierrc.json`).
- Lint with ESLint: `pnpm lint`.
- Run unit tests: `pnpm test`.
- Run e2e tests when the change touches user flows: `pnpm test:e2e`.

### Commits

- Small, focused commits with clear messages.
- Conventional style is preferred, e.g. `feat(contracts): ...`, `fix(backend): ...`,
  `docs: ...`, `test(api): ...`.

## Tests

All new behaviour must ship with tests. See [docs/testing.md](docs/testing.md) for
the full matrix and how to run each layer's suite.

## Pull Request Checklist

- [ ] Implementation matches the referenced issue
- [ ] `cargo fmt` / `cargo clippy` pass (Rust changes)
- [ ] ESLint + Prettier pass (frontend changes)
- [ ] Tests added/updated and green
- [ ] Commit messages are descriptive and prefixed appropriately
- [ ] No debugging artifacts or secrets in the diff (check `.env*`)

## Branch Protection

`master` is protected. Maintainers review and squash-merge approved changes.

## Questions

For anything not covered here, open a discussion or ask in an issue — a maintainer will help.**

## Code of Conduct

All participants must follow our [Code of Conduct](CODE_OF_CONDUCT.md).