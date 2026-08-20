import React, { useEffect, useMemo, useState } from "react";

import {
    Alert,
    Box,
    Button,
    Checkbox,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    FormControlLabel,
    Grid,
    Stack,
    Typography,
} from "@mui/material";

import usePermissions from "../../../hooks/usePermissions";

import {
    getRolePermissions,
    updateRolePermissions,
} from "../../../services/roleService";


export default function RolePermissionDialog({
    open,
    role,
    onClose,
    onSaved,
}) {
    const {
        permissions,
        loading: permissionsLoading,
    } = usePermissions();

    const [selected, setSelected] = useState(new Set());
    const [loadingRolePermissions, setLoadingRolePermissions] = useState(false);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!open || !role?.id) {
            return;
        }

        let cancelled = false;

        const load = async () => {
            setLoadingRolePermissions(true);
            setError("");

            try {
                const response = await getRolePermissions(role.id);

                if (!cancelled) {
                    setSelected(
                        new Set(
                            (response.data?.permission_ids || []).map(Number)
                        )
                    );
                }
            } catch (err) {
                if (!cancelled) {
                    setError(
                        err?.response?.data?.detail ||
                        "Unable to load role permissions."
                    );
                }
            } finally {
                if (!cancelled) {
                    setLoadingRolePermissions(false);
                }
            }
        };

        load();

        return () => {
            cancelled = true;
        };
    }, [open, role]);

    const groupedPermissions = useMemo(() => {
        const groups = {};

        permissions.forEach((permission) => {
            const moduleName =
                permission.module ||
                permission.module_name ||
                "Other";

            if (!groups[moduleName]) {
                groups[moduleName] = [];
            }

            groups[moduleName].push(permission);
        });

        return Object.entries(groups).sort(([a], [b]) =>
            a.localeCompare(b)
        );
    }, [permissions]);

    const allPermissionIds = useMemo(
        () => permissions.map((permission) => Number(permission.id)),
        [permissions]
    );

    const togglePermission = (permissionId) => {
        setSelected((previous) => {
            const next = new Set(previous);
            const id = Number(permissionId);

            if (next.has(id)) {
                next.delete(id);
            } else {
                next.add(id);
            }

            return next;
        });
    };

    const toggleModule = (modulePermissions) => {
        const ids = modulePermissions.map((permission) =>
            Number(permission.id)
        );

        setSelected((previous) => {
            const next = new Set(previous);
            const allSelected = ids.every((id) => next.has(id));

            ids.forEach((id) => {
                if (allSelected) {
                    next.delete(id);
                } else {
                    next.add(id);
                }
            });

            return next;
        });
    };

    const selectAll = () => {
        setSelected(new Set(allPermissionIds));
    };

    const clearAll = () => {
        setSelected(new Set());
    };

    const handleSave = async () => {
        if (!role?.id) {
            return;
        }

        setSaving(true);
        setError("");

        try {
            await updateRolePermissions(
                role.id,
                Array.from(selected)
            );

            onSaved?.();
            onClose();
        } catch (err) {
            setError(
                err?.response?.data?.detail ||
                "Unable to save role permissions."
            );
        } finally {
            setSaving(false);
        }
    };

    const busy =
        permissionsLoading ||
        loadingRolePermissions ||
        saving;

    return (
        <Dialog
            open={open}
            onClose={busy ? undefined : onClose}
            fullWidth
            maxWidth="md"
        >

        <DialogTitle>
            <Typography
                component="div"
                variant="h6"
                fontWeight={700}
            >
                Assign Permissions
            </Typography>

            {role && (
                <Typography
                        component="div"
                        variant="body2"
                        color="text.secondary"
                        sx={{ mt: 0.5 }}
                >
                        {role.role_name} ({role.role_code})
                </Typography>
            )}
        </DialogTitle>
            <DialogContent dividers>
                {error && (
                    <Alert
                        severity="error"
                        sx={{ mb: 2 }}
                    >
                        {error}
                    </Alert>
                )}

                <Stack
                    direction="row"
                    spacing={1}
                    sx={{ mb: 2 }}
                >
                    <Button
                        variant="outlined"
                        size="small"
                        onClick={selectAll}
                        disabled={busy || permissions.length === 0}
                    >
                        Select All
                    </Button>

                    <Button
                        variant="outlined"
                        size="small"
                        onClick={clearAll}
                        disabled={busy || selected.size === 0}
                    >
                        Clear All
                    </Button>

                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            ml: 1,
                        }}
                    >
                        {selected.size} of {permissions.length} selected
                    </Typography>
                </Stack>

                {busy && permissions.length === 0 ? (
                    <Box
                        sx={{
                            py: 6,
                            display: "flex",
                            justifyContent: "center",
                        }}
                    >
                        <CircularProgress />
                    </Box>
                ) : (
                    <Stack spacing={2}>
                        {groupedPermissions.map(
                            ([moduleName, modulePermissions]) => {
                                const ids = modulePermissions.map(
                                    (permission) => Number(permission.id)
                                );

                                const selectedCount = ids.filter(
                                    (id) => selected.has(id)
                                ).length;

                                const moduleChecked =
                                    ids.length > 0 &&
                                    selectedCount === ids.length;

                                const moduleIndeterminate =
                                    selectedCount > 0 &&
                                    selectedCount < ids.length;

                                return (
                                    <Box
                                        key={moduleName}
                                        sx={{
                                            border: 1,
                                            borderColor: "divider",
                                            borderRadius: 2,
                                            overflow: "hidden",
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                px: 2,
                                                py: 1,
                                                bgcolor: "action.hover",
                                            }}
                                        >
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        checked={
                                                            moduleChecked
                                                        }
                                                        indeterminate={
                                                            moduleIndeterminate
                                                        }
                                                        onChange={() =>
                                                            toggleModule(
                                                                modulePermissions
                                                            )
                                                        }
                                                        disabled={busy}
                                                    />
                                                }
                                                label={
                                                    <Typography
                                                        fontWeight={700}
                                                    >
                                                        {moduleName}
                                                    </Typography>
                                                }
                                            />
                                        </Box>

                                        <Divider />

                                        <Grid
                                            container
                                            spacing={0}
                                            sx={{ p: 1 }}
                                        >
                                            {modulePermissions.map(
                                                (permission) => (
                                                    <Grid
                                                        size={{
                                xs: 12,
                                                            sm: 6,
                                                            md: 4,
                            }}
                                                        key={permission.id}
                                                    >
                                                        <FormControlLabel
                                                            control={
                                                                <Checkbox
                                                                    checked={selected.has(
                                                                        Number(
                                                                            permission.id
                                                                        )
                                                                    )}
                                                                    onChange={() =>
                                                                        togglePermission(
                                                                            permission.id
                                                                        )
                                                                    }
                                                                    disabled={
                                                                        busy
                                                                    }
                                                                />
                                                            }
                                                            label={
                                                                permission.action
                                                                    ? `${permission.action}`
                                                                    : permission.name ||
                                                                      permission.permission_name ||
                                                                      `Permission ${permission.id}`
                                                            }
                                                        />
                                                    </Grid>
                                                )
                                            )}
                                        </Grid>
                                    </Box>
                                );
                            }
                        )}
                    </Stack>
                )}
            </DialogContent>

            <DialogActions>
                <Button
                    onClick={onClose}
                    disabled={saving}
                >
                    Cancel
                </Button>

                <Button
                    variant="contained"
                    onClick={handleSave}
                    disabled={busy || !role}
                    startIcon={
                        saving ? (
                            <CircularProgress
                                size={18}
                                color="inherit"
                            />
                        ) : null
                    }
                >
                    {saving ? "Saving..." : "Save Permissions"}
                </Button>
            </DialogActions>
        </Dialog>
    );
}
