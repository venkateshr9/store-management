"""add audit columns to permissions

Revision ID: 12536fdbc88c
Revises: 86d79dfa0e47
Create Date: 2026-08-01

"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = "12536fdbc88c"
down_revision: str | None = "86d79dfa0e47"
branch_labels: Sequence[str] | None = None
depends_on: Sequence[str] | None = None


def upgrade() -> None:

    op.add_column(
        "permissions",
        sa.Column(
            "created_by",
            sa.Integer(),
            nullable=True,
        ),
    )

    op.add_column(
        "permissions",
        sa.Column(
            "updated_by",
            sa.Integer(),
            nullable=True,
        ),
    )

    op.add_column(
        "permissions",
        sa.Column(
            "updated_at",
            sa.TIMESTAMP(),
            nullable=True,
            server_default=sa.func.current_timestamp(),
        ),
    )


def downgrade() -> None:

    op.drop_column(
        "permissions",
        "updated_at",
    )

    op.drop_column(
        "permissions",
        "updated_by",
    )

    op.drop_column(
        "permissions",
        "created_by",
    )
