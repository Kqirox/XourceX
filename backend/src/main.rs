use xourcex_backend::{create_router, telemetry, AppState, Config};
use std::net::SocketAddr;
use std::sync::Arc;
use tracing::info;

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    // Initialize tracing logging
    telemetry::init_tracing()?;

    // Load configuration
    let config = Config::load()?;

    // Initialize state skeleton
    let state = Arc::new(AppState {
        anchor: Arc::new(xourcex_backend::stellar_anchor::AnchorRegistry::new()),
    });

    // Create Axum application
    let app = create_router(state);

    // Start server
    let addr = SocketAddr::from(([0, 0, 0, 0], config.port));
    info!("Starting rebranded XOURCEX backend skeleton on {}", addr);

    let listener = tokio::net::TcpListener::bind(addr).await?;
    axum::serve(listener, app).await?;

    Ok(())
}
