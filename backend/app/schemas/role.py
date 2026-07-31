from __future__ import annotations

from pydantic import Field

from app.core.enums import RecordStatus
from app.schemas.common import BaseSchema, AuditSchema, PaginatedResponse


class RoleBase(BaseSchema):
    role_code: str = Field(..., max_length=50)
    role_name: str = Field(..., max_length=100)

    description: str | None = None

    is_system: bool = False

    status: RecordStatus = RecordStatus.ACTIVE


class RoleCreate(RoleBase):
    pass


class RoleUpdate(BaseSchema):
    role_code: str | None = Field(default=None, max_length=50)
    role_name: str | None = Field(default=None, max_length=100)

    description: str | None = None

    is_system: bool | None = None

    status: RecordStatus | None = None


class RoleResponse(AuditSchema, RoleBase):
    pass


RoleListResponse = PaginatedResponse[RoleResponse]
