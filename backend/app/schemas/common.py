from __future__ import annotations

from datetime import datetime
from typing import Generic, TypeVar

from pydantic import BaseModel, ConfigDict

T = TypeVar("T")


# ---------------------------------------------------------
# Base Schema
# ---------------------------------------------------------

class BaseSchema(BaseModel):
    model_config = ConfigDict(
        from_attributes=True,
        extra="forbid",
        validate_assignment=True,
    )


# ---------------------------------------------------------
# Audit Schema
# ---------------------------------------------------------

class AuditSchema(BaseSchema):
    id: int

    created_by: int | None = None
    created_at: datetime

    updated_by: int | None = None
    updated_at: datetime


# ---------------------------------------------------------
# Generic Paginated Response
# ---------------------------------------------------------

class PaginatedResponse(BaseSchema, Generic[T]):
    items: list[T]

    total: int
    page: int
    page_size: int

    has_next: bool
    has_previous: bool
