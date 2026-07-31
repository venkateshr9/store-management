from fastapi import Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.core.auth import get_current_user
from app.db.database import get_db
from app.models.permission import Permission
from app.models.role import Role
from app.models.role_permission import RolePermission
from app.models.user import User
from app.models.user_role import UserRole


def get_current_user_permissions(
    current_user: User,
    db: Session,
) -> set[str]:
    """
    Return all permissions assigned to the current user.
    Example:
        {
            "users:view",
            "users:create",
            "inventory:receive"
        }
    """

    permissions = (
        db.query(Permission.module, Permission.action)
        .join(
            RolePermission,
            Permission.id == RolePermission.permission_id,
        )
        .join(
            Role,
            Role.id == RolePermission.role_id,
        )
        .join(
            UserRole,
            UserRole.role_id == Role.id,
        )
        .filter(
            UserRole.user_id == current_user.id,
        )
        .all()
    )

    return {
        f"{module}:{action}"
        for module, action in permissions
    }


def require_permission(permission: str):
    """
    Dependency for protecting API endpoints.
    """

    def checker(
        current_user: User = Depends(get_current_user),
        db: Session = Depends(get_db),
    ):
        permissions = get_current_user_permissions(
            current_user,
            db,
        )

        if permission not in permissions:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Permission denied",
            )

        return current_user

    return checker
