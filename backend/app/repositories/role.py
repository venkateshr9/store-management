from __future__ import annotations

from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.role import Role
from app.schemas.role import RoleCreate, RoleUpdate


class RoleRepository:
    def __init__(self, db: Session):
        self.db = db

    # ---------------------------------------------------------
    # Create
    # ---------------------------------------------------------

    def create(self, payload: RoleCreate) -> Role:
        role = Role(**payload.model_dump())

        self.db.add(role)
        self.db.commit()
        self.db.refresh(role)

        return role

    # ---------------------------------------------------------
    # Get by ID
    # ---------------------------------------------------------

    def get(self, role_id: int) -> Role | None:
        return self.db.get(Role, role_id)

    # ---------------------------------------------------------
    # Get by Role Code
    # ---------------------------------------------------------

    def get_by_code(self, role_code: str) -> Role | None:
        stmt = (
            select(Role)
            .where(Role.role_code == role_code)
        )

        return self.db.scalar(stmt)

    # ---------------------------------------------------------
    # List
    # ---------------------------------------------------------

    def list(self) -> list[Role]:
        stmt = (
            select(Role)
            .order_by(Role.role_name)
        )

        return list(self.db.scalars(stmt).all())

    # ---------------------------------------------------------
    # List Active
    # ---------------------------------------------------------

    def list_active(self) -> list[Role]:
        stmt = (
            select(Role)
            .where(Role.status == "ACTIVE")
            .order_by(Role.role_name)
        )

        return list(self.db.scalars(stmt).all())

    # ---------------------------------------------------------
    # Update
    # ---------------------------------------------------------

    def update(
        self,
        role: Role,
        payload: RoleUpdate,
    ) -> Role:

        for key, value in payload.model_dump(
            exclude_unset=True
        ).items():
            setattr(role, key, value)

        self.db.commit()
        self.db.refresh(role)

        return role

    # ---------------------------------------------------------
    # Delete
    # ---------------------------------------------------------

    def delete(self, role: Role) -> None:
        self.db.delete(role)
        self.db.commit()
