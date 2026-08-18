from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
    status,
)

from sqlalchemy.orm import Session

from app.db.session import get_db

from app.repositories.permission import PermissionRepository
from app.services.permission import PermissionService

from app.schemas.permission import (
    PermissionCreate,
    PermissionUpdate,
    PermissionResponse,
)

router = APIRouter(
    prefix="/permissions",
    tags=["Permissions"],
)


def get_service(
    db: Session = Depends(get_db),
) -> PermissionService:
    repository = PermissionRepository(db)
    return PermissionService(repository)


@router.get(
    "/",
    response_model=list[PermissionResponse],
)
def list_permissions(
    service: PermissionService = Depends(get_service),
):
    return service.list_permissions()


@router.get(
    "/{permission_id}",
    response_model=PermissionResponse,
)
def get_permission(
    permission_id: int,
    service: PermissionService = Depends(get_service),
):
    permission = service.get_permission(permission_id)

    if permission is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Permission not found.",
        )

    return permission


@router.post(
    "/",
    response_model=PermissionResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_permission(
    payload: PermissionCreate,
    service: PermissionService = Depends(get_service),
):
    try:
        return service.create_permission(payload)

    except ValueError as exc:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(exc),
        )


@router.put(
    "/{permission_id}",
    response_model=PermissionResponse,
)
def update_permission(
    permission_id: int,
    payload: PermissionUpdate,
    service: PermissionService = Depends(get_service),
):
    try:
        return service.update_permission(
            permission_id,
            payload,
        )

    except ValueError as exc:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(exc),
        )


@router.delete(
    "/{permission_id}",
    status_code=status.HTTP_204_NO_CONTENT,
)
def delete_permission(
    permission_id: int,
    service: PermissionService = Depends(get_service),
):
    try:
        service.delete_permission(permission_id)

    except ValueError as exc:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(exc),
        )
