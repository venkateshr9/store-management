from sqlalchemy.orm import Session

from app.db.database import SessionLocal
from app.models.role import Role
from scripts.seeds.roles import ROLES


def seed_roles():
    db: Session = SessionLocal()

    try:
        inserted = 0
        updated = 0

        for role_data in ROLES:

            role = (
                db.query(Role)
                .filter(Role.name == role_data["name"])
                .first()
            )

            if role:
                changed = False

                if role.description != role_data["description"]:
                    role.description = role_data["description"]
                    changed = True

                if role.is_system != role_data["is_system"]:
                    role.is_system = role_data["is_system"]
                    changed = True

                if changed:
                    updated += 1
                    print(f"~ Updated : {role.name}")
                else:
                    print(f"✓ Exists  : {role.name}")

                continue

            role = Role(
                name=role_data["name"],
                description=role_data["description"],
                is_system=role_data["is_system"],
            )

            db.add(role)
            inserted += 1

            print(f"+ Added   : {role.name}")

        db.commit()

        print("\n--------------------------------")
        print(f"Roles inserted : {inserted}")
        print(f"Roles updated  : {updated}")
        print("--------------------------------")

    except Exception:
        db.rollback()
        raise

    finally:
        db.close()


if __name__ == "__main__":
    seed_roles()
