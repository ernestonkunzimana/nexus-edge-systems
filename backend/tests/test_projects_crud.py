"""
Integration tests for Projects CRUD endpoints.
Uses SQLite in-memory DB for fast test isolation.
"""
import pytest
import sys
from pathlib import Path

# Add app to path
sys.path.insert(0, str(Path(__file__).parent.parent))

from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.pool import StaticPool
from sqlalchemy.orm import sessionmaker

from app.main import app
from app.models import Base
from app.core.database import get_db


# Use in-memory SQLite for test isolation
TEST_DATABASE_URL = "sqlite:///:memory:"


@pytest.fixture(scope="function")
def db_session():
    """Create an in-memory SQLite DB and override get_db dependency."""
    # Create sync engine with in-memory SQLite
    engine = create_engine(
        TEST_DATABASE_URL,
        connect_args={"check_same_thread": False},
        poolclass=StaticPool,
    )
    
    # Create all tables
    Base.metadata.create_all(bind=engine)
    
    # Create session maker
    TestSessionLocal = sessionmaker(bind=engine)
    
    def override_get_db():
        db = TestSessionLocal()
        try:
            yield db
        finally:
            db.close()
    
    # Override the dependency
    app.dependency_overrides[get_db] = override_get_db
    
    yield TestSessionLocal
    
    # Cleanup
    Base.metadata.drop_all(bind=engine)
    engine.dispose()
    app.dependency_overrides.clear()


@pytest.fixture
def client(db_session):
    """FastAPI test client using httpx with ASGI transport."""
    # Use FastAPI TestClient (requests-based) for sync tests against the ASGI app.
    return TestClient(app)


def test_list_projects_empty(client):
    """GET /api/v1/projects should return empty list initially."""
    response = client.get("/api/v1/projects")
    assert response.status_code == 200
    assert response.json() == []


def test_create_project(client):
    """POST /api/v1/projects should create a new project."""
    payload = {
        "name": "Test Project",
        "description": "A test project",
        "completion": 0,
    }
    response = client.post("/api/v1/projects", json=payload)
    assert response.status_code == 201
    data = response.json()
    assert data["name"] == "Test Project"
    assert data["description"] == "A test project"
    assert data["id"] is not None


def test_get_project(client):
    """GET /api/v1/projects/{id} should retrieve a specific project."""
    # Create a project first
    payload = {"name": "Get Test", "description": "Test retrieval", "completion": 50}
    create_resp = client.post("/api/v1/projects", json=payload)
    assert create_resp.status_code == 201
    project_id = create_resp.json()["id"]

    # Get it
    response = client.get(f"/api/v1/projects/{project_id}")
    assert response.status_code == 200
    data = response.json()
    assert data["id"] == project_id
    assert data["name"] == "Get Test"


def test_get_project_not_found(client):
    """GET /api/v1/projects/{id} with non-existent id should return 404."""
    response = client.get("/api/v1/projects/9999")
    assert response.status_code == 404


def test_update_project(client):
    """PUT /api/v1/projects/{id} should update a project."""
    # Create a project
    payload = {"name": "Original", "description": "Original desc", "completion": 10}
    create_resp = client.post("/api/v1/projects", json=payload)
    project_id = create_resp.json()["id"]

    # Update it
    update_payload = {"name": "Updated", "description": "Updated desc", "completion": 50}
    response = client.put(f"/api/v1/projects/{project_id}", json=update_payload)
    assert response.status_code == 200
    data = response.json()
    assert data["name"] == "Updated"
    assert data["completion"] == 50


def test_delete_project(client):
    """DELETE /api/v1/projects/{id} should delete a project."""
    # Create a project
    payload = {"name": "To Delete", "description": "Will be deleted", "completion": 0}
    create_resp = client.post("/api/v1/projects", json=payload)
    project_id = create_resp.json()["id"]

    # Delete it
    response = client.delete(f"/api/v1/projects/{project_id}")
    assert response.status_code == 204

    # Verify it's gone
    get_resp = client.get(f"/api/v1/projects/{project_id}")
    assert get_resp.status_code == 404
