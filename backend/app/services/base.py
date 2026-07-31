from __future__ import annotations

from typing import Any, Generic, TypeVar

from app.repositories.base import BaseRepository

ModelType = TypeVar("ModelType")


class BaseService(Generic[ModelType]):
    """
    Generic service providing common business operations.

    Services contain business logic and coordinate repositories.
    Database transaction boundaries should be managed here.
    """

    def __init__(
        self,
        repository: BaseRepository[ModelType],
    ) -> None:
        self.repository = repository

    # ---------------------------------------------------------
    # Create
    # ---------------------------------------------------------

    def create(self, obj: ModelType) -> ModelType:
        return self.repository.create(obj)

    # ---------------------------------------------------------
    # Read
    # ---------------------------------------------------------

    def get_by_id(self, record_id: int) -> ModelType | None:
        return self.repository.get_by_id(record_id)

    def get_all(self) -> list[ModelType]:
        return self.repository.get_all()

    def exists(self, record_id: int) -> bool:
        return self.repository.exists(record_id)

    def count(self) -> int:
        return self.repository.count()

    # ---------------------------------------------------------
    # Update
    # ---------------------------------------------------------

    def update(
        self,
        db_obj: ModelType,
        values: dict[str, Any],
    ) -> ModelType:
        return self.repository.update(db_obj, values)

    # ---------------------------------------------------------
    # Delete
    # ---------------------------------------------------------

    def delete(self, db_obj: ModelType) -> None:
        self.repository.delete(db_obj)

    def soft_delete(self, db_obj: ModelType) -> ModelType:
        return self.repository.soft_delete(db_obj)

    def restore(self, db_obj: ModelType) -> ModelType:
        return self.repository.restore(db_obj)

    # ---------------------------------------------------------
    # Pagination
    # ---------------------------------------------------------

    def paginate(
        self,
        page: int = 1,
        page_size: int = 20,
    ) -> tuple[list[ModelType], int]:
        return self.repository.paginate(page, page_size)
