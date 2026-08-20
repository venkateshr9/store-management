from __future__ import annotations

from app.models.role import Role
from app.models.role_permission import RolePermission
from app.repositories.role import RoleRepository
from app.schemas.role import (
    RoleCreate,
    RoleUpdate,
)


class RoleService:
    def __init__(
        self,
        repository: RoleRepository,
    ):
        self.repository = repository

    # ---------------------------------------------------------
    # Create
    # ---------------------------------------------------------

    def create_role(
        self,
        payload: RoleCreate,
    ) -> Role:

        existing = self.repository.get_by_code(
            payload.role_code
        )

        if existing:
            raise ValueError(
                "Role code already exists."
            )

        return self.repository.create(payload)

    # ---------------------------------------------------------
    # Get
    # ---------------------------------------------------------

    def get_role(
        self,
        role_id: int,
    ) -> Role | None:

        return self.repository.get(role_id)

    # ---------------------------------------------------------
    # List
    # ---------------------------------------------------------

    def list_roles(self) -> list[Role]:

        return self.repository.list()

    # ---------------------------------------------------------
    # List Active
    # ---------------------------------------------------------

    def list_active_roles(self) -> list[Role]:

        return self.repository.list_active()

    # ---------------------------------------------------------
    # Update
    # ---------------------------------------------------------

    def update_role(
        self,
        role_id: int,
        payload: RoleUpdate,
    ) -> Role:

        role = self.repository.get(role_id)

        if role is None:
            raise ValueError(
                "Role not found."
            )

        if (
            payload.role_code is not None
            and payload.role_code != role.role_code
        ):
            existing = self.repository.get_by_code(
                payload.role_code
            )

            if existing:
                raise ValueError(
                    "Role code already exists."
                )

        return self.repository.update(
            role,
            payload,
        )

    # ---------------------------------------------------------
    # Permissions
    # ---------------------------------------------------------

    def get_permission_ids(
        self,
        role_id: int,
    ) -> list[int]:

        role = self.repository.get(role_id)

        if role is None:
            raise ValueError("Role not found.")

        db = self.repository.db

        rows = (
            db.query(RolePermission.permission_id)
            .filter(RolePermission.role_id == role_id)
            .all()
        )

        return [row[0] for row in rows]

    def update_permission_ids(
        self,
        role_id: int,
        permission_ids: list[int],
    ) -> list[int]:

        role = self.repository.get(role_id)

        if role is None:
            raise ValueError("Role not found.")

        db = self.repository.db

        permission_ids = list(dict.fromkeys(permission_ids))

        existing = (
            db.query(RolePermission)
            .filter(RolePermission.role_id == role_id)
            .all()
        )

        for row in existing:
            db.delete(row)

        for permission_id in permission_ids:
            db.add(
                RolePermission(
                    role_id=role_id,
                    permission_id=permission_id,
                )
            )

        db.commit()

        return permission_ids

    # ---------------------------------------------------------
    # Delete
    # ---------------------------------------------------------

    def delete_role(
        self,
        role_id: int,
    ) -> None:

        role = self.repository.get(role_id)

        if role is None:
            raise ValueError(
                "Role not found."
            )

        if role.is_system:
            raise ValueError(
                "System roles cannot be deleted."
            )

        self.repository.delete(role)
