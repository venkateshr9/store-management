from __future__ import annotations

from pydantic import Field

from app.schemas.common import (
    AuditSchema,
    BaseSchema,
    PaginatedResponse,
)


# ---------------------------------------------------------
# Base
# ---------------------------------------------------------

class DepartmentBase(BaseSchema):

    department_code: str = Field(
        ...,
        max_length=50,
    )

    department_name: str = Field(
        ...,
        max_length=200,
    )

    description: str | None = Field(
        default=None,
        max_length=500,
    )

    is_active: bool = True

    remarks: str | None = Field(
        default=None,
        max_length=500,
    )


# ---------------------------------------------------------
# Create
# ---------------------------------------------------------

class DepartmentCreate(DepartmentBase):
    pass


# ---------------------------------------------------------
# Update
# ---------------------------------------------------------

class DepartmentUpdate(BaseSchema):

    department_code: str | None = Field(
        default=None,
        max_length=50,
    )

    department_name: str | None = Field(
        default=None,
        max_length=200,
    )

    description: str | None = Field(
        default=None,
        max_length=500,
    )

    is_active: bool | None = None

    remarks: str | None = Field(
        default=None,
        max_length=500,
    )


# ---------------------------------------------------------
# Response
# ---------------------------------------------------------

class DepartmentResponse(
    AuditSchema,
    DepartmentBase,
):

    id: int


DepartmentListResponse = PaginatedResponse[
    DepartmentResponse
]
