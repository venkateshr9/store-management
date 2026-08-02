from __future__ import annotations

from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.user import User
from app.schemas.user import (
    UserCreate,
    UserUpdate,
)


class UserRepository:

    def __init__(self, db: Session):
        self.db = db

    # ---------------------------------------------------------
    # Create
    # ---------------------------------------------------------

    def create(
        self,
        user: User,
        ) -> User:

        self.db.add(user)
        self.db.commit()
        self.db.refresh(user)

        return user
    # ---------------------------------------------------------
    # Get
    # ---------------------------------------------------------

    def get(
        self,
        user_id: int,
    ) -> User | None:

        return self.db.get(
            User,
            user_id,
        )

    # ---------------------------------------------------------
    # Get by Username
    # ---------------------------------------------------------

    def get_by_username(
        self,
        username: str,
    ) -> User | None:

        stmt = (
            select(User)
            .where(
                User.username == username
            )
        )

        return self.db.scalar(stmt)

    # ---------------------------------------------------------
    # Get by Employee Number
    # ---------------------------------------------------------

    def get_by_employee_no(
        self,
        employee_no: str,
    ) -> User | None:

        stmt = (
            select(User)
            .where(
                User.employee_no == employee_no
            )
        )

        return self.db.scalar(stmt)

    # ---------------------------------------------------------
    # Get by Email
    # ---------------------------------------------------------

    def get_by_email(
        self,
        email: str,
    ) -> User | None:

        stmt = (
            select(User)
            .where(
                User.email == email
            )
        )

        return self.db.scalar(stmt)

    # ---------------------------------------------------------
    # List
    # ---------------------------------------------------------

    def list(self) -> list[User]:

        stmt = (
            select(User)
            .order_by(
                User.full_name,
            )
        )

        return list(
            self.db.scalars(stmt).all()
        )

    # ---------------------------------------------------------
    # List Active
    # ---------------------------------------------------------

    def list_active(self) -> list[User]:

        stmt = (
            select(User)
            .where(
                User.is_active.is_(True)
            )
            .order_by(
                User.full_name,
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
        user: User,
        payload: UserUpdate,
    ) -> User:

        for key, value in payload.model_dump(
            exclude_unset=True,
        ).items():

            setattr(
                user,
                key,
                value,
            )

        self.db.commit()
        self.db.refresh(user)

        return user

    # ---------------------------------------------------------
    # Delete
    # ---------------------------------------------------------

    def delete(
        self,
        user: User,
    ) -> None:

        self.db.delete(user)
        self.db.commit()
