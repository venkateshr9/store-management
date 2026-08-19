from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.schemas.auth import LoginRequest, Token
from app.services.auth_service import login_user
from app.core.auth import get_current_user

from app.models.user import User
from app.models.role import Role
from app.models.permission import Permission
from app.models.user_role import UserRole
from app.models.role_permission import RolePermission


router = APIRouter(
    prefix="/auth",
    tags=["Authentication"],
)


# =========================================================
# Login
# =========================================================

@router.post(
    "/login",
    response_model=Token,
)
def login(
    credentials: LoginRequest,
    db: Session = Depends(get_db),
):
    token = login_user(
        db,
        credentials.username,
        credentials.password,
    )

    if token is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid username or password",
        )

    return {
        "access_token": token,
        "token_type": "bearer",
    }


# =========================================================
# Current User
# =========================================================

@router.get("/me")
def me(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    # -----------------------------------------------------
    # Roles assigned to current user
    # -----------------------------------------------------

    roles = (
        db.query(
            Role.id,
            Role.role_code,
            Role.role_name,
        )
        .join(
            UserRole,
            UserRole.role_id == Role.id,
        )
        .filter(
            UserRole.user_id == current_user.id,
        )
        .order_by(
            Role.role_name,
        )
        .all()
    )

    # -----------------------------------------------------
    # Permissions inherited through user's roles
    # -----------------------------------------------------

    permissions = (
        db.query(
            Permission.module,
            Permission.action,
        )
        .join(
            RolePermission,
            RolePermission.permission_id == Permission.id,
        )
        .join(
            UserRole,
            UserRole.role_id == RolePermission.role_id,
        )
        .filter(
            UserRole.user_id == current_user.id,
        )
        .order_by(
            Permission.module,
            Permission.action,
        )
        .all()
    )

    # -----------------------------------------------------
    # Remove duplicate permissions
    # -----------------------------------------------------

    permission_codes = sorted(
        {
            f"{module}:{action}"
            for module, action in permissions
        }
    )

    # -----------------------------------------------------
    # Response
    # -----------------------------------------------------

    return {
        "id": current_user.id,
        "username": current_user.username,
        "employee_no": current_user.employee_no,
        "full_name": current_user.full_name,
        "email": current_user.email,
        "mobile": current_user.mobile,
        "is_active": current_user.is_active,

        "roles": [
            {
                "id": role.id,
                "code": role.role_code,
                "name": role.role_name,
            }
            for role in roles
        ],

        "permissions": permission_codes,
    }
