"""
Store Management System
Database Seed Base Utilities

This module provides common helper functions for all database seed files.

Author: Store Management System
"""

from __future__ import annotations

import logging
from typing import Any

from sqlalchemy.orm import Session

logger = logging.getLogger("db.seed")


class SeedBase:
    """
    Base class for all database seed modules.
    """

    name: str = "Base Seed"

    def __init__(self, session: Session):
        self.session = session

    def log(self, message: str) -> None:
        logger.info("[%s] %s", self.name, message)

    def exists(self, model: Any, **filters: Any) -> bool:
        """
        Check whether a record already exists.

        Example:
            self.exists(Role, role_code="SUPER_ADMIN")
        """
        return (
            self.session.query(model)
            .filter_by(**filters)
            .first()
            is not None
        )

    def get(self, model: Any, **filters: Any):
        """
        Return first matching record or None.
        """
        return (
            self.session.query(model)
            .filter_by(**filters)
            .first()
        )

    def add(self, instance: Any) -> None:
        """
        Add an object to the current transaction.
        """
        self.session.add(instance)

    def commit(self) -> None:
        """
        Commit current transaction.
        """
        self.session.commit()

    def rollback(self) -> None:
        """
        Rollback current transaction.
        """
        self.session.rollback()

    def flush(self) -> None:
        """
        Flush pending changes without committing.
        """
        self.session.flush()

    def seed(self) -> None:
        """
        Override this method in child classes.
        """
        raise NotImplementedError(
            "Seed classes must implement seed()."
        )
