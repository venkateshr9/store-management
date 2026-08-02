from __future__ import annotations

from pydantic import Field

from app.schemas.common import (
    BaseSchema,
    AuditSchema,
    PaginatedResponse,
)


class PermissionBase(BaseSchema):
    module: str = Field(..., max_length=100)

    action: str = Field(..., max_length=100)

    description: str | None = None


class PermissionCreate(PermissionBase):
    pass


class PermissionUpdate(BaseSchema):
    module: str | None = Field(
        default=None,
        max_length=100,
    )

    action: str | None = Field(
        default=None,
        max_length=100,
    )

    description: str | None = None


class PermissionResponse(
    AuditSchema,
    PermissionBase,
):
    code: str


PermissionListResponse = PaginatedResponse[
    PermissionResponse
]
