use xourcex_backend::{create_router, AppState};
use std::sync::Arc;

#[test]
fn test_router_compiles() {
    let state = Arc::new(AppState {
        anchor: Arc::new(xourcex_backend::stellar_anchor::AnchorRegistry::new()),
    });
    let _app = create_router(state);
    // Router created successfully!
}
