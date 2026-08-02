from __future__ import annotations

from datetime import datetime

from sqlalchemy import (
    Integer,
    String,
    DateTime,
    TIMESTAMP,
    UniqueConstraint,
    func,
)

from sqlalchemy.orm import (
    Mapped,
    mapped_column,
)

from app.db.base import Base


class Permission(Base):
    __tablename__ = "permissions"

    __table_args__ = (
        UniqueConstraint(
            "module",
            "action",
            name="uq_permission_module_action",
        ),
    )

    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        autoincrement=True,
    )

    module: Mapped[str] = mapped_column(
        String(100),
        nullable=False,
        index=True,
    )

    action: Mapped[str] = mapped_column(
        String(100),
        nullable=False,
    )

    description: Mapped[str | None] = mapped_column(
        String(255),
        nullable=True,
    )

    created_by: Mapped[int | None] = mapped_column(
        Integer,
        nullable=True,
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime,
        server_default=func.now(),
    )

    updated_by: Mapped[int | None] = mapped_column(
        Integer,
        nullable=True,
    )

    updated_at: Mapped[datetime | None] = mapped_column(
        TIMESTAMP,
        server_default=func.current_timestamp(),
        server_onupdate=func.current_timestamp(),
    )

    @property
    def code(self) -> str:
        return f"{self.module}:{self.action}"

    def __repr__(self) -> str:
        return (
            f"<Permission("
            f"id={self.id}, "
            f"module='{self.module}', "
            f"action='{self.action}')>"
        )
