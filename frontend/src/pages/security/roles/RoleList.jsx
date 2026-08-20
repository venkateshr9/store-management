import React, { useMemo, useState } from "react";

import {
    Box,
    Snackbar,
    Alert,
} from "@mui/material";

import useRoles from "../../../hooks/useRoles";

import LoadingOverlay from "../../../components/common/LoadingOverlay";

import RoleToolbar from "../../../components/security/roles/RoleToolbar";
import RoleTable from "../../../components/security/roles/RoleTable";
import RoleDialog from "../../../components/security/roles/RoleDialog";
import RoleDeleteDialog from "../../../components/security/roles/RoleDeleteDialog";
import RolePermissionDialog from "../../../components/security/roles/RolePermissionDialog";

export default function RoleList() {

    const {
        roles,
        loading,
        createRole,
        updateRole,
        deleteRole,
        loadRoles,
    } = useRoles();

    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("all");

    const [dialogOpen, setDialogOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [permissionOpen, setPermissionOpen] = useState(false);

    const [selectedRole, setSelectedRole] = useState(null);

    const [snackbar, setSnackbar] = useState({
        open: false,
        severity: "success",
        message: "",
    });

    const filteredRoles = useMemo(() => {

        return roles.filter((role) => {

            const searchMatch =
                role.role_code
                    ?.toLowerCase()
                    .includes(search.toLowerCase()) ||

                role.role_name
                    ?.toLowerCase()
                    .includes(search.toLowerCase());

            if (status === "all") {
                return searchMatch;
            }

            return (
                searchMatch &&
                (
                    status === "active"
                        ? role.status === "ACTIVE"
                        : role.status === "INACTIVE"
                )
            );

        });

    }, [roles, search, status]);

    const openCreateDialog = () => {
        setSelectedRole(null);
        setDialogOpen(true);
    };

    const openEditDialog = (role) => {
        setSelectedRole(role);
        setDialogOpen(true);
    };

    const openViewDialog = (role) => {
        setSelectedRole(role);
        setDialogOpen(true);
    };

    const openManagePermissions = (role) => {
    };

    const openPermissionDialog = (role) => {
        setSelectedRole(role);
        setPermissionOpen(true);
    };

    const closePermissionDialog = () => {
        setPermissionOpen(false);
        setSelectedRole(null);
    };

    const closeDialog = () => {
        setDialogOpen(false);
        setSelectedRole(null);
    };

    const openDeleteDialog = (role) => {
        setSelectedRole(role);
        setDeleteOpen(true);
    };

    const closeDeleteDialog = () => {
        setDeleteOpen(false);
        setSelectedRole(null);
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

            if (selectedRole) {

                await updateRole(selectedRole.id, data);

                setSnackbar({
                    open: true,
                    severity: "success",
                    message: "Role updated successfully.",
                });

            } else {

                await createRole(data);

                setSnackbar({
                    open: true,
                    severity: "success",
                    message: "Role created successfully.",
                });

            }

            closeDialog();
            await loadRoles();

        } catch (error) {

            console.error(error);

            setSnackbar({
                open: true,
                severity: "error",
                message:
                    error?.response?.data?.detail ||
                    "Unable to save role.",
            });

        }

    };

    const handleDelete = async () => {

        if (!selectedRole) {
            return;
        }

        try {

            await deleteRole(selectedRole.id);

            setSnackbar({
                open: true,
                severity: "success",
                message: "Role deleted successfully.",
            });

            closeDeleteDialog();
            await loadRoles();

        } catch (error) {

            console.error(error);

            setSnackbar({
                open: true,
                severity: "error",
                message:
                    error?.response?.data?.detail ||
                    "Unable to delete role.",
            });

        }

    };

    return (

        <Box sx={{ p: 3 }}>

            <RoleToolbar
                search={search}
                status={status}
                onSearchChange={setSearch}
                onStatusChange={setStatus}
                onRefresh={loadRoles}
                onAdd={openCreateDialog}
            />

            <Box sx={{ mt: 2 }}>

                <RoleTable
                    rows={filteredRoles}
                    loading={loading}
                    onView={openViewDialog}
                    onEdit={openEditDialog}
                    onDelete={openDeleteDialog}
                    onManagePermissions={openPermissionDialog}
                />

            </Box>

            <RoleDialog
                open={dialogOpen}
                mode={selectedRole ? "edit" : "create"}
                role={selectedRole}
                loading={loading}
                onClose={closeDialog}
                onSave={handleSave}
            />

            <RoleDeleteDialog
                open={deleteOpen}
                role={selectedRole}
                loading={loading}
                onClose={closeDeleteDialog}
                onConfirm={handleDelete}
            />

            <RolePermissionDialog
                open={permissionOpen}
                role={selectedRole}
                onClose={closePermissionDialog}
                onSaved={() =>
                    setSnackbar({
                        open: true,
                        severity: "success",
                        message: "Role permissions updated successfully.",
                    })
                }
            />

            <LoadingOverlay
                open={loading}
                message="Loading Roles..."
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
                    variant="filled"
                    onClose={closeSnackbar}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>

        </Box>

    );

}
