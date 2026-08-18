from datetime import datetime

from decimal import Decimal

from pydantic import BaseModel, ConfigDict, Field


class ProductBase(BaseModel):

    product_code: str = Field(
        ...,
        max_length=50,
    )

    product_name: str = Field(
        ...,
        max_length=200,
    )

    sku: str | None = Field(
        default=None,
        max_length=100,
    )

    barcode: str | None = Field(
        default=None,
        max_length=100,
    )

    category_id: int

    department_id: int

    supplier_id: int | None = None

    unit: str = Field(
        ...,
        max_length=50,
    )

    purchase_price: Decimal = Field(
        ...,
        ge=0,
    )

    selling_price: Decimal = Field(
        ...,
        ge=0,
    )

    tax_rate: Decimal = Field(
        default=Decimal("0.00"),
        ge=0,
        le=100,
    )

    reorder_level: Decimal = Field(
        default=Decimal("0.00"),
        ge=0,
    )

    description: str | None = Field(
        default=None,
        max_length=500,
    )

    is_active: bool = True

    remarks: str | None = Field(
        default=None,
        max_length=500,
    )


class ProductCreate(ProductBase):
    pass


class ProductUpdate(BaseModel):

    product_code: str | None = Field(
        default=None,
        max_length=50,
    )

    product_name: str | None = Field(
        default=None,
        max_length=200,
    )

    sku: str | None = Field(
        default=None,
        max_length=100,
    )

    barcode: str | None = Field(
        default=None,
        max_length=100,
    )

    category_id: int | None = None

    department_id: int | None = None

    supplier_id: int | None = None

    unit: str | None = Field(
        default=None,
        max_length=50,
    )

    purchase_price: Decimal | None = Field(
        default=None,
        ge=0,
    )

    selling_price: Decimal | None = Field(
        default=None,
        ge=0,
    )

    tax_rate: Decimal | None = Field(
        default=None,
        ge=0,
        le=100,
    )

    reorder_level: Decimal | None = Field(
        default=None,
        ge=0,
    )

    description: str | None = Field(
        default=None,
        max_length=500,
    )

    is_active: bool | None = None

    remarks: str | None = Field(
        default=None,
        max_length=500,
    )


class ProductResponse(ProductBase):

    model_config = ConfigDict(
        from_attributes=True,
    )

    id: int

    created_by: int | None = None

    created_at: datetime

    updated_by: int | None = None

    updated_at: datetime
