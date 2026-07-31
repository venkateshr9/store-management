from __future__ import annotations

from datetime import datetime

from typing import TYPE_CHECKING

from sqlalchemy import (
    BigInteger,
    Boolean,
    TIMESTAMP,
    Enum as SqlEnum,
    Index,
    Integer,
    String,
    Text,
    func,
    text,
    true,
    false,
)

from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base
from app.core.enums import ModuleType, RecordStatus

if TYPE_CHECKING:
    from app.models.platform_module_field import PlatformModuleField


class PlatformModule(Base):
    __tablename__ = "platform_modules"

    __table_args__ = (
        Index("idx_module_type", "module_type"),
        Index("idx_status", "status"),
    )

    id: Mapped[int] = mapped_column(
        BigInteger,
        primary_key=True,
        autoincrement=True,
    )

    module_code: Mapped[str] = mapped_column(
        String(50),
        unique=True,
        nullable=False,
    )

    module_name: Mapped[str] = mapped_column(
        String(100),
        nullable=False,
    )

    display_name: Mapped[str] = mapped_column(
        String(150),
        nullable=False,
    )

    module_type: Mapped[ModuleType] = mapped_column(
        SqlEnum(
            ModuleType,
            name="module_type_enum",
        ),
        nullable=False,
    )

    description: Mapped[str | None] = mapped_column(
        Text
    )

    table_name: Mapped[str] = mapped_column(
        String(100),
        unique=True,
        nullable=False,
    )

    route_path: Mapped[str | None] = mapped_column(
        String(200)
    )

    api_prefix: Mapped[str | None] = mapped_column(
        String(200)
    )

    menu_group: Mapped[str | None] = mapped_column(
        String(100)
    )

    menu_icon: Mapped[str | None] = mapped_column(
        String(100)
    )

    menu_order: Mapped[int] = mapped_column(
        Integer,
        server_default=text("0"),
    )

    enable_create: Mapped[bool] = mapped_column(
        Boolean,
        nullable=False,
        default=True,
        server_default=true(),
    )

    enable_edit: Mapped[bool] = mapped_column(
        Boolean,
        nullable=False,
        default=True,
        server_default=true(),
    )

    enable_delete: Mapped[bool] = mapped_column(
        Boolean,
        nullable=False,
        default=True,
        server_default=true(),
    )

    enable_view: Mapped[bool] = mapped_column(
        Boolean,
        nullable=False,
        default=True,
        server_default=true(),
    )

    enable_export: Mapped[bool] = mapped_column(
        Boolean,
        nullable=False,
        default=False,
        server_default=false(),
    )

    enable_import: Mapped[bool] = mapped_column(
        Boolean,
        nullable=False,
        default=False,
        server_default=false(),
    )

    enable_print: Mapped[bool] = mapped_column(
        Boolean,
        nullable=False,
        default=False,
        server_default=false(),
    )

    enable_workflow: Mapped[bool] = mapped_column(
        Boolean,
        nullable=False,
        default=False,
        server_default=false(),
    )

    enable_attachment: Mapped[bool] = mapped_column(
        Boolean,
        nullable=False,
        default=False,
        server_default=false(),
    )

    enable_comments: Mapped[bool] = mapped_column(
        Boolean,
        nullable=False,
        default=False,
        server_default=false(),
    )

    enable_audit: Mapped[bool] = mapped_column(
        Boolean,
        nullable=False,
        default=True,
        server_default=true(),
    )

    enable_versioning: Mapped[bool] = mapped_column(
        Boolean,
        nullable=False,
        default=True,
        server_default=true(),
    )

    enable_soft_delete: Mapped[bool] = mapped_column(
        Boolean,
        nullable=False,
        default=True,
        server_default=true(),
    )

    status: Mapped[RecordStatus] = mapped_column(
        SqlEnum(
            RecordStatus,
            name="record_status_enum",
        ),
        nullable=False,
        default=RecordStatus.ACTIVE,
        server_default=text("'ACTIVE'"),
    )

    created_by: Mapped[int | None] = mapped_column(
        BigInteger,
        nullable=True,
    )

    created_at: Mapped[datetime | None] = mapped_column(
        TIMESTAMP,
        server_default=func.current_timestamp(),
    )

    updated_by: Mapped[int | None] = mapped_column(
        BigInteger,
        nullable=True,
    )

    updated_at: Mapped[datetime | None] = mapped_column(
        TIMESTAMP,
        server_default=func.current_timestamp(),
        server_onupdate=func.current_timestamp(),
    )

    # -------------------------------------------------------
    # Relationships
    # -------------------------------------------------------

    fields: Mapped[list["PlatformModuleField"]] = relationship(
        "PlatformModuleField",
        back_populates="module",
        cascade="all, delete-orphan",
        foreign_keys="PlatformModuleField.module_id",
        lazy="selectin",
    )

    def __repr__(self) -> str:
        return (
            f"<PlatformModule("
            f"id={self.id}, "
            f"code='{self.module_code}', "
            f"type='{self.module_type.value}', "
            f"name='{self.module_name}')>"
        )
