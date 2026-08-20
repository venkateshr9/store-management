from __future__ import annotations
from app.core.permissions import require_permission
from app.models.user import User

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.repositories.role import RoleRepository
from app.schemas.role import (
    RoleCreate,
    RoleResponse,
    RoleUpdate,
)
from app.schemas.role_permission import (
    RolePermissionResponse,
    RolePermissionUpdate,
)
from app.services.role import RoleService

router = APIRouter(
    prefix="/roles",
    tags=["Roles"],
)


# ---------------------------------------------------------
# Dependency
# ---------------------------------------------------------

def get_service(
    db: Session = Depends(get_db),
) -> RoleService:
    repository = RoleRepository(db)
    return RoleService(repository)


# ---------------------------------------------------------
# Create Role
# ---------------------------------------------------------

@router.post(
    "/",
    response_model=RoleResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_role(
    payload: RoleCreate,
    current_user: User = Depends(
        require_permission("roles:create")
    ),
    service: RoleService = Depends(get_service),
):
    try:
        return service.create_role(payload)

    except ValueError as exc:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(exc),
        )


# ---------------------------------------------------------
# List Roles
# ---------------------------------------------------------

@router.get(
    "/",
    response_model=list[RoleResponse],
)
def list_roles(
    current_user: User = Depends(
        require_permission("roles:view")
    ),
    service: RoleService = Depends(get_service),
):
    return service.list_roles()



# ---------------------------------------------------------
# List Active Roles
# ---------------------------------------------------------

@router.get(
    "/active",
    response_model=list[RoleResponse],
)
def list_active_roles(
    current_user: User = Depends(
        require_permission("roles:view")
    ),
    service: RoleService = Depends(get_service),
):
    return service.list_active_roles()


# ---------------------------------------------------------
# Get Role
# ---------------------------------------------------------

@router.get(
    "/{role_id}",
    response_model=RoleResponse,
)
def get_role(
    role_id: int,
    current_user: User = Depends(
        require_permission("roles:view")
    ),
    service: RoleService = Depends(get_service),
):
    role = service.get_role(role_id)

    if role is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Role not found.",
        )

    return role


# ---------------------------------------------------------
# Update Role
# ---------------------------------------------------------

@router.put(
    "/{role_id}",
    response_model=RoleResponse,
)
def update_role(
    role_id: int,
    payload: RoleUpdate,
    current_user: User = Depends(
        require_permission("roles:update")
    ),
    service: RoleService = Depends(get_service),
):
    try:
        return service.update_role(
            role_id,
            payload,
        )

    except ValueError as exc:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(exc),
        )


# ---------------------------------------------------------
# Get Role Permissions
# ---------------------------------------------------------

@router.get(
    "/{role_id}/permissions",
    response_model=RolePermissionResponse,
)
def get_role_permissions(
    role_id: int,
    current_user: User = Depends(
        require_permission("roles:view")
    ),
    service: RoleService = Depends(get_service),
):
    try:
        permission_ids = service.get_permission_ids(role_id)

        return RolePermissionResponse(
            permission_ids=permission_ids
        )

    except ValueError as exc:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(exc),
        )


# ---------------------------------------------------------
# Update Role Permissions
# ---------------------------------------------------------

@router.put(
    "/{role_id}/permissions",
    response_model=RolePermissionResponse,
)
def update_role_permissions(
    role_id: int,
    payload: RolePermissionUpdate,
    current_user: User = Depends(
        require_permission("roles:update")
    ),
    service: RoleService = Depends(get_service),
):
    try:
        permission_ids = service.update_permission_ids(
            role_id,
            payload.permission_ids,
        )

        return RolePermissionResponse(
            permission_ids=permission_ids
        )

    except ValueError as exc:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(exc),
        )


# ---------------------------------------------------------
# Delete Role
# ---------------------------------------------------------

@router.delete(
    "/{role_id}",
    status_code=status.HTTP_204_NO_CONTENT,
)
def delete_role(
    role_id: int,
    current_user: User = Depends(
        require_permission("roles:delete")
    ),
    service: RoleService = Depends(get_service),
):
    try:
        service.delete_role(role_id)

    except ValueError as exc:
        if str(exc) == "Role not found.":
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=str(exc),
            )

        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(exc),
        )
