from __future__ import annotations

from sqlalchemy.orm import Session

from app.models.category import Category

from app.schemas.category import (
    CategoryCreate,
    CategoryUpdate,
)


class CategoryRepository:

    def __init__(
        self,
        db: Session,
    ):
        self.db = db

    # ---------------------------------------------------------
    # List
    # ---------------------------------------------------------

    def list(self) -> list[Category]:

        return (
            self.db.query(Category)
            .order_by(
                Category.category_name
            )
            .all()
        )

    # ---------------------------------------------------------
    # Get
    # ---------------------------------------------------------

    def get(
        self,
        category_id: int,
    ) -> Category | None:

        return (
            self.db.query(Category)
            .filter(
                Category.id == category_id
            )
            .first()
        )

    # ---------------------------------------------------------
    # Get By Code
    # ---------------------------------------------------------

    def get_by_code(
        self,
        category_code: str,
    ) -> Category | None:

        return (
            self.db.query(Category)
            .filter(
                Category.category_code == category_code
            )
            .first()
        )

    # ---------------------------------------------------------
    # Get By Name
    # ---------------------------------------------------------

    def get_by_name(
        self,
        category_name: str,
    ) -> Category | None:

        return (
            self.db.query(Category)
            .filter(
                Category.category_name == category_name
            )
            .first()
        )

    # ---------------------------------------------------------
    # Create
    # ---------------------------------------------------------

    def create(
        self,
        payload: CategoryCreate,
    ) -> Category:

        category = Category(
            **payload.model_dump()
        )

        self.db.add(category)

        self.db.commit()

        self.db.refresh(category)

        return category

    # ---------------------------------------------------------
    # Update
    # ---------------------------------------------------------

    def update(
        self,
        category: Category,
        payload: CategoryUpdate,
    ) -> Category:

        for key, value in (
            payload.model_dump(
                exclude_unset=True
            ).items()
        ):

            setattr(
                category,
                key,
                value,
            )

        self.db.commit()

        self.db.refresh(category)

        return category

    # ---------------------------------------------------------
    # Delete
    # ---------------------------------------------------------

    def delete(
        self,
        category: Category,
    ) -> None:

        self.db.delete(category)

        self.db.commit()
