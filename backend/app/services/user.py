from __future__ import annotations

from sqlalchemy import select, delete

from app.models.role import Role
from app.models.user_role import UserRole

from app.models.user import User
from app.repositories.user import UserRepository
from app.schemas.user import (
    UserCreate,
    UserUpdate,
    UserChangePassword,
)

from app.core.security import hash_password

class UserService:

    def __init__(
        self,
        repository: UserRepository,
    ):
        self.repository = repository

    # ---------------------------------------------------------
    # Create
    # ---------------------------------------------------------

    def create_user(
        self,
        payload: UserCreate,
    ) -> User:

        if self.repository.get_by_employee_no(
            payload.employee_no,
        ):
            raise ValueError(
                "Employee number already exists."
            )

        if self.repository.get_by_username(
            payload.username,
        ):
            raise ValueError(
                "Username already exists."
            )

        if (
            payload.email
            and self.repository.get_by_email(
                payload.email,
            )
        ):
            raise ValueError(
                "Email already exists."
            )

        password_hash = hash_password(
            payload.password
        )

        user = User(
            employee_no=payload.employee_no,
            username=payload.username,
            full_name=payload.full_name,
            email=payload.email,
            mobile=payload.mobile,
            department_id=payload.department_id,
            is_active=payload.is_active,
            remarks=payload.remarks,
            password_hash=password_hash,
        )

        return self.repository.create(user)
    # ---------------------------------------------------------
    # Get
    # ---------------------------------------------------------

    def get_user(
        self,
        user_id: int,
    ) -> User | None:

        return self.repository.get(
            user_id,
        )

    # ---------------------------------------------------------
    # List
    # ---------------------------------------------------------

    def list_users(self) -> list[User]:

        return self.repository.list()

    # ---------------------------------------------------------
    # List Active
    # ---------------------------------------------------------

    def list_active_users(self) -> list[User]:

        return self.repository.list_active()

    # ---------------------------------------------------------
    # Update
    # ---------------------------------------------------------

    def update_user(
        self,
        user_id: int,
        payload: UserUpdate,
    ) -> User:

        user = self.repository.get(
            user_id,
        )

        if user is None:
            raise ValueError(
                "User not found."
            )

        if (
            payload.employee_no is not None
            and payload.employee_no != user.employee_no
        ):

            existing = (
                self.repository.get_by_employee_no(
                    payload.employee_no,
                )
            )

            if existing:
                raise ValueError(
                    "Employee number already exists."
                )

        if (
            payload.username is not None
            and payload.username != user.username
        ):

            existing = (
                self.repository.get_by_username(
                    payload.username,
                )
            )

            if existing:
                raise ValueError(
                    "Username already exists."
                )

        if (
            payload.email
            and payload.email != user.email
        ):

            existing = (
                self.repository.get_by_email(
                    payload.email,
                )
            )

            if (
                existing
                and existing.id != user.id
            ):
                raise ValueError(
                    "Email already exists."
                )

        return self.repository.update(
            user,
            payload,
        )

    # ---------------------------------------------------------
    # Change Password
    # ---------------------------------------------------------

    def change_password(
        self,
        user_id: int,
        payload: UserChangePassword,
    ) -> User:

        user = self.repository.get(
            user_id,
        )

        if user is None:

            raise ValueError(
                "User not found."
            )

        user.password_hash = hash_password(
            payload.password,
        )

        return self.repository.update_password(
            user,
        )

    # ---------------------------------------------------------
    # User Roles
    # ---------------------------------------------------------

    def get_user_roles(
        self,
        user_id: int,
    ) -> list[Role]:

        user = self.repository.get(user_id)

        if user is None:
            raise ValueError("User not found.")

        db = self.repository.db

        stmt = (
            select(Role)
            .join(
                UserRole,
                UserRole.role_id == Role.id,
            )
            .where(
                UserRole.user_id == user_id
            )
            .order_by(Role.role_name)
        )

        return list(db.scalars(stmt).all())

    def update_user_roles(
        self,
        user_id: int,
        role_ids: list[int],
    ) -> list[Role]:

        user = self.repository.get(user_id)

        if user is None:
            raise ValueError("User not found.")

        db = self.repository.db

        # Remove existing assignments
        db.execute(
            delete(UserRole).where(
                UserRole.user_id == user_id
            )
        )

        # Empty list means remove all roles
        if role_ids:

            stmt = (
                select(Role.id)
                .where(Role.id.in_(role_ids))
            )

            valid_role_ids = set(
                db.scalars(stmt).all()
            )

            if len(valid_role_ids) != len(set(role_ids)):
                raise ValueError(
                    "One or more selected roles do not exist."
                )

            for role_id in sorted(valid_role_ids):
                db.add(
                    UserRole(
                        user_id=user_id,
                        role_id=role_id,
                    )
                )

        db.commit()

        return self.get_user_roles(user_id)

    # ---------------------------------------------------------
    # Delete
    # ---------------------------------------------------------

    def delete_user(
        self,
        user_id: int,
    ) -> None:

        user = self.repository.get(
            user_id,
        )

        if user is None:
            raise ValueError(
                "User not found."
            )

        self.repository.delete(
            user,
        )
