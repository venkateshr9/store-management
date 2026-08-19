from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.schemas.auth import LoginRequest, Token
from app.services.auth_service import login_user
from app.core.auth import get_current_user
from app.models.user import User

router = APIRouter(prefix="/auth", tags=["Authentication"])


@router.post("/login", response_model=Token)
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

@router.get("/me")
def me(
    current_user: User = Depends(get_current_user),
):
    return {
        "id": current_user.id,
        "username": current_user.username,
        "employee_no": current_user.employee_no,
        "full_name": current_user.full_name,
        "email": current_user.email,
        "mobile": current_user.mobile,
        "is_active": current_user.is_active,
    }
