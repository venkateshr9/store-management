from sqlalchemy.orm import Session

from app.db.database import SessionLocal
from app.models.permission import Permission
from scripts.seeds.permissions import PERMISSIONS


def seed_permissions():
    db: Session = SessionLocal()

    try:
        inserted = 0

        for module, actions in PERMISSIONS.items():
    	    for action in actions:

                exists = (
                    db.query(Permission)
                    .filter(
                        Permission.module == module,
                        Permission.action == action
                    )
                    .first()
                )

                if exists:
                    print(f"✓ Exists : {module}:{action}")
                    continue

                permission = Permission(
                    module=module,
                    action=action,
                    description=f"{action.title()} {module.title()}"
                )

                db.add(permission)
                inserted += 1

                print(f"+ Added  : {module}:{action}")

        db.commit()

        print("\n--------------------------------")
        print(f"Permissions inserted : {inserted}")
        print("--------------------------------")

    except Exception:
        db.rollback()
        raise

    finally:
        db.close()


if __name__ == "__main__":
    seed_permissions()
