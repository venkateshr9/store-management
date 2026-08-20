from __future__ import annotations

from pydantic import BaseModel, Field


class RolePermissionResponse(BaseModel):
    permission_ids: list[int]


class RolePermissionUpdate(BaseModel):
    permission_ids: list[int] = Field(default_factory=list)
