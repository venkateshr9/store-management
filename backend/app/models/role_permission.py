from sqlalchemy import (
    ForeignKey,
    Integer,
)

from sqlalchemy.orm import (
    Mapped,
    mapped_column,
)

from app.db.base import Base


class RolePermission(Base):
    __tablename__ = "role_permissions"

    role_id: Mapped[int] = mapped_column(
        Integer,
        ForeignKey(
            "roles.id",
            ondelete="CASCADE",
        ),
        primary_key=True,
    )

    permission_id: Mapped[int] = mapped_column(
        Integer,
        ForeignKey(
            "permissions.id",
            ondelete="CASCADE",
        ),
        primary_key=True,
    )

    def __repr__(self) -> str:
        return (
            f"<RolePermission("
            f"role_id={self.role_id}, "
            f"permission_id={self.permission_id})>"
        )
