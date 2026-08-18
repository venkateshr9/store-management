from __future__ import annotations

from sqlalchemy.orm import Session

from app.models.supplier import Supplier

from app.schemas.supplier import (
    SupplierCreate,
    SupplierUpdate,
)


class SupplierRepository:

    def __init__(
        self,
        db: Session,
    ):
        self.db = db

    # ---------------------------------------------------------
    # List
    # ---------------------------------------------------------

    def list(self) -> list[Supplier]:

        return (
            self.db.query(Supplier)
            .order_by(
                Supplier.supplier_name
            )
            .all()
        )

    # ---------------------------------------------------------
    # Get
    # ---------------------------------------------------------

    def get(
        self,
        supplier_id: int,
    ) -> Supplier | None:

        return (
            self.db.query(Supplier)
            .filter(
                Supplier.id == supplier_id
            )
            .first()
        )

    # ---------------------------------------------------------
    # Get By Code
    # ---------------------------------------------------------

    def get_by_code(
        self,
        supplier_code: str,
    ) -> Supplier | None:

        return (
            self.db.query(Supplier)
            .filter(
                Supplier.supplier_code == supplier_code
            )
            .first()
        )

    # ---------------------------------------------------------
    # Get By Name
    # ---------------------------------------------------------

    def get_by_name(
        self,
        supplier_name: str,
    ) -> Supplier | None:

        return (
            self.db.query(Supplier)
            .filter(
                Supplier.supplier_name == supplier_name
            )
            .first()
        )

    # ---------------------------------------------------------
    # Create
    # ---------------------------------------------------------

    def create(
        self,
        payload: SupplierCreate,
    ) -> Supplier:

        supplier = Supplier(
            **payload.model_dump()
        )

        self.db.add(supplier)

        self.db.commit()

        self.db.refresh(supplier)

        return supplier

    # ---------------------------------------------------------
    # Update
    # ---------------------------------------------------------

    def update(
        self,
        supplier: Supplier,
        payload: SupplierUpdate,
    ) -> Supplier:

        for key, value in (
            payload.model_dump(
                exclude_unset=True
            ).items()
        ):

            setattr(
                supplier,
                key,
                value,
            )

        self.db.commit()

        self.db.refresh(supplier)

        return supplier

    # ---------------------------------------------------------
    # Delete
    # ---------------------------------------------------------

    def delete(
        self,
        supplier: Supplier,
    ) -> None:

        self.db.delete(supplier)

        self.db.commit()
