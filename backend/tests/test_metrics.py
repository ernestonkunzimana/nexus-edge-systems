import pytest
from fastapi.testclient import TestClient
from app.main import app


@pytest.fixture
def client():
    return TestClient(app)


def test_health(client):
    r = client.get("/health")
    assert r.status_code == 200
    assert r.json() == {"status": "ok"}


def test_metrics(client):
    r = client.get("/api/v1/metrics")
    assert r.status_code == 200
    data = r.json()
    assert isinstance(data, list)
    assert len(data) == 12
    assert "time" in data[0] and "value" in data[0]
