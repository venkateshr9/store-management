from datetime import datetime

from pydantic import BaseModel, EmailStr


class UserBase(BaseModel):
    employee_no: str
    username: str
    full_name: str
    email: EmailStr | None = None
    mobile: str | None = None
    is_active: bool = True


class UserCreate(UserBase):
    password: str


class UserUpdate(BaseModel):
    full_name: str | None = None
    email: EmailStr | None = None
    mobile: str | None = None
    is_active: bool | None = None


class UserResponse(UserBase):
    id: int
    last_login: datetime | None = None
    created_at: datetime
    updated_at: datetime

    model_config = {
        "from_attributes": True
    }
