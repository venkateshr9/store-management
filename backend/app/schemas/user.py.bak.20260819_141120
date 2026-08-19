from __future__ import annotations

from datetime import datetime

from pydantic import EmailStr, Field

from app.schemas.common import (
    AuditSchema,
    BaseSchema,
    PaginatedResponse,
)


# ---------------------------------------------------------
# Base
# ---------------------------------------------------------

class UserBase(BaseSchema):

    employee_no: str = Field(
        ...,
        max_length=50,
    )

    username: str = Field(
        ...,
        max_length=100,
    )

    full_name: str = Field(
        ...,
        max_length=200,
    )

    email: EmailStr | None = None

    mobile: str | None = Field(
        default=None,
        max_length=20,
    )

    department_id: int | None = None

    role_id: int | None = None

    is_active: bool = True

    remarks: str | None = Field(
        default=None,
        max_length=500,
    )


# ---------------------------------------------------------
# Create
# ---------------------------------------------------------

class UserCreate(UserBase):

    password: str = Field(
        ...,
        min_length=8,
    )


# ---------------------------------------------------------
# Update
# ---------------------------------------------------------

class UserUpdate(BaseSchema):

    employee_no: str | None = Field(
        default=None,
        max_length=50,
    )

    username: str | None = Field(
        default=None,
        max_length=100,
    )

    full_name: str | None = Field(
        default=None,
        max_length=200,
    )

    email: EmailStr | None = None

    mobile: str | None = Field(
        default=None,
        max_length=20,
    )

    department_id: int | None = None

    role_id: int | None = None

    is_active: bool | None = None

    remarks: str | None = Field(
        default=None,
        max_length=500,
    )
# ---------------------------------------------------------
# User Password Change
# --------------------------------------------------------
# ---------------------------------------------------------
# Change Password
# ---------------------------------------------------------

class UserChangePassword(BaseSchema):

    password: str = Field(
        ...,
        min_length=8,
        max_length=100,
    )
# ---------------------------------------------------------
# Response
# ---------------------------------------------------------

class UserResponse(
    AuditSchema,
    UserBase,
):

    last_login: datetime | None = None


UserListResponse = PaginatedResponse[
    UserResponse
]
