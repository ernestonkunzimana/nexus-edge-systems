from fastapi import APIRouter, Depends, HTTPException, status, Response
from pydantic import BaseModel, EmailStr
from sqlalchemy import select
from sqlalchemy.exc import IntegrityError
from sqlalchemy.ext.asyncio import AsyncSession
from typing import Optional

from ...models import User
from ...core.database import get_db
from ...utils.security import get_password_hash, verify_password, create_access_token
from ...core.config import settings

router = APIRouter(prefix="/api/v1/auth", tags=["auth"])


class UserCreate(BaseModel):
    email: EmailStr
    password: str


class UserOut(BaseModel):
    id: int
    email: EmailStr


class TokenOut(BaseModel):
    access_token: str
    token_type: str = "bearer"


@router.post("/register", response_model=UserOut)
async def register(user_in: UserCreate, db: AsyncSession = Depends(get_db)):
    stmt = select(User).where(User.email == user_in.email)
    existing = (await db.execute(stmt)).scalars().first()
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")

    user = User(email=user_in.email, hashed_password=get_password_hash(user_in.password))
    db.add(user)
    try:
        await db.commit()
        await db.refresh(user)
    except IntegrityError:
        await db.rollback()
        raise HTTPException(status_code=400, detail="Could not create user")

    return UserOut(id=user.id, email=user.email)


@router.post("/login", response_model=TokenOut)
async def login(user_in: UserCreate, response: Response, db: AsyncSession = Depends(get_db)):
    stmt = select(User).where(User.email == user_in.email)
    user = (await db.execute(stmt)).scalars().first()
    if not user or not verify_password(user_in.password, user.hashed_password):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")

    token = create_access_token(subject=str(user.id))
    # set HttpOnly cookie
    response.set_cookie(key="access_token", value=token, httponly=True, secure=False, samesite="lax")
    return TokenOut(access_token=token)
