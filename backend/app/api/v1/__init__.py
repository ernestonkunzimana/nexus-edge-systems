from fastapi import APIRouter

router = APIRouter()

# Import submodules so their `router` objects are created
from . import projects  # noqa: F401
from . import auth  # noqa: F401

# Include sub-routers so routes defined in modules are mounted under `/api/v1`
router.include_router(projects.router)
router.include_router(auth.router)
