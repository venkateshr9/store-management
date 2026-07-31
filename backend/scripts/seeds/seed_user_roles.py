from sqlalchemy.orm import Session

from app.db.database import SessionLocal
from app.models.user import User
from app.models.role import Role
from app.models.user_role import UserRole


BOOTSTRAP_USER = "ADMIN001"
BOOTSTRAP_ROLE = "Super Administrator"


def seed_user_roles():
    db: Session = SessionLocal()

    try:
        user = (
            db.query(User)
            .filter(User.employee_no == BOOTSTRAP_USER)
            .first()
        )

        if not user:
            raise Exception(
                f"Bootstrap user '{BOOTSTRAP_USER}' not found."
            )

        role = (
            db.query(Role)
            .filter(Role.name == BOOTSTRAP_ROLE)
            .first()
        )

        if not role:
            raise Exception(
                f"Role '{BOOTSTRAP_ROLE}' not found."
            )

        exists = (
            db.query(UserRole)
            .filter(
                UserRole.user_id == user.id,
                UserRole.role_id == role.id,
            )
            .first()
        )

        if exists:
            print(
                f"✓ {user.employee_no} already assigned to "
                f"{role.name}"
            )
            return

        db.add(
            UserRole(
                user_id=user.id,
                role_id=role.id,
            )
        )

        db.commit()

        print("--------------------------------")
        print(
            f"Assigned '{role.name}' to "
            f"{user.employee_no}"
        )
        print("--------------------------------")

    except Exception:
        db.rollback()
        raise

    finally:
        db.close()


if __name__ == "__main__":
    seed_user_roles()
