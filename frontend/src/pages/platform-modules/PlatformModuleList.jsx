import React, { useMemo, useState } from "react";

import {
    Box,
    Snackbar,
    Alert,
} from "@mui/material";

import usePlatformModules from "../../hooks/usePlatformModules";

import LoadingOverlay from "../../components/common/LoadingOverlay";

import PlatformModuleToolbar from "../../components/platform-modules/PlatformModuleToolbar";
import PlatformModuleTable from "../../components/platform-modules/PlatformModuleTable";
import PlatformModuleDialog from "../../components/platform-modules/PlatformModuleDialog";
import PlatformModuleDeleteDialog from "../../components/platform-modules/PlatformModuleDeleteDialog";

export default function PlatformModuleList() {

    const {
        modules,
        loading,
        createModule,
        updateModule,
        deleteModule,
        loadModules,
    } = usePlatformModules();

    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("all");

    const [dialogOpen, setDialogOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);

    const [selectedModule, setSelectedModule] = useState(null);

    const [snackbar, setSnackbar] = useState({
        open: false,
        severity: "success",
        message: "",
    });

    const filteredModules = useMemo(() => {

        return modules.filter((module) => {

            const searchMatch =
                module.module_name
                    ?.toLowerCase()
                    .includes(search.toLowerCase()) ||

                module.module_code
                    ?.toLowerCase()
                    .includes(search.toLowerCase());

            if (status === "all")
                return searchMatch;

            return (
                searchMatch &&
                (
                    status === "active"
                        ? module.is_active
                        : !module.is_active
                )
            );

        });

    }, [modules, search, status]);

    const openCreateDialog = () => {
        setSelectedModule(null);
        setDialogOpen(true);
    };

    const openEditDialog = (module) => {
        setSelectedModule(module);
        setDialogOpen(true);
    };

    const openViewDialog = (module) => {
        // For now, view uses the same dialog as edit.
        // Later we'll create a dedicated read-only details page.
        setSelectedModule(module);
        setDialogOpen(true);
    };

    const closeDialog = () => {
        setDialogOpen(false);
        setSelectedModule(null);
    };

    const openDeleteDialog = (module) => {
        setSelectedModule(module);
        setDeleteOpen(true);
    };

    const closeDeleteDialog = () => {
        setDeleteOpen(false);
        setSelectedModule(null);
    };

    const closeSnackbar = (_, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setSnackbar((prev) => ({
            ...prev,
            open: false,
        }));
    };

    const handleSave = async (data) => {
        try {
            if (selectedModule) {
                await updateModule(selectedModule.id, data);

                setSnackbar({
                    open: true,
                    severity: "success",
                    message: "Platform module updated successfully.",
                });
            } else {
                await createModule(data);

                setSnackbar({
                    open: true,
                    severity: "success",
                    message: "Platform module created successfully.",
                });
            }

            closeDialog();
            await loadModules();

        } catch (error) {
            console.error(error);

            setSnackbar({
                open: true,
                severity: "error",
                message: "Unable to save platform module.",
            });
        }
    };

    const handleDelete = async () => {
        if (!selectedModule) {
            return;
        }

        try {
            await deleteModule(selectedModule.id);

            setSnackbar({
                open: true,
                severity: "success",
                message: "Platform module deleted successfully.",
            });

            closeDeleteDialog();
            await loadModules();

        } catch (error) {
            console.error(error);

            setSnackbar({
                open: true,
                severity: "error",
                message: "Unable to delete platform module.",
            });
        }
    };
    return (
        <Box sx={{ p: 3 }}>

            <PlatformModuleToolbar
                search={search}
                status={status}
                onSearchChange={setSearch}
                onStatusChange={setStatus}
                onRefresh={loadModules}
                onAdd={openCreateDialog}
            />

            <Box sx={{ mt: 2 }}>
                <PlatformModuleTable
                    rows={filteredModules}
                    loading={loading}
                    onView={openViewDialog}
                    onEdit={openEditDialog}
                    onDelete={openDeleteDialog}
                />
            </Box>

            <PlatformModuleDialog
                open={dialogOpen}
                mode={selectedModule ? "edit" : "create"}
                module={selectedModule}
                loading={loading}
                onClose={closeDialog}
                onSave={handleSave}
            />

            <PlatformModuleDeleteDialog
                open={deleteOpen}
                loading={loading}
                module={selectedModule}
                onClose={closeDeleteDialog}
                onConfirm={handleDelete}
            />

            <LoadingOverlay
                open={loading}
                message="Loading Platform Modules..."
            />

            <Snackbar
                open={snackbar.open}
                autoHideDuration={4000}
                onClose={closeSnackbar}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
            >
                <Alert
                    severity={snackbar.severity}
                    onClose={closeSnackbar}
                    variant="filled"
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>

        </Box>
    );
}
