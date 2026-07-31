from __future__ import annotations

from pydantic import Field

from app.core.enums import ModuleType, RecordStatus

from app.schemas.common import BaseSchema, AuditSchema, PaginatedResponse

# ---------------------------------------------------------
# Base Schema
# ---------------------------------------------------------

class PlatformModuleBase(BaseSchema):
    module_code: str = Field(..., max_length=50)
    module_name: str = Field(..., max_length=100)
    display_name: str = Field(..., max_length=150)

    module_type: ModuleType

    description: str | None = None

    table_name: str = Field(..., max_length=100)

    route_path: str | None = Field(default=None, max_length=200)
    api_prefix: str | None = Field(default=None, max_length=200)

    menu_group: str | None = Field(default=None, max_length=100)
    menu_icon: str | None = Field(default=None, max_length=100)

    menu_order: int = 0

    enable_create: bool = True
    enable_edit: bool = True
    enable_delete: bool = True
    enable_view: bool = True

    enable_export: bool = False
    enable_import: bool = False
    enable_print: bool = False

    enable_workflow: bool = False
    enable_attachment: bool = False
    enable_comments: bool = False

    enable_audit: bool = True
    enable_versioning: bool = True
    enable_soft_delete: bool = True

    status: RecordStatus = RecordStatus.ACTIVE


# ---------------------------------------------------------
# Create Schema
# ---------------------------------------------------------

class PlatformModuleCreate(PlatformModuleBase):
    pass


# ---------------------------------------------------------
# Update Schema
# ---------------------------------------------------------

class PlatformModuleUpdate(BaseSchema):
    module_code: str | None = Field(default=None, max_length=50)
    module_name: str | None = Field(default=None, max_length=100)
    display_name: str | None = Field(default=None, max_length=150)

    module_type: ModuleType | None = None

    description: str | None = None

    table_name: str | None = Field(default=None, max_length=100)

    route_path: str | None = Field(default=None, max_length=200)
    api_prefix: str | None = Field(default=None, max_length=200)

    menu_group: str | None = Field(default=None, max_length=100)
    menu_icon: str | None = Field(default=None, max_length=100)

    menu_order: int | None = None

    enable_create: bool | None = None
    enable_edit: bool | None = None
    enable_delete: bool | None = None
    enable_view: bool | None = None

    enable_export: bool | None = None
    enable_import: bool | None = None
    enable_print: bool | None = None

    enable_workflow: bool | None = None
    enable_attachment: bool | None = None
    enable_comments: bool | None = None

    enable_audit: bool | None = None
    enable_versioning: bool | None = None
    enable_soft_delete: bool | None = None

    status: RecordStatus | None = None


# ---------------------------------------------------------
# Response Schema
# ---------------------------------------------------------

class PlatformModuleResponse(AuditSchema, PlatformModuleBase):
    pass


# ---------------------------------------------------------
# List Response
# ---------------------------------------------------------

PlatformModuleListResponse = PaginatedResponse[PlatformModuleResponse]
