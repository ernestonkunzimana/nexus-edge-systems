from fastapi import APIRouter
from pydantic import BaseModel
from typing import List

router = APIRouter(prefix="/api/v1/projects", tags=["projects"])


class Project(BaseModel):
    id: str
    name: str
    completion: int


@router.get("/", response_model=List[Project])
async def list_projects():
    # mocked sample response — replace with DB-backed retrieval
    return [
        Project(id="aetha", name="Aetha - Pan-African Cloud", completion=23),
        Project(id="aetherVision", name="Aether Vision - AI Drone System", completion=42),
    ]
