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


class Category(Base):
    __tablename__ = "categories"

    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        autoincrement=True,
    )

    category_code: Mapped[str] = mapped_column(
        String(50),
        unique=True,
        index=True,
        nullable=False,
    )

    category_name: Mapped[str] = mapped_column(
        String(200),
        unique=True,
        nullable=False,
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
            f"<Category("
            f"id={self.id}, "
            f"code='{self.category_code}', "
            f"name='{self.category_name}')>"
        )
