from sqlalchemy import (
    Column,
    DateTime,
    Integer,
    String,
    UniqueConstraint,
)

from sqlalchemy.sql import func

from app.db.database import Base


class Permission(Base):
    __tablename__ = "permissions"

    __table_args__ = (
        UniqueConstraint(
            "module",
            "action",
            name="uq_permission_module_action",
        ),
    )

    id = Column(Integer, primary_key=True, index=True)

    module = Column(String(100), nullable=False, index=True)

    action = Column(String(100), nullable=False)

    description = Column(String(255))

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        nullable=False
    )

    @property
    def code(self):
        return f"{self.module}:{self.action}"
