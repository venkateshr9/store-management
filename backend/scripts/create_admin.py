import os
import sys

PROJECT_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, PROJECT_ROOT)

from sqlalchemy.orm import Session

from app.db.database import SessionLocal
from app.models.role import Role
from app.models.user import User
from app.models.user_role import UserRole
from app.core.security import hash_password


ADMIN_USERNAME = "admin"
ADMIN_EMPLOYEE_NO = "ADMIN001"
ADMIN_PASSWORD = "System@9876"


def create_admin():
    db: Session = SessionLocal()

    try:
        # Check if admin already exists
        admin = db.query(User).filter(
            User.username == ADMIN_USERNAME
        ).first()

        if admin:
            print("Administrator already exists.")
            return

        # Check if Super Administrator role exists
        role = db.query(Role).filter(
            Role.name == "Super Administrator"
        ).first()

        if role is None:
            role = Role(
                name="Super Administrator",
                description="System Super Administrator",
                is_system=True,
            )

            db.add(role)
            db.commit()
            db.refresh(role)

        # Create administrator
        admin = User(
            employee_no=ADMIN_EMPLOYEE_NO,
            username=ADMIN_USERNAME,
            full_name="System Administrator",
            email="admin@localhost",
            mobile=None,
            password_hash=hash_password(ADMIN_PASSWORD),
            is_active=True,
        )

        db.add(admin)
        db.commit()
        db.refresh(admin)

        # Assign role
        db.add(
            UserRole(
                user_id=admin.id,
                role_id=role.id
            )
        )

        db.commit()

        print("===================================")
        print("Administrator created successfully")
        print("Username :", ADMIN_USERNAME)
        print("Password :", ADMIN_PASSWORD)
        print("Role     : Super Administrator")
        print("===================================")

    finally:
        db.close()


if __name__ == "__main__":
    create_admin()
