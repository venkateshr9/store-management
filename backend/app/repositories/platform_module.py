from __future__ import annotations

from sqlalchemy import select

from sqlalchemy.orm import Session

from app.core.enums import RecordStatus
from app.models.platform_module import PlatformModule

from app.repositories.base import BaseRepository


class PlatformModuleRepository(BaseRepository[PlatformModule]):
    """
    Repository for PlatformModule specific database operations.
    """

    def __init__(self, session: Session) -> None:
        super().__init__(session, PlatformModule)

    # ---------------------------------------------------------
    # Module Lookup
    # ---------------------------------------------------------

    def get_by_module_code(
        self,
        module_code: str,
    ) -> PlatformModule | None:

        stmt = (
            select(PlatformModule)
            .where(PlatformModule.module_code == module_code)
        )

        return self.session.scalar(stmt)

    def get_by_table_name(
        self,
        table_name: str,
    ) -> PlatformModule | None:

        stmt = (
            select(PlatformModule)
            .where(PlatformModule.table_name == table_name)
        )

        return self.session.scalar(stmt)

    # ---------------------------------------------------------
    # Existence Checks
    # ---------------------------------------------------------

    def module_code_exists(
        self,
        module_code: str,
    ) -> bool:

        return (
            self.get_by_module_code(module_code)
            is not None
        )

    def table_name_exists(
        self,
        table_name: str,
    ) -> bool:

        return (
            self.get_by_table_name(table_name)
            is not None
        )

    # ---------------------------------------------------------
    # Active Modules
    # ---------------------------------------------------------

    def get_active_modules(
        self,
    ) -> list[PlatformModule]:

        stmt = (
            select(PlatformModule)
            .where(
                PlatformModule.status == RecordStatus.ACTIVE
            )
            .order_by(PlatformModule.menu_order)
        )

        return list(self.session.scalars(stmt).all())
