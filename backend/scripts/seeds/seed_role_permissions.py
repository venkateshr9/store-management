from sqlalchemy.orm import Session

from app.db.database import SessionLocal
from app.models.permission import Permission
from app.models.role import Role
from app.models.role_permission import RolePermission

from scripts.seeds.role_permissions import ROLE_PERMISSIONS


def seed_role_permissions():
    db: Session = SessionLocal()

    try:
        inserted = 0

        # Cache all permissions
        permission_map = {
            (p.module, p.action): p.id
            for p in db.query(Permission).all()
        }

        # Cache all roles
        role_map = {
            r.name: r
            for r in db.query(Role).all()
        }

        for role_name, permissions in ROLE_PERMISSIONS.items():

            role = role_map.get(role_name)

            if not role:
                print(f"✗ Role not found : {role_name}")
                continue

            #
            # Super Administrator -> all permissions
            #
            if permissions == "*":

                permission_ids = permission_map.values()

            else:

                permission_ids = []

                for module, actions in permissions.items():

                    for action in actions:

                        permission_id = permission_map.get(
                            (module, action)
                        )

                        if permission_id is None:
                            print(
                                f"✗ Permission not found : "
                                f"{module}:{action}"
                            )
                            continue

                        permission_ids.append(permission_id)

            #
            # Insert mappings
            #
            for permission_id in permission_ids:

                exists = (
                    db.query(RolePermission)
                    .filter(
                        RolePermission.role_id == role.id,
                        RolePermission.permission_id == permission_id,
                    )
                    .first()
                )

                if exists:
                    continue

                db.add(
                    RolePermission(
                        role_id=role.id,
                        permission_id=permission_id,
                    )
                )

                inserted += 1

        db.commit()

        print("\n--------------------------------")
        print(f"Role permissions inserted : {inserted}")
        print("--------------------------------")

    except Exception:
        db.rollback()
        raise

    finally:
        db.close()


if __name__ == "__main__":
    seed_role_permissions()
