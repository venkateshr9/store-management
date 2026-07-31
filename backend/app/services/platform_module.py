from __future__ import annotations

from app.models.platform_module import PlatformModule
from app.repositories.platform_module import PlatformModuleRepository
from app.schemas.platform_module import (
    PlatformModuleCreate,
    PlatformModuleUpdate,
)
from app.services.base import BaseService


class PlatformModuleService(BaseService[PlatformModule]):
    """
    Business logic for Platform Modules.
    """

    def __init__(
        self,
        repository: PlatformModuleRepository,
    ) -> None:
        super().__init__(repository)
        self.repository = repository

    # ---------------------------------------------------------
    # Create Module
    # ---------------------------------------------------------

    def create_module(
        self,
        data: PlatformModuleCreate,
    ) -> PlatformModule:

        if self.repository.module_code_exists(data.module_code):
            raise ValueError(
                f"Module code '{data.module_code}' already exists."
            )

        if self.repository.table_name_exists(data.table_name):
            raise ValueError(
                f"Table name '{data.table_name}' already exists."
            )

        module = PlatformModule(**data.model_dump())

        return self.repository.create(module)

    # ---------------------------------------------------------
    # Update Module
    # ---------------------------------------------------------

    def update_module(
        self,
        module_id: int,
        data: PlatformModuleUpdate,
    ) -> PlatformModule:

        module = self.repository.get_by_id(module_id)

        if module is None:
            raise ValueError("Platform module not found.")

        values = data.model_dump(exclude_unset=True)

        if (
            "module_code" in values
            and values["module_code"] != module.module_code
            and self.repository.module_code_exists(values["module_code"])
        ):
            raise ValueError(
                f"Module code '{values['module_code']}' already exists."
            )

        if (
            "table_name" in values
            and values["table_name"] != module.table_name
            and self.repository.table_name_exists(values["table_name"])
        ):
            raise ValueError(
                f"Table name '{values['table_name']}' already exists."
            )

        return self.repository.update(module, values)

    # ---------------------------------------------------------
    # Read
    # ---------------------------------------------------------

    def get_module(
        self,
        module_id: int,
    ) -> PlatformModule | None:
        return self.repository.get_by_id(module_id)

    def list_modules(
        self,
    ) -> list[PlatformModule]:
        return self.repository.get_all()

    def list_active_modules(
        self,
    ) -> list[PlatformModule]:
        return self.repository.get_active_modules()

    # ---------------------------------------------------------
    # Delete
    # ---------------------------------------------------------

    def delete_module(
        self,
        module_id: int,
    ) -> None:

        module = self.repository.get_by_id(module_id)

        if module is None:
            raise ValueError("Platform module not found.")

        self.repository.delete(module)

    def soft_delete_module(
        self,
        module_id: int,
    ) -> PlatformModule:

        module = self.repository.get_by_id(module_id)

        if module is None:
            raise ValueError("Platform module not found.")

        return self.repository.soft_delete(module)

    def restore_module(
        self,
        module_id: int,
    ) -> PlatformModule:

        module = self.repository.get_by_id(module_id)

        if module is None:
            raise ValueError("Platform module not found.")

        return self.repository.restore(module)
