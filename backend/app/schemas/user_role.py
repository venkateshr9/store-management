from pydantic import BaseModel, Field


class UserRoleResponse(BaseModel):
    role_id: int
    role_code: str
    role_name: str


class UserRoleUpdate(BaseModel):
    role_ids: list[int] = Field(default_factory=list)
