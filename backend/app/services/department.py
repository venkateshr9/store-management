from __future__ import annotations

from app.models.department import Department

from app.repositories.department import (
    DepartmentRepository,
)

from app.schemas.department import (
    DepartmentCreate,
    DepartmentUpdate,
)


class DepartmentService:

    def __init__(
        self,
        repository: DepartmentRepository,
    ):
        self.repository = repository

    # ---------------------------------------------------------
    # List
    # ---------------------------------------------------------

    def list_departments(
        self,
    ) -> list[Department]:

        return self.repository.list()

    # ---------------------------------------------------------
    # Get
    # ---------------------------------------------------------

    def get_department(
        self,
        department_id: int,
    ) -> Department | None:

        return self.repository.get(
            department_id,
        )

    # ---------------------------------------------------------
    # Create
    # ---------------------------------------------------------

    def create_department(
        self,
        payload: DepartmentCreate,
    ) -> Department:

        if self.repository.get_by_code(
            payload.department_code,
        ):

            raise ValueError(
                "Department code already exists."
            )

        if self.repository.get_by_name(
            payload.department_name,
        ):

            raise ValueError(
                "Department name already exists."
            )

        return self.repository.create(
            payload,
        )

    # ---------------------------------------------------------
    # Update
    # ---------------------------------------------------------

    def update_department(
        self,
        department_id: int,
        payload: DepartmentUpdate,
    ) -> Department:

        department = self.repository.get(
            department_id,
        )

        if department is None:

            raise ValueError(
                "Department not found."
            )

        if (
            payload.department_code
            and payload.department_code
            != department.department_code
        ):

            existing = self.repository.get_by_code(
                payload.department_code,
            )

            if existing:

                raise ValueError(
                    "Department code already exists."
                )

        if (
            payload.department_name
            and payload.department_name
            != department.department_name
        ):

            existing = self.repository.get_by_name(
                payload.department_name,
            )

            if existing:

                raise ValueError(
                    "Department name already exists."
                )

        return self.repository.update(
            department,
            payload,
        )

    # ---------------------------------------------------------
    # Delete
    # ---------------------------------------------------------

    def delete_department(
        self,
        department_id: int,
    ) -> None:

        department = self.repository.get(
            department_id,
        )

        if department is None:

            raise ValueError(
                "Department not found."
            )

        self.repository.delete(
            department,
        )
