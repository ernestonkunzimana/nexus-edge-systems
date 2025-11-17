from fastapi import FastAPI
from pydantic import BaseModel
from typing import List
import random

app = FastAPI(title="Nexus Edge Systems API")


class MetricPoint(BaseModel):
    time: str
    value: float


@app.get("/health")
async def health():
    return {"status": "ok"}


@app.get("/api/v1/metrics", response_model=List[MetricPoint])
async def metrics():
    """Return a small list of mocked metric points.

    This endpoint is intentionally simple so the frontend can consume it during development and in demos.
    Replace with real metrics collection when available.
    """
    data = []
    for i in range(12):
        data.append(MetricPoint(time=f"{i}:00", value=round(20 + random.random() * 80, 2)))
    return data
