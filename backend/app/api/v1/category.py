from app.core.permissions import require_permission

from app.models.user import User

from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
    status,
)

from sqlalchemy.orm import Session

from app.db.session import get_db

from app.repositories.category import CategoryRepository
from app.services.category import CategoryService

from app.schemas.category import (
    CategoryCreate,
    CategoryUpdate,
    CategoryResponse,
)


router = APIRouter(
    prefix="/categories",
    tags=["Categories"],
)


def get_service(
    db: Session = Depends(get_db),
) -> CategoryService:

    repository = CategoryRepository(db)

    return CategoryService(repository)


# ---------------------------------------------------------
# List
# ---------------------------------------------------------

@router.get(
    "/",
    response_model=list[CategoryResponse],
)
def list_categories(
    current_user: User = Depends(
        require_permission("categories:view")
    ),
    service: CategoryService = Depends(get_service),
):

    return service.list_categories()


# ---------------------------------------------------------
# Get
# ---------------------------------------------------------

@router.get(
    "/{category_id}",
    response_model=CategoryResponse,
)
def get_category(
    category_id: int,
    current_user: User = Depends(
        require_permission("categories:view")
    ),
    service: CategoryService = Depends(get_service),
):

    category = service.get_category(
        category_id
    )

    if category is None:

        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Category not found.",
        )

    return category


# ---------------------------------------------------------
# Create
# ---------------------------------------------------------

@router.post(
    "/",
    response_model=CategoryResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_category(
    payload: CategoryCreate,
    current_user: User = Depends(
        require_permission("categories:create")
    ),
    service: CategoryService = Depends(get_service),
):

    try:

        return service.create_category(
            payload
        )

    except ValueError as exc:

        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(exc),
        )


# ---------------------------------------------------------
# Update
# ---------------------------------------------------------

@router.put(
    "/{category_id}",
    response_model=CategoryResponse,
)
def update_category(
    category_id: int,
    payload: CategoryUpdate,
    current_user: User = Depends(
        require_permission("categories:update")
    ),
    service: CategoryService = Depends(get_service),
):

    try:

        return service.update_category(
            category_id,
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
    "/{category_id}",
    status_code=status.HTTP_204_NO_CONTENT,
)
def delete_category(
    category_id: int,
    current_user: User = Depends(
        require_permission("categories:delete")
    ),
    service: CategoryService = Depends(get_service),
):

    try:

        service.delete_category(
            category_id
        )

    except ValueError as exc:

        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(exc),
        )
