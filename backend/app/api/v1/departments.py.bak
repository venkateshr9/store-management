from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
    status,
)

from sqlalchemy.orm import Session

from app.db.session import get_db

from app.repositories.department import (
    DepartmentRepository,
)

from app.services.department import (
    DepartmentService,
)

from app.schemas.department import (
    DepartmentCreate,
    DepartmentUpdate,
    DepartmentResponse,
)

router = APIRouter(
    prefix="/departments",
    tags=["Departments"],
)


def get_service(
    db: Session = Depends(get_db),
) -> DepartmentService:

    repository = DepartmentRepository(db)

    return DepartmentService(repository)


# ---------------------------------------------------------
# List
# ---------------------------------------------------------

@router.get(
    "/",
    response_model=list[DepartmentResponse],
)
def list_departments(
    service: DepartmentService = Depends(get_service),
):

    return service.list_departments()


# ---------------------------------------------------------
# Get
# ---------------------------------------------------------

@router.get(
    "/{department_id}",
    response_model=DepartmentResponse,
)
def get_department(
    department_id: int,
    service: DepartmentService = Depends(get_service),
):

    department = service.get_department(
        department_id,
    )

    if department is None:

        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Department not found.",
        )

    return department


# ---------------------------------------------------------
# Create
# ---------------------------------------------------------

@router.post(
    "/",
    response_model=DepartmentResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_department(
    payload: DepartmentCreate,
    service: DepartmentService = Depends(get_service),
):

    try:

        return service.create_department(
            payload,
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
    "/{department_id}",
    response_model=DepartmentResponse,
)
def update_department(
    department_id: int,
    payload: DepartmentUpdate,
    service: DepartmentService = Depends(get_service),
):

    try:

        return service.update_department(
            department_id,
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
    "/{department_id}",
    status_code=status.HTTP_204_NO_CONTENT,
)
def delete_department(
    department_id: int,
    service: DepartmentService = Depends(get_service),
):

    try:

        service.delete_department(
            department_id,
        )

    except ValueError as exc:

        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(exc),
        )
