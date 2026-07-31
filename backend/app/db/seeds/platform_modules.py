"""
Platform Modules Seed
"""
from __future__ import annotations

from app.db.seeds.base import SeedBase
from app.models.platform_module import PlatformModule
from app.core.enums import ModuleType, RecordStatus
# ---------------------------------------------------------
# Default Platform Modules
# ---------------------------------------------------------

MODULES = [
    {
        "module_code": "DASHBOARD",
        "module_name": "dashboard",
        "display_name": "Dashboard",
        "module_type": ModuleType.SYSTEM,
        "table_name": "dashboard",
        "status": RecordStatus.ACTIVE,
        "menu_order": 1,
    },
    
     {
        "module_code": "DASHBOARD1",
        "module_name": "dashboard1",
        "display_name": "Dashboard1",
        "module_type": ModuleType.SYSTEM,
        "table_name": "dashboard1",
        "status": RecordStatus.ACTIVE,
        "menu_order": 1,
    },
    # Add remaining modules here...
]

# ---------------------------------------------------------
# Seed Class
# ---------------------------------------------------------

class PlatformModuleSeed(SeedBase):

    name = "Platform Modules"

    def seed(self):

        created = 0
        skipped = 0

        for module in MODULES:

            if self.exists(
                PlatformModule,
                module_code=module["module_code"]
            ):
                skipped += 1
                continue

            self.add(PlatformModule(**module))
            created += 1

        self.commit()

        self.log(
            f"Created={created}, Skipped={skipped}"
        )
