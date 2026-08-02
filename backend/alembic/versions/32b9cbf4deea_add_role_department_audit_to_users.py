"""add role department audit to users

Revision ID: 32b9cbf4deea
Revises: 12536fdbc88c
Create Date: 2026-08-01 16:12:10.929558

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '32b9cbf4deea'
down_revision: Union[str, Sequence[str], None] = '12536fdbc88c'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None

def upgrade():

    op.add_column(
        "users",
        sa.Column(
            "department_id",
            sa.Integer(),
            nullable=True,
        ),
    )

    op.add_column(
        "users",
        sa.Column(
            "role_id",
            sa.Integer(),
            nullable=True,
        ),
    )

    op.add_column(
        "users",
        sa.Column(
            "remarks",
            sa.String(500),
            nullable=True,
        ),
    )

    op.add_column(
        "users",
        sa.Column(
            "created_by",
            sa.Integer(),
            nullable=True,
        ),
    )

    op.add_column(
        "users",
        sa.Column(
            "updated_by",
            sa.Integer(),
            nullable=True,
        ),
    )

    #op.create_foreign_key(
     #   "fk_users_department",
      #  "users",
       # "departments",
        #["department_id"],
        #["id"],
    #)

    op.create_foreign_key(
        "fk_users_role",
        "users",
        "roles",
        ["role_id"],
        ["id"],
    )


def downgrade():

    op.drop_constraint(
        "fk_users_role",
        "users",
        type_="foreignkey",
    )

    #op.drop_constraint(
    #    "fk_users_department",
     #   "users",
      #  type_="foreignkey",
   # )

    op.drop_column("users", "updated_by")
    op.drop_column("users", "created_by")
    op.drop_column("users", "remarks")
    op.drop_column("users", "role_id")
    op.drop_column("users", "department_id")
