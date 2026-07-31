from sqlalchemy import Boolean, Column, DateTime, Integer, String
from sqlalchemy.sql import func

from app.db.database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)

    employee_no = Column(String(50), unique=True, nullable=False, index=True)

    username = Column(String(100), unique=True, nullable=False, index=True)

    full_name = Column(String(200), nullable=False)

    email = Column(String(255), unique=True, nullable=True)

    mobile = Column(String(20), nullable=True)

    password_hash = Column(String(255), nullable=False)

    is_active = Column(Boolean, default=True)

    last_login = Column(DateTime(timezone=True), nullable=True)

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        nullable=False
    )

    updated_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now(),
        nullable=False
    )
