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

from app.repositories.supplier import SupplierRepository
from app.services.supplier import SupplierService

from app.schemas.supplier import (
    SupplierCreate,
    SupplierUpdate,
    SupplierResponse,
)


router = APIRouter(
    prefix="/suppliers",
    tags=["Suppliers"],
)


def get_service(
    db: Session = Depends(get_db),
) -> SupplierService:

    repository = SupplierRepository(db)

    return SupplierService(repository)


# ---------------------------------------------------------
# List
# ---------------------------------------------------------

@router.get(
    "/",
    response_model=list[SupplierResponse],
)
def list_suppliers(
    current_user: User = Depends(
        require_permission("suppliers:view")
    ),
    service: SupplierService = Depends(get_service),
):

    return service.list_suppliers()


# ---------------------------------------------------------
# Get
# ---------------------------------------------------------

@router.get(
    "/{supplier_id}",
    response_model=SupplierResponse,
)
def get_supplier(
    supplier_id: int,
    current_user: User = Depends(
        require_permission("suppliers:view")
    ),
    service: SupplierService = Depends(get_service),
):

    supplier = service.get_supplier(
        supplier_id
    )

    if supplier is None:

        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Supplier not found.",
        )

    return supplier


# ---------------------------------------------------------
# Create
# ---------------------------------------------------------

@router.post(
    "/",
    response_model=SupplierResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_supplier(
    payload: SupplierCreate,
    current_user: User = Depends(
        require_permission("suppliers:create")
    ),
    service: SupplierService = Depends(get_service),
):

    try:

        return service.create_supplier(
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
    "/{supplier_id}",
    response_model=SupplierResponse,
)
def update_supplier(
    supplier_id: int,
    payload: SupplierUpdate,
    current_user: User = Depends(
        require_permission("suppliers:update")
    ),
    service: SupplierService = Depends(get_service),
):

    try:

        return service.update_supplier(
            supplier_id,
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
    "/{supplier_id}",
    status_code=status.HTTP_204_NO_CONTENT,
)
def delete_supplier(
    supplier_id: int,
    current_user: User = Depends(
        require_permission("suppliers:delete")
    ),
    service: SupplierService = Depends(get_service),
):

    try:

        service.delete_supplier(
            supplier_id
        )

    except ValueError as exc:

        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(exc),
        )
