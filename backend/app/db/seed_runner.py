"""
Store Management System
Database Seed Runner

Executes all database seed modules in the correct order.
"""

from __future__ import annotations

import logging
from sqlalchemy.orm import Session

from app.db.seeds.platform_modules import PlatformModuleSeed
#from app.db.seeds.roles import RoleSeed
#from app.db.seeds.permissions import PermissionSeed
#from app.db.seeds.users import UserSeed
#from app.db.seeds.departments import DepartmentSeed
#from app.db.seeds.stores import StoreSeed
#from app.db.seeds.warehouses import WarehouseSeed
#from app.db.seeds.settings import SettingSeed
#from app.db.seeds.menu import MenuSeed

logger = logging.getLogger("db.seed")


class SeedRunner:
    """
    Executes all seed classes in the required order.
    """

    def __init__(self, session: Session):
        self.session = session

        self.seeds = [
            PlatformModuleSeed,
        ]

    def run(self) -> None:
        total = len(self.seeds)

        logger.info("=" * 60)
        logger.info("Store Management System Database Seeder")
        logger.info("=" * 60)

        for index, seed_class in enumerate(self.seeds, start=1):
            seed = seed_class(self.session)

            logger.info("[%d/%d] %s", index, total, seed.name)

            try:
                seed.seed()
                logger.info("✓ %s completed", seed.name)

            except Exception:
                self.session.rollback()

                logger.exception(
                    "✗ %s failed",
                    seed.name,
                )

                raise

        logger.info("=" * 60)
        logger.info("Database seeding completed successfully.")
        logger.info("=" * 60)
