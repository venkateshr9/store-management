import { useEffect, useState } from "react";

import {
    getPermissions,
    createPermission,
    updatePermission,
    deletePermission,
} from "../services/permissionService";

export default function usePermissions() {

    const [permissions, setPermissions] = useState([]);

    const [loading, setLoading] = useState(false);

    const loadPermissions = async () => {

        setLoading(true);

        try {

            const response = await getPermissions();

            setPermissions(response.data);

        } finally {

            setLoading(false);

        }

    };

    const handleCreatePermission = async (data) => {

        await createPermission(data);

        await loadPermissions();

    };

    const handleUpdatePermission = async (id, data) => {

        await updatePermission(id, data);

        await loadPermissions();

    };

    const handleDeletePermission = async (id) => {

        await deletePermission(id);

        await loadPermissions();

    };

    useEffect(() => {
        loadPermissions();
    }, []);

    return {

        permissions,

        loading,

        refresh: loadPermissions,

        createPermission: handleCreatePermission,

        updatePermission: handleUpdatePermission,

        deletePermission: handleDeletePermission,

    };

}
