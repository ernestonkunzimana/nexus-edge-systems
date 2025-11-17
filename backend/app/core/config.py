from pydantic import BaseSettings


class Settings(BaseSettings):
    app_name: str = "Nexus Edge Systems API"
    database_url: str = "sqlite+aiosqlite:///./dev.db"
    sentry_dsn: str = ""

    class Config:
        env_file = ".env"


settings = Settings()
