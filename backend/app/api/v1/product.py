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

from app.repositories.product import ProductRepository
from app.services.product import ProductService

from app.schemas.product import (
    ProductCreate,
    ProductUpdate,
    ProductResponse,
)


router = APIRouter(
    prefix="/products",
    tags=["Products"],
)


def get_service(
    db: Session = Depends(get_db),
) -> ProductService:

    repository = ProductRepository(db)

    return ProductService(repository)


# ---------------------------------------------------------
# List
# ---------------------------------------------------------

@router.get(
    "/",
    response_model=list[ProductResponse],
)
def list_products(
    current_user: User = Depends(
        require_permission("items:view")
    ),
    service: ProductService = Depends(get_service),
):

    return service.list_products()


# ---------------------------------------------------------
# Get
# ---------------------------------------------------------

@router.get(
    "/{product_id}",
    response_model=ProductResponse,
)
def get_product(
    product_id: int,
    current_user: User = Depends(
        require_permission("items:view")
    ),
    service: ProductService = Depends(get_service),
):

    product = service.get_product(
        product_id
    )

    if product is None:

        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Product not found.",
        )

    return product


# ---------------------------------------------------------
# Create
# ---------------------------------------------------------

@router.post(
    "/",
    response_model=ProductResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_product(
    payload: ProductCreate,
    current_user: User = Depends(
        require_permission("items:create")
    ),
    service: ProductService = Depends(get_service),
):

    try:

        return service.create_product(
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
    "/{product_id}",
    response_model=ProductResponse,
)
def update_product(
    product_id: int,
    payload: ProductUpdate,
    current_user: User = Depends(
        require_permission("items:update")
    ),
    service: ProductService = Depends(get_service),
):

    try:

        return service.update_product(
            product_id,
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
    "/{product_id}",
    status_code=status.HTTP_204_NO_CONTENT,
)
def delete_product(
    product_id: int,
    current_user: User = Depends(
        require_permission("items:delete")
    ),
    service: ProductService = Depends(get_service),
):

    try:

        service.delete_product(
            product_id
        )

    except ValueError as exc:

        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(exc),
        )
