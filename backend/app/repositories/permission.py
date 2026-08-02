from __future__ import annotations

from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.permission import Permission
from app.schemas.permission import (
    PermissionCreate,
    PermissionUpdate,
)


class PermissionRepository:

    def __init__(self, db: Session):
        self.db = db

    # ---------------------------------------------------------
    # Create
    # ---------------------------------------------------------

    def create(
        self,
        payload: PermissionCreate,
    ) -> Permission:

        permission = Permission(
            **payload.model_dump()
        )

        self.db.add(permission)
        self.db.commit()
        self.db.refresh(permission)

        return permission

    # ---------------------------------------------------------
    # Get
    # ---------------------------------------------------------

    def get(
        self,
        permission_id: int,
    ) -> Permission | None:

        return self.db.get(
            Permission,
            permission_id,
        )

    # ---------------------------------------------------------
    # Get by Module + Action
    # ---------------------------------------------------------

    def get_by_module_action(
        self,
        module: str,
        action: str,
    ) -> Permission | None:

        stmt = (
            select(Permission)
            .where(
                Permission.module == module,
                Permission.action == action,
            )
        )

        return self.db.scalar(stmt)

    # ---------------------------------------------------------
    # List
    # ---------------------------------------------------------

    def list(self) -> list[Permission]:

        stmt = (
            select(Permission)
            .order_by(
                Permission.module,
                Permission.action,
            )
        )

        return list(
            self.db.scalars(stmt).all()
        )

    # ---------------------------------------------------------
    # List by Module
    # ---------------------------------------------------------

    def list_by_module(
        self,
        module: str,
    ) -> list[Permission]:

        stmt = (
            select(Permission)
            .where(
                Permission.module == module
            )
            .order_by(
                Permission.action
            )
        )

        return list(
            self.db.scalars(stmt).all()
        )

    # ---------------------------------------------------------
    # Update
    # ---------------------------------------------------------

    def update(
        self,
        permission: Permission,
        payload: PermissionUpdate,
    ) -> Permission:

        for key, value in payload.model_dump(
            exclude_unset=True
        ).items():
            setattr(
                permission,
                key,
                value,
            )

        self.db.commit()
        self.db.refresh(permission)

        return permission

    # ---------------------------------------------------------
    # Delete
    # ---------------------------------------------------------

    def delete(
        self,
        permission: Permission,
    ) -> None:

        self.db.delete(permission)
        self.db.commit()
