from typing import Optional

from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker
from ..core.config import settings


# Lazily initialize the async engine so tests that don't need Postgres (e.g. in-memory
# SQLite tests) don't fail at import time due to missing asyncpg. The real engine will
# be created when the application starts in production or CI where DATABASE_URL is set
# and asyncpg is available.
engine = None  # type: Optional[object]
AsyncSessionLocal = None


def init_engine() -> None:
    global engine, AsyncSessionLocal
    if engine is not None:
        return
    # create_async_engine may import asyncpg; wrap to avoid import-time failures in dev
    engine = create_async_engine(settings.database_url, future=True, echo=False)
    AsyncSessionLocal = sessionmaker(bind=engine, class_=AsyncSession, expire_on_commit=False)


async def get_db():
    # Ensure engine/sessionmaker initialized when dependency is used in runtime.
    if AsyncSessionLocal is None:
        init_engine()
    async with AsyncSessionLocal() as session:
        yield session
