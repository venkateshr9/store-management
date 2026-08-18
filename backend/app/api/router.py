from fastapi import APIRouter

from app.api.v1.auth import router as auth_router
from app.api.v1.users import router as users_router
from app.api.v1.role import router as role_router
from app.api.v1.platform_module import router as platform_module_router
from app.api.v1.permission import router as permission_router
from app.api.v1.departments import router as departments_router
from app.api.v1.category import router as category_router
from app.api.v1.supplier import router as supplier_router
from app.api.v1.product import router as product_router

api_router = APIRouter()


@api_router.get("/", tags=["API"])
def api_root():
    return {
        "message": "Store Management System API v1",
        "version": "1.0.0",
    }


api_router.include_router(auth_router)
api_router.include_router(users_router)
api_router.include_router(role_router)
api_router.include_router(platform_module_router)
api_router.include_router(permission_router)
api_router.include_router(departments_router)
api_router.include_router(category_router)
api_router.include_router(supplier_router)
api_router.include_router(product_router)
