from __future__ import annotations

from app.models.product import Product

from app.repositories.product import (
    ProductRepository,
)

from app.schemas.product import (
    ProductCreate,
    ProductUpdate,
)


class ProductService:

    def __init__(
        self,
        repository: ProductRepository,
    ):
        self.repository = repository

    # ---------------------------------------------------------
    # List
    # ---------------------------------------------------------

    def list_products(
        self,
    ) -> list[Product]:

        return self.repository.list()

    # ---------------------------------------------------------
    # Get
    # ---------------------------------------------------------

    def get_product(
        self,
        product_id: int,
    ) -> Product | None:

        return self.repository.get(
            product_id,
        )

    # ---------------------------------------------------------
    # Create
    # ---------------------------------------------------------

    def create_product(
        self,
        payload: ProductCreate,
    ) -> Product:

        if self.repository.get_by_code(
            payload.product_code,
        ):

            raise ValueError(
                "Product code already exists."
            )

        if self.repository.get_by_name(
            payload.product_name,
        ):

            raise ValueError(
                "Product name already exists."
            )

        if (
            payload.sku
            and self.repository.get_by_sku(
                payload.sku,
            )
        ):

            raise ValueError(
                "Product SKU already exists."
            )

        if (
            payload.barcode
            and self.repository.get_by_barcode(
                payload.barcode,
            )
        ):

            raise ValueError(
                "Product barcode already exists."
            )

        return self.repository.create(
            payload,
        )

    # ---------------------------------------------------------
    # Update
    # ---------------------------------------------------------

    def update_product(
        self,
        product_id: int,
        payload: ProductUpdate,
    ) -> Product:

        product = self.repository.get(
            product_id,
        )

        if product is None:

            raise ValueError(
                "Product not found."
            )

        if (
            payload.product_code is not None
            and payload.product_code
            != product.product_code
        ):

            existing = self.repository.get_by_code(
                payload.product_code,
            )

            if existing:

                raise ValueError(
                    "Product code already exists."
                )

        if (
            payload.product_name is not None
            and payload.product_name
            != product.product_name
        ):

            existing = self.repository.get_by_name(
                payload.product_name,
            )

            if existing:

                raise ValueError(
                    "Product name already exists."
                )

        if (
            payload.sku is not None
            and payload.sku != product.sku
        ):

            existing = self.repository.get_by_sku(
                payload.sku,
            )

            if existing:

                raise ValueError(
                    "Product SKU already exists."
                )

        if (
            payload.barcode is not None
            and payload.barcode != product.barcode
        ):

            existing = self.repository.get_by_barcode(
                payload.barcode,
            )

            if existing:

                raise ValueError(
                    "Product barcode already exists."
                )

        return self.repository.update(
            product,
            payload,
        )

    # ---------------------------------------------------------
    # Delete
    # ---------------------------------------------------------

    def delete_product(
        self,
        product_id: int,
    ) -> None:

        product = self.repository.get(
            product_id,
        )

        if product is None:

            raise ValueError(
                "Product not found."
            )

        self.repository.delete(
            product,
        )
