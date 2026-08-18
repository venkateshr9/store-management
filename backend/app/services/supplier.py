from __future__ import annotations

from app.models.supplier import Supplier

from app.repositories.supplier import (
    SupplierRepository,
)

from app.schemas.supplier import (
    SupplierCreate,
    SupplierUpdate,
)


class SupplierService:

    def __init__(
        self,
        repository: SupplierRepository,
    ):
        self.repository = repository

    # ---------------------------------------------------------
    # List
    # ---------------------------------------------------------

    def list_suppliers(
        self,
    ) -> list[Supplier]:

        return self.repository.list()

    # ---------------------------------------------------------
    # Get
    # ---------------------------------------------------------

    def get_supplier(
        self,
        supplier_id: int,
    ) -> Supplier | None:

        return self.repository.get(
            supplier_id,
        )

    # ---------------------------------------------------------
    # Create
    # ---------------------------------------------------------

    def create_supplier(
        self,
        payload: SupplierCreate,
    ) -> Supplier:

        if self.repository.get_by_code(
            payload.supplier_code,
        ):

            raise ValueError(
                "Supplier code already exists."
            )

        if self.repository.get_by_name(
            payload.supplier_name,
        ):

            raise ValueError(
                "Supplier name already exists."
            )

        return self.repository.create(
            payload,
        )

    # ---------------------------------------------------------
    # Update
    # ---------------------------------------------------------

    def update_supplier(
        self,
        supplier_id: int,
        payload: SupplierUpdate,
    ) -> Supplier:

        supplier = self.repository.get(
            supplier_id,
        )

        if supplier is None:

            raise ValueError(
                "Supplier not found."
            )

        if (
            payload.supplier_code
            and payload.supplier_code
            != supplier.supplier_code
        ):

            existing = self.repository.get_by_code(
                payload.supplier_code,
            )

            if existing:

                raise ValueError(
                    "Supplier code already exists."
                )

        if (
            payload.supplier_name
            and payload.supplier_name
            != supplier.supplier_name
        ):

            existing = self.repository.get_by_name(
                payload.supplier_name,
            )

            if existing:

                raise ValueError(
                    "Supplier name already exists."
                )

        return self.repository.update(
            supplier,
            payload,
        )

    # ---------------------------------------------------------
    # Delete
    # ---------------------------------------------------------

    def delete_supplier(
        self,
        supplier_id: int,
    ) -> None:

        supplier = self.repository.get(
            supplier_id,
        )

        if supplier is None:

            raise ValueError(
                "Supplier not found."
            )

        self.repository.delete(
            supplier,
        )
