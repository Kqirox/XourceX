# Security Policy

XourceX takes the security of its smart contracts, backend services, and user funds
seriously. We appreciate the community's help in reporting issues responsibly.

## Reporting a Vulnerability

**Do not open a public issue for a security vulnerability.** Instead, report it
privately by contacting the maintainers directly (see repository settings), or by
opening a private vulnerability report on GitHub.

Please include:

- A description of the vulnerability and its potential impact.
- Steps to reproduce, or a minimal proof of concept.
- Affected components and versions (contracts, backend, frontend, dependencies).
- Any suggested remediations, if available.

You will receive a response as soon as possible and we ask that you keep details
confidential until a fix has been released.

## Supported Versions

Only the latest version on the `master` branch is actively supported with security
updates.

| Version | Supported |
| --- | --- |
| `master` (latest) | ✅ |
| Older releases | ❌ |

## Scope

- Soroban smart contracts under `contracts/`
- Backend service under `backend/`
- Frontend application under `frontend/`

## Security Scanning

Automated checks run in CI on every push and pull request:

- **Rust**: `cargo-clippy` with `-D warnings` plus `cargo audit` for dependency vulnerabilities.
- **Node.js**: `npm audit` enforcing a `high`/`critical` threshold.
- **SAST**: GitHub CodeQL across the codebase.
- **Containers**: Trivy scans of container images; results are uploaded as SARIF to the
  GitHub Security tab.

## Best Practices for Reporters

- Prefer concise, reproducible reports.
- Never test vulnerabilities against the testnet in ways that disrupt other users.
- Financial contracts may be eligible for coordinated disclosure discussions.

## Acknowledgements

We are grateful to everyone who reports security issues responsibly. Contributors who
report valid, confirmed vulnerabilities will be recognised (with explicit consent).