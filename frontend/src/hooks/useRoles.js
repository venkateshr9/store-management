import { useCallback, useEffect, useState } from "react";

import roleService from "../services/roleService";

export default function useRoles() {

    const [roles, setRoles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const loadRoles = useCallback(async () => {

        setLoading(true);
        setError(null);

        try {

            const response = await roleService.getAll();

            setRoles(response.data);

        } catch (err) {

            console.error(err);
            setError(err);

        } finally {

            setLoading(false);

        }

    }, []);

    const createRole = async (data) => {

        const response = await roleService.create(data);

        await loadRoles();

        return response.data;

    };

    const updateRole = async (id, data) => {

        const response = await roleService.update(id, data);

        await loadRoles();

        return response.data;

    };

    const deleteRole = async (id) => {

        await roleService.remove(id);

        await loadRoles();

    };

    useEffect(() => {

        loadRoles();

    }, [loadRoles]);

    return {

        roles,
        loading,
        error,

        loadRoles,

        createRole,
        updateRole,
        deleteRole,

    };

}
