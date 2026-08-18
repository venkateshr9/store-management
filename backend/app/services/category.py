from __future__ import annotations

from app.models.category import Category
from app.repositories.category import CategoryRepository
from app.schemas.category import (
    CategoryCreate,
    CategoryUpdate,
)


class CategoryService:

    def __init__(
        self,
        repository: CategoryRepository,
    ):
        self.repository = repository

    # ---------------------------------------------------------
    # List
    # ---------------------------------------------------------

    def list_categories(self) -> list[Category]:

        return self.repository.list()

    # ---------------------------------------------------------
    # Get
    # ---------------------------------------------------------

    def get_category(
        self,
        category_id: int,
    ) -> Category | None:

        return self.repository.get(category_id)

    # ---------------------------------------------------------
    # Create
    # ---------------------------------------------------------

    def create_category(
        self,
        payload: CategoryCreate,
    ) -> Category:

        existing_code = (
            self.repository.get_by_code(
                payload.category_code
            )
        )

        if existing_code:
            raise ValueError(
                "Category code already exists."
            )

        existing_name = (
            self.repository.get_by_name(
                payload.category_name
            )
        )

        if existing_name:
            raise ValueError(
                "Category name already exists."
            )

        return self.repository.create(payload)

    # ---------------------------------------------------------
    # Update
    # ---------------------------------------------------------

    def update_category(
        self,
        category_id: int,
        payload: CategoryUpdate,
    ) -> Category:

        category = self.repository.get(
            category_id
        )

        if category is None:
            raise ValueError(
                "Category not found."
            )

        if payload.category_code is not None:

            existing_code = (
                self.repository.get_by_code(
                    payload.category_code
                )
            )

            if (
                existing_code
                and existing_code.id != category.id
            ):
                raise ValueError(
                    "Category code already exists."
                )

        if payload.category_name is not None:

            existing_name = (
                self.repository.get_by_name(
                    payload.category_name
                )
            )

            if (
                existing_name
                and existing_name.id != category.id
            ):
                raise ValueError(
                    "Category name already exists."
                )

        return self.repository.update(
            category,
            payload,
        )

    # ---------------------------------------------------------
    # Delete
    # ---------------------------------------------------------

    def delete_category(
        self,
        category_id: int,
    ) -> None:

        category = self.repository.get(
            category_id
        )

        if category is None:
            raise ValueError(
                "Category not found."
            )

        self.repository.delete(category)
