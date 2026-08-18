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

class CategoryBase(BaseSchema):

    category_code: str = Field(
        ...,
        max_length=50,
    )

    category_name: str = Field(
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

class CategoryCreate(CategoryBase):
    pass


# ---------------------------------------------------------
# Update
# ---------------------------------------------------------

class CategoryUpdate(BaseSchema):

    category_code: str | None = Field(
        default=None,
        max_length=50,
    )

    category_name: str | None = Field(
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

class CategoryResponse(
    AuditSchema,
    CategoryBase,
):

    id: int


CategoryListResponse = PaginatedResponse[
    CategoryResponse
]
