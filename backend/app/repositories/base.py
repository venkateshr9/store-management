from __future__ import annotations

from typing import Any, Generic, TypeVar

from sqlalchemy import func, select
from sqlalchemy.orm import Session

from app.db.base import Base

from app.core.enums import RecordStatus

ModelType = TypeVar("ModelType", bound=Base)


class BaseRepository(Generic[ModelType]):
    """
    Generic repository providing common CRUD operations.
    """

    def __init__(
        self,
        session: Session,
        model: type[ModelType],
    ) -> None:
        self.session = session
        self.model = model

    # ---------------------------------------------------------
    # Create
    # ---------------------------------------------------------

    def create(self, obj: ModelType) -> ModelType:
        self.session.add(obj)
        self.session.flush()
        self.session.refresh(obj)
        return obj

    # ---------------------------------------------------------
    # Read
    # ---------------------------------------------------------

    def get_by_id(self, record_id: int) -> ModelType | None:
        return self.session.get(self.model, record_id)

    def get_all(self) -> list[ModelType]:
        stmt = select(self.model).order_by(self.model.id)
        return list(self.session.scalars(stmt).all())

    def exists(self, record_id: int) -> bool:
        stmt = (
            select(func.count())
            .select_from(self.model)
            .where(self.model.id == record_id)
        )

        result = self.session.scalar(stmt)
        return (result or 0) > 0

    def count(self) -> int:
        stmt = select(func.count()).select_from(self.model)

        result = self.session.scalar(stmt)
        return int(result or 0)

    # ---------------------------------------------------------
    # Update
    # ---------------------------------------------------------

    def update(
        self,
        db_obj: ModelType,
        values: dict[str, Any],
    ) -> ModelType:

        for key, value in values.items():
            setattr(db_obj, key, value)

        self.session.flush()
        self.session.refresh(db_obj)

        return db_obj

    # ---------------------------------------------------------
    # Delete
    # ---------------------------------------------------------

    def delete(self, db_obj: ModelType) -> None:
        self.session.delete(db_obj)
        self.session.flush()

    # ---------------------------------------------------------
    # Soft Delete
    # ---------------------------------------------------------

    def soft_delete(self, db_obj: ModelType) -> ModelType:
        """
        Generic soft delete.

        Works only for models having a 'status' field.
        """

        if hasattr(db_obj, "status"):
            db_obj.status = RecordStatus.INACTIVE

        self.session.flush()
        self.session.refresh(db_obj)

        return db_obj

    # ---------------------------------------------------------
    # Restore
    # ---------------------------------------------------------

    def restore(self, db_obj: ModelType) -> ModelType:

        if hasattr(db_obj, "status"):
            db_obj.status = RecordStatus.ACTIVE

        self.session.flush()
        self.session.refresh(db_obj)

        return db_obj

    # ---------------------------------------------------------
    # Pagination
    # ---------------------------------------------------------

    def paginate(
        self,
        page: int = 1,
        page_size: int = 20,
    ) -> tuple[list[ModelType], int]:

        stmt = (
            select(self.model)
            .order_by(self.model.id)
            .offset((page - 1) * page_size)
            .limit(page_size)
        )

        items = list(self.session.scalars(stmt).all())

        total = self.count()

        return items, total

    # -----------------------------------------------------
    # REUSABLE LOOKUP METHODS
    # ---------------------------------------------------

    def get_by_field(
        self,
        field_name: str,
        value: Any,
    ) -> ModelType | None:
        try:
            column = getattr(self.model, field_name)
        except AttributeError as exc:
            raise ValueError(
                f"'{field_name}' is not a valid field of {self.model.__name__}"
            ) from exc

        stmt = select(self.model).where(column == value)

        return self.session.scalar(stmt)


    def get_many_by_field(
        self,
        field_name: str,
        value: Any,
    ) -> list[ModelType]:
        try:
            column = getattr(self.model, field_name)
        except AttributeError as exc:
            raise ValueError(
                f"'{field_name}' is not a valid field of {self.model.__name__}"
            ) from exc

        stmt = select(self.model).where(column == value)

        return list(self.session.scalars(stmt).all())
