from typing import List, Optional

from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel
from sqlalchemy import select, update, delete
from sqlalchemy.ext.asyncio import AsyncSession

from ...models import Project as ProjectModel
from ...core.database import get_db


router = APIRouter(prefix="/api/v1/projects", tags=["projects"])


class ProjectCreate(BaseModel):
    name: str
    description: Optional[str] = None
    completion: Optional[int] = 0


class ProjectUpdate(BaseModel):
    name: Optional[str]
    description: Optional[str]
    completion: Optional[int]


class ProjectOut(BaseModel):
    id: int
    name: str
    description: Optional[str]
    completion: int
    owner_id: Optional[int]

    class Config:
        from_attributes = True


@router.get("/", response_model=List[ProjectOut])
async def list_projects(db: AsyncSession = Depends(get_db)):
    stmt = select(ProjectModel)
    result = await db.execute(stmt)
    projects = result.scalars().all()
    return projects


@router.post("/", response_model=ProjectOut, status_code=status.HTTP_201_CREATED)
async def create_project(payload: ProjectCreate, db: AsyncSession = Depends(get_db)):
    project = ProjectModel(name=payload.name, description=payload.description, completion=payload.completion)
    db.add(project)
    await db.commit()
    await db.refresh(project)
    return project


@router.get("/{project_id}", response_model=ProjectOut)
async def get_project(project_id: int, db: AsyncSession = Depends(get_db)):
    stmt = select(ProjectModel).where(ProjectModel.id == project_id)
    res = await db.execute(stmt)
    project = res.scalars().first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    return project


@router.put("/{project_id}", response_model=ProjectOut)
async def update_project(project_id: int, payload: ProjectUpdate, db: AsyncSession = Depends(get_db)):
    stmt = select(ProjectModel).where(ProjectModel.id == project_id)
    res = await db.execute(stmt)
    project = res.scalars().first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")

    if payload.name is not None:
        project.name = payload.name
    if payload.description is not None:
        project.description = payload.description
    if payload.completion is not None:
        project.completion = payload.completion

    db.add(project)
    await db.commit()
    await db.refresh(project)
    return project


@router.delete("/{project_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_project(project_id: int, db: AsyncSession = Depends(get_db)):
    stmt = select(ProjectModel).where(ProjectModel.id == project_id)
    res = await db.execute(stmt)
    project = res.scalars().first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")

    await db.delete(project)
    await db.commit()
    return None
