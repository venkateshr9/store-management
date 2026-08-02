from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
    status,
)

from sqlalchemy.orm import Session

from app.db.session import get_db

from app.repositories.user import UserRepository
from app.services.user import UserService

from app.schemas.user import (
    UserCreate,
    UserUpdate,
    UserResponse,
)

router = APIRouter(
    prefix="/users",
    tags=["Users"],
)


def get_service(
    db: Session = Depends(get_db),
) -> UserService:

    repository = UserRepository(db)

    return UserService(repository)


# ---------------------------------------------------------
# List
# ---------------------------------------------------------

@router.get(
    "/",
    response_model=list[UserResponse],
)
def list_users(
    service: UserService = Depends(get_service),
):

    return service.list_users()


# ---------------------------------------------------------
# Get
# ---------------------------------------------------------

@router.get(
    "/{user_id}",
    response_model=UserResponse,
)
def get_user(
    user_id: int,
    service: UserService = Depends(get_service),
):

    user = service.get_user(user_id)

    if user is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found.",
        )

    return user


# ---------------------------------------------------------
# Create
# ---------------------------------------------------------

@router.post(
    "/",
    response_model=UserResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_user(
    payload: UserCreate,
    service: UserService = Depends(get_service),
):

    try:
        return service.create_user(payload)

    except ValueError as exc:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(exc),
        )


# ---------------------------------------------------------
# Update
# ---------------------------------------------------------

@router.put(
    "/{user_id}",
    response_model=UserResponse,
)
def update_user(
    user_id: int,
    payload: UserUpdate,
    service: UserService = Depends(get_service),
):

    try:
        return service.update_user(
            user_id,
            payload,
        )

    except ValueError as exc:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(exc),
        )


# ---------------------------------------------------------
# Delete
# ---------------------------------------------------------

@router.delete(
    "/{user_id}",
    status_code=status.HTTP_204_NO_CONTENT,
)
def delete_user(
    user_id: int,
    service: UserService = Depends(get_service),
):

    try:
        service.delete_user(user_id)

    except ValueError as exc:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(exc),
        )
