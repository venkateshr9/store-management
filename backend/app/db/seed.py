"""
Store Management System
Database Seeder Entry Point

Usage:
    python -m app.db.seed
"""

from __future__ import annotations

import logging
import sys

from app.db.session import SessionLocal
from app.db.seed_runner import SeedRunner


def configure_logging() -> None:
    """
    Configure application logging for database seeding.
    """
    logging.basicConfig(
        level=logging.INFO,
        format="%(asctime)s | %(levelname)-8s | %(message)s",
        datefmt="%Y-%m-%d %H:%M:%S",
    )


def main() -> int:
    """
    Main entry point.
    """
    configure_logging()

    session = SessionLocal()

    try:
        runner = SeedRunner(session)
        runner.run()

        return 0

    except Exception:
        logging.exception("Database seeding failed.")
        return 1

    finally:
        session.close()


if __name__ == "__main__":
    sys.exit(main())
