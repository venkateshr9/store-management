// src/hooks/usePlatformModules.js

import { useCallback, useEffect, useState } from "react";
import platformModuleService from "../services/platformModuleService";

export default function usePlatformModules() {
    const [modules, setModules] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    /**
     * Load all platform modules
     */
    const loadModules = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await platformModuleService.getAll();
            setModules(response.data);
        } catch (err) {
            console.error(err);
            setError(err);
        } finally {
            setLoading(false);
        }
    }, []);

    /**
     * Create module
     */
    const createModule = async (data) => {
        const response = await platformModuleService.create(data);
        await loadModules();
        return response.data;
    };

    /**
     * Update module
     */
    const updateModule = async (id, data) => {
        const response = await platformModuleService.update(id, data);
        await loadModules();
        return response.data;
    };

    /**
     * Delete module
     */
    const deleteModule = async (id) => {
        await platformModuleService.remove(id);
        await loadModules();
    };

    /**
     * Soft Delete
     */
    const deactivateModule = async (id) => {
        await platformModuleService.deactivate(id);
        await loadModules();
    };

    /**
     * Restore
     */
    const restoreModule = async (id) => {
        await platformModuleService.restore(id);
        await loadModules();
    };

    useEffect(() => {
        loadModules();
    }, [loadModules]);

    return {
        modules,
        loading,
        error,

        loadModules,

        createModule,
        updateModule,
        deleteModule,
        deactivateModule,
        restoreModule,
    };
}
