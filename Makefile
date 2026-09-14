.PHONY: help frontend backend contracts test fmt lint tidy

help: ## Show available targets
	@grep -E '^[a-zA-Z_-]+:.*?## ' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-12s\033[0m %s\n", $$1, $$2}'

## ---- Frontend ----

frontend: ## Install frontend deps and start the dev server
	cd frontend && pnpm install && pnpm run dev

frontend-install: ## Install frontend dependencies
	cd frontend && pnpm install

frontend-lint: ## Lint the frontend
	cd frontend && pnpm lint

frontend-test: ## Run frontend unit tests
	cd frontend && pnpm test

frontend-test-e2e: ## Run frontend e2e tests
	cd frontend && pnpm test:e2e

## ---- Backend ----

backend: ## Run the backend (minimal feature set)
	cd backend && cargo run --no-default-features

backend-full: ## Run the backend (redis + metrics + pdf)
	cd backend && cargo run

backend-test: ## Run backend tests
	cd backend && cargo test

## ---- Contracts ----

contracts: ## Build all Soroban contracts for wasm32
	cd contracts && cargo build --target wasm32-unknown-unknown --release

contracts-test: ## Run contract tests
	cd contracts && cargo test

## ---- General ----

fmt: ## Format Rust and frontend code
	cd backend && cargo fmt
	cd contracts && cargo fmt
	cd frontend && pnpm exec prettier --write .

lint: ## Lint backend (clippy) and frontend (eslint)
	cd backend && cargo clippy --all-targets --all-features -- -D warnings
	cd frontend && pnpm lint

test: backend-test contracts-test frontend-test ## Run all test suites

tidy: ## Remove stale build artifacts
	@find . -path '*/target' -prune -exec rm -rf {} +
	@rm -rf frontend/.next