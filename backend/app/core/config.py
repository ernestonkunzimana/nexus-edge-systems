import os
from dataclasses import dataclass


@dataclass
class Settings:
    app_name: str = os.getenv("APP_NAME", "Nexus Edge Systems API")
    database_url: str = os.getenv("DATABASE_URL", "sqlite+aiosqlite:///./dev.db")
    sentry_dsn: str = os.getenv("SENTRY_DSN", "")


settings = Settings()
