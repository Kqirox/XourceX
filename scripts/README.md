# XourceX Scripts

Helper scripts for environment setup and contract deployment.

| Script | Purpose |
| --- | --- |
| `deploy.sh` | Build and deploy XourceX Soroban contracts |
| `setup_storage.sh` | Create storage directories for legacy content on Unix |
| `setup_storage.bat` | Create storage directories for legacy content on Windows |

## Usage

```bash
# Unix
./setup_storage.sh

# Windows (Command Prompt)
setup_storage.bat

# Contract deployment
./deploy.sh
```

> `deploy.sh` compiles the contracts for `wasm32-unknown-unknown` before deploying.
> See [docs/deployment.md](../docs/deployment.md) for the full pipeline.