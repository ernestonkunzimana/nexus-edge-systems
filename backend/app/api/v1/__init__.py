from fastapi import APIRouter

router = APIRouter()

from . import projects  # noqa: F401
from . import auth  # noqa: F401
