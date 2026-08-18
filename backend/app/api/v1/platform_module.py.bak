from __future__ import annotations

from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.models.platform_module import PlatformModule
from app.repositories.platform_module import PlatformModuleRepository
from app.schemas.platform_module import (
    PlatformModuleCreate,
    PlatformModuleResponse,
    PlatformModuleUpdate,
)
from app.services.platform_module import PlatformModuleService

router = APIRouter(
    prefix="/platform-modules",
    tags=["Platform Modules"],
)


# ---------------------------------------------------------
# Dependency
# ---------------------------------------------------------

def get_service(
    db: Session = Depends(get_db),
) -> PlatformModuleService:
    repository = PlatformModuleRepository(db)
    return PlatformModuleService(repository)


# ---------------------------------------------------------
# Create Module
# ---------------------------------------------------------

@router.post(
    "/",
    response_model=PlatformModuleResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_module(
    payload: PlatformModuleCreate,
    service: PlatformModuleService = Depends(get_service),
):

    try:
        return service.create_module(payload)

    except ValueError as exc:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(exc),
        )


# ---------------------------------------------------------
# Get Module
# ---------------------------------------------------------

@router.get(
    "/{module_id}",
    response_model=PlatformModuleResponse,
)
def get_module(
    module_id: int,
    service: PlatformModuleService = Depends(get_service),
):

    module = service.get_module(module_id)

    if module is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Platform module not found.",
        )

    return module


# ---------------------------------------------------------
# List Modules
# ---------------------------------------------------------

@router.get(
    "/",
    response_model=list[PlatformModuleResponse],
)
def list_modules(
    service: PlatformModuleService = Depends(get_service),
):
    return service.list_modules()


# ---------------------------------------------------------
# List Active Modules
# ---------------------------------------------------------

@router.get(
    "/active",
    response_model=list[PlatformModuleResponse],
)
def list_active_modules(
    service: PlatformModuleService = Depends(get_service),
):
    return service.list_active_modules()


# ---------------------------------------------------------
# Update Module
# ---------------------------------------------------------

@router.put(
    "/{module_id}",
    response_model=PlatformModuleResponse,
)
def update_module(
    module_id: int,
    payload: PlatformModuleUpdate,
    service: PlatformModuleService = Depends(get_service),
):

    try:
        return service.update_module(module_id, payload)

    except ValueError as exc:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(exc),
        )


# ---------------------------------------------------------
# Delete Module
# ---------------------------------------------------------

@router.delete(
    "/{module_id}",
    status_code=status.HTTP_204_NO_CONTENT,
)
def delete_module(
    module_id: int,
    service: PlatformModuleService = Depends(get_service),
):

    try:
        service.delete_module(module_id)

    except ValueError as exc:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(exc),
        )


# ---------------------------------------------------------
# Soft Delete
# ---------------------------------------------------------

@router.patch(
    "/{module_id}/deactivate",
    response_model=PlatformModuleResponse,
)
def deactivate_module(
    module_id: int,
    service: PlatformModuleService = Depends(get_service),
):

    try:
        return service.soft_delete_module(module_id)

    except ValueError as exc:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(exc),
        )


# ---------------------------------------------------------
# Restore
# ---------------------------------------------------------

@router.patch(
    "/{module_id}/restore",
    response_model=PlatformModuleResponse,
)
def restore_module(
    module_id: int,
    service: PlatformModuleService = Depends(get_service),
):

    try:
        return service.restore_module(module_id)

    except ValueError as exc:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(exc),
        )
