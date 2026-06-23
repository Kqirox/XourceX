pub struct Config {
    pub port: u16,
}

impl Config {
    pub fn load() -> Result<Self, anyhow::Error> {
        let port = std::env::var("PORT")
            .ok()
            .and_then(|p| p.parse().ok())
            .unwrap_or(3001);
        Ok(Config { port })
    }
}
