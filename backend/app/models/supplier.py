from __future__ import annotations

from datetime import datetime

from sqlalchemy import (
    Boolean,
    DateTime,
    Integer,
    String,
    func,
)

from sqlalchemy.orm import (
    Mapped,
    mapped_column,
)

from app.db.base import Base


class Supplier(Base):
    __tablename__ = "suppliers"

    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        autoincrement=True,
    )

    supplier_code: Mapped[str] = mapped_column(
        String(50),
        unique=True,
        index=True,
        nullable=False,
    )

    supplier_name: Mapped[str] = mapped_column(
        String(200),
        unique=True,
        nullable=False,
    )

    contact_person: Mapped[str | None] = mapped_column(
        String(200),
        nullable=True,
    )

    phone: Mapped[str | None] = mapped_column(
        String(50),
        nullable=True,
    )

    email: Mapped[str | None] = mapped_column(
        String(200),
        nullable=True,
    )

    address: Mapped[str | None] = mapped_column(
        String(500),
        nullable=True,
    )

    description: Mapped[str | None] = mapped_column(
        String(500),
        nullable=True,
    )

    is_active: Mapped[bool] = mapped_column(
        Boolean,
        default=True,
        nullable=False,
    )

    remarks: Mapped[str | None] = mapped_column(
        String(500),
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

    updated_at: Mapped[datetime] = mapped_column(
        DateTime,
        server_default=func.now(),
        server_onupdate=func.now(),
    )

    def __repr__(self) -> str:
        return (
            f"<Supplier("
            f"id={self.id}, "
            f"code='{self.supplier_code}', "
            f"name='{self.supplier_name}')>"
        )
