"""
Seed script to populate sample projects in the database.
Useful for local development and demos.

Usage:
    python seed_projects.py
"""
import asyncio
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker

from app.models import Base, Project, User
from app.core.config import settings
from app.utils.security import get_password_hash


async def seed_data():
    """Create sample users and projects."""
    engine = create_async_engine(settings.database_url, echo=False)
    AsyncSessionLocal = sessionmaker(bind=engine, class_=AsyncSession, expire_on_commit=False)

    # Create tables
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

    # Seed data
    async with AsyncSessionLocal() as session:
        # Create sample users
        user1 = User(
            email="alice@example.com",
            hashed_password=get_password_hash("password123"),
            is_active=True,
        )
        user2 = User(
            email="bob@example.com",
            hashed_password=get_password_hash("password456"),
            is_active=True,
        )
        session.add(user1)
        session.add(user2)
        await session.flush()

        # Create sample projects
        projects = [
            Project(
                name="Aetha - Pan-African Cloud",
                description="Building a distributed cloud infrastructure across Africa",
                completion=23,
                owner_id=user1.id,
            ),
            Project(
                name="Aether Vision - AI Drone System",
                description="Advanced aerial surveillance and mapping using AI",
                completion=42,
                owner_id=user1.id,
            ),
            Project(
                name="Nexus Edge - IoT Platform",
                description="Edge computing platform for IoT and real-time analytics",
                completion=67,
                owner_id=user2.id,
            ),
            Project(
                name="Quantum Bridge - Secure Comms",
                description="Post-quantum cryptography communication layer",
                completion=15,
                owner_id=user2.id,
            ),
            Project(
                name="DataStream - Analytics Engine",
                description="Real-time data processing and visualization",
                completion=89,
            ),
        ]
        for project in projects:
            session.add(project)

        await session.commit()
        print("✅ Seeded 2 users and 5 sample projects")

    await engine.dispose()


if __name__ == "__main__":
    asyncio.run(seed_data())
