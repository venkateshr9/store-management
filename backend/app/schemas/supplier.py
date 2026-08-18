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

class SupplierBase(BaseSchema):

    supplier_code: str = Field(
        ...,
        max_length=50,
    )

    supplier_name: str = Field(
        ...,
        max_length=200,
    )

    contact_person: str | None = Field(
        default=None,
        max_length=200,
    )

    phone: str | None = Field(
        default=None,
        max_length=50,
    )

    email: str | None = Field(
        default=None,
        max_length=200,
    )

    address: str | None = Field(
        default=None,
        max_length=500,
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

class SupplierCreate(SupplierBase):
    pass


# ---------------------------------------------------------
# Update
# ---------------------------------------------------------

class SupplierUpdate(BaseSchema):

    supplier_code: str | None = Field(
        default=None,
        max_length=50,
    )

    supplier_name: str | None = Field(
        default=None,
        max_length=200,
    )

    contact_person: str | None = Field(
        default=None,
        max_length=200,
    )

    phone: str | None = Field(
        default=None,
        max_length=50,
    )

    email: str | None = Field(
        default=None,
        max_length=200,
    )

    address: str | None = Field(
        default=None,
        max_length=500,
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

class SupplierResponse(
    AuditSchema,
    SupplierBase,
):

    id: int


SupplierListResponse = PaginatedResponse[
    SupplierResponse
]
