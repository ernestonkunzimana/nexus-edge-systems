"""
Utility script to create database tables from SQLAlchemy models.
This is intentionally synchronous and intended for one-off execution during
dev or in CI to bootstrap databases when Alembic isn't used.
"""
import os
from sqlalchemy import create_engine
from sqlalchemy.engine.url import make_url

from app.models import Base
from app.core.config import settings


def _sync_url(url: str) -> str:
    # Convert async driver URLs to their sync counterparts for table creation
    if url.startswith("sqlite+aiosqlite://"):
        return url.replace("+aiosqlite", "")
    if url.startswith("postgresql+"):
        return url.replace("+asyncpg", "")
    return url


def main():
    database_url = settings.database_url
    sync_url = _sync_url(database_url)
    engine = create_engine(sync_url)
    Base.metadata.create_all(bind=engine)
    print("Tables created (if not existed)")


if __name__ == "__main__":
    main()
