from __future__ import annotations

from datetime import datetime
from decimal import Decimal

from sqlalchemy import (
    Boolean,
    DateTime,
    ForeignKey,
    Integer,
    Numeric,
    String,
    func,
)

from sqlalchemy.orm import (
    Mapped,
    mapped_column,
)

from app.db.base import Base


class Product(Base):
    __tablename__ = "products"

    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        autoincrement=True,
    )

    product_code: Mapped[str] = mapped_column(
        String(50),
        unique=True,
        index=True,
        nullable=False,
    )

    product_name: Mapped[str] = mapped_column(
        String(200),
        unique=True,
        nullable=False,
    )

    sku: Mapped[str | None] = mapped_column(
        String(100),
        unique=True,
        nullable=True,
    )

    barcode: Mapped[str | None] = mapped_column(
        String(100),
        unique=True,
        nullable=True,
    )

    category_id: Mapped[int] = mapped_column(
        Integer,
        ForeignKey("categories.id"),
        nullable=False,
    )

    department_id: Mapped[int] = mapped_column(
        Integer,
        ForeignKey("departments.id"),
        nullable=False,
    )

    supplier_id: Mapped[int | None] = mapped_column(
        Integer,
        ForeignKey("suppliers.id"),
        nullable=True,
    )

    unit: Mapped[str] = mapped_column(
        String(50),
        nullable=False,
    )

    purchase_price: Mapped[Decimal] = mapped_column(
        Numeric(12, 2),
        nullable=False,
    )

    selling_price: Mapped[Decimal] = mapped_column(
        Numeric(12, 2),
        nullable=False,
    )

    tax_rate: Mapped[Decimal] = mapped_column(
        Numeric(5, 2),
        nullable=False,
        default=Decimal("0.00"),
    )

    reorder_level: Mapped[Decimal] = mapped_column(
        Numeric(12, 2),
        nullable=False,
        default=Decimal("0.00"),
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
            f"<Product("
            f"id={self.id}, "
            f"code='{self.product_code}', "
            f"name='{self.product_name}')>"
        )
