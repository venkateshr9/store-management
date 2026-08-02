from __future__ import annotations

from app.models.permission import Permission
from app.repositories.permission import PermissionRepository

from app.schemas.permission import (
    PermissionCreate,
    PermissionUpdate,
)


class PermissionService:

    def __init__(
        self,
        repository: PermissionRepository,
    ):
        self.repository = repository

    # ---------------------------------------------------------
    # Create
    # ---------------------------------------------------------

    def create_permission(
        self,
        payload: PermissionCreate,
    ) -> Permission:

        existing = self.repository.get_by_module_action(
            payload.module,
            payload.action,
        )

        if existing:
            raise ValueError(
                "Permission already exists."
            )

        return self.repository.create(payload)

    # ---------------------------------------------------------
    # Get
    # ---------------------------------------------------------

    def get_permission(
        self,
        permission_id: int,
    ) -> Permission | None:

        return self.repository.get(permission_id)

    # ---------------------------------------------------------
    # List
    # ---------------------------------------------------------

    def list_permissions(
        self,
    ) -> list[Permission]:

        return self.repository.list()

    # ---------------------------------------------------------
    # Update
    # ---------------------------------------------------------

    def update_permission(
        self,
        permission_id: int,
        payload: PermissionUpdate,
    ) -> Permission:

        permission = self.repository.get(permission_id)

        if permission is None:
            raise ValueError(
                "Permission not found."
            )

        if (
            payload.module is not None
            or payload.action is not None
        ):

            module = (
                payload.module
                if payload.module is not None
                else permission.module
            )

            action = (
                payload.action
                if payload.action is not None
                else permission.action
            )

            existing = self.repository.get_by_module_action(
                module,
                action,
            )

            if (
                existing
                and existing.id != permission.id
            ):
                raise ValueError(
                    "Permission already exists."
                )

        return self.repository.update(
            permission,
            payload,
        )

    # ---------------------------------------------------------
    # Delete
    # ---------------------------------------------------------

    def delete_permission(
        self,
        permission_id: int,
    ) -> None:

        permission = self.repository.get(permission_id)

        if permission is None:
            raise ValueError(
                "Permission not found."
            )

        self.repository.delete(permission)
