from __future__ import annotations

from sqlalchemy.orm import Session

from app.models.department import Department

from app.schemas.department import (
    DepartmentCreate,
    DepartmentUpdate,
)


class DepartmentRepository:

    def __init__(
        self,
        db: Session,
    ):
        self.db = db

    # ---------------------------------------------------------
    # List
    # ---------------------------------------------------------

    def list(self) -> list[Department]:

        return (
            self.db.query(Department)
            .order_by(
                Department.department_name
            )
            .all()
        )

    # ---------------------------------------------------------
    # Get
    # ---------------------------------------------------------

    def get(
        self,
        department_id: int,
    ) -> Department | None:

        return (
            self.db.query(Department)
            .filter(
                Department.id == department_id
            )
            .first()
        )

    # ---------------------------------------------------------
    # Get By Code
    # ---------------------------------------------------------

    def get_by_code(
        self,
        department_code: str,
    ) -> Department | None:

        return (
            self.db.query(Department)
            .filter(
                Department.department_code == department_code
            )
            .first()
        )

    # ---------------------------------------------------------
    # Get By Name
    # ---------------------------------------------------------

    def get_by_name(
        self,
        department_name: str,
    ) -> Department | None:

        return (
            self.db.query(Department)
            .filter(
                Department.department_name == department_name
            )
            .first()
        )

    # ---------------------------------------------------------
    # Create
    # ---------------------------------------------------------

    def create(
        self,
        payload: DepartmentCreate,
    ) -> Department:

        department = Department(
            **payload.model_dump()
        )

        self.db.add(department)

        self.db.commit()

        self.db.refresh(department)

        return department

    # ---------------------------------------------------------
    # Update
    # ---------------------------------------------------------

    def update(
        self,
        department: Department,
        payload: DepartmentUpdate,
    ) -> Department:

        for key, value in (
            payload.model_dump(
                exclude_unset=True
            ).items()
        ):

            setattr(
                department,
                key,
                value,
            )

        self.db.commit()

        self.db.refresh(department)

        return department

    # ---------------------------------------------------------
    # Delete
    # ---------------------------------------------------------

    def delete(
        self,
        department: Department,
    ) -> None:

        self.db.delete(department)

        self.db.commit()
