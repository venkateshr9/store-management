ROLE_PERMISSIONS = {

    "Super Administrator": "*",

    "Administrator": {
        "users": [
            "view",
            "create",
            "update",
            "delete",
        ],

        "roles": [
            "view",
            "create",
            "update",
            "delete",
        ],

        "permissions": [
            "view",
            "assign",
        ],

        "stores": [
            "view",
            "create",
            "update",
            "delete",
        ],

        "warehouses": [
            "view",
            "create",
            "update",
            "delete",
        ],

        "suppliers": [
            "view",
            "create",
            "update",
            "delete",
        ],

        "categories": [
            "view",
            "create",
            "update",
            "delete",
        ],

        "items": [
            "view",
            "create",
            "update",
            "delete",
        ],

        "inventory": [
            "view",
            "receive",
            "issue",
            "transfer",
            "adjust",
        ],

        "purchase": [
            "view",
            "create",
            "approve",
            "cancel",
        ],

        "reports": [
            "view",
        ],

        "dashboard": [
            "view",
        ],
    },

    "Store Manager": {
        "inventory": [
            "view",
            "receive",
            "issue",
            "transfer",
        ],

        "items": [
            "view",
            "update",
        ],

        "categories": [
            "view",
        ],

        "suppliers": [
            "view",
        ],

        "purchase": [
            "view",
        ],

        "reports": [
            "view",
        ],

        "dashboard": [
            "view",
        ],
    },

    "Store Keeper": {
        "inventory": [
            "view",
            "receive",
            "issue",
        ],

        "items": [
            "view",
        ],

        "dashboard": [
            "view",
        ],
    },

    "Purchase Officer": {
        "purchase": [
            "view",
            "create",
        ],

        "suppliers": [
            "view",
            "create",
            "update",
        ],

        "items": [
            "view",
        ],

        "dashboard": [
            "view",
        ],
    },

    "Auditor": {
        "reports": [
            "view",
        ],

        "dashboard": [
            "view",
        ],

        "system": [
            "audit",
        ],
    },

    "Viewer": {
        "dashboard": [
            "view",
        ],

        "reports": [
            "view",
        ],
    },
}
