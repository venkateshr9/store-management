from __future__ import annotations

from datetime import datetime

from sqlalchemy import (
    Integer,
    Boolean,
    Enum as SqlEnum,
    Index,
    String,
    Text,
    TIMESTAMP,
    func,
    text,
)

from sqlalchemy.orm import Mapped, mapped_column

from app.db.base import Base
from app.core.enums import RecordStatus


class Role(Base):
    __tablename__ = "roles"

    __table_args__ = (
        Index("idx_role_status", "status"),
    )

    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        autoincrement=True,
    )

    role_code: Mapped[str] = mapped_column(
        String(50),
        unique=True,
        nullable=False,
    )

    role_name: Mapped[str] = mapped_column(
        String(100),
        nullable=False,
    )

    description: Mapped[str | None] = mapped_column(
        Text
    )

    is_system: Mapped[bool] = mapped_column(
        Boolean,
        default=False,
        server_default=text("false"),
        nullable=False,
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
        Integer,
        nullable=True,
    )

    created_at: Mapped[datetime | None] = mapped_column(
        TIMESTAMP,
        server_default=func.current_timestamp(),
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

    def __repr__(self) -> str:
        return (
            f"<Role("
            f"id={self.id}, "
            f"code='{self.role_code}', "
            f"name='{self.role_name}')>"
        )
