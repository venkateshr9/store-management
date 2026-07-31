import React, { useEffect, useState } from "react";

import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControlLabel,
    Grid,
    Stack,
    Switch,
    TextField,
} from "@mui/material";

const defaultForm = {
    role_code: "",
    role_name: "",
    description: "",
    is_system: false,
    status: "ACTIVE",
};

export default function RoleDialog({
    open,
    mode = "create",
    role = null,
    loading = false,
    onClose,
    onSave,
}) {

    const [form, setForm] = useState(defaultForm);

    useEffect(() => {

        if (role) {
            setForm({
                ...defaultForm,
                ...role,
            });
        } else {
            setForm(defaultForm);
        }

    }, [role, open]);

    const handleChange = (event) => {

        const { name, value, checked, type } = event.target;

        setForm((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));

    };

    const handleSubmit = () => {

        if (!form.role_code.trim()) {
            alert("Role Code is required.");
            return;
        }

        if (!form.role_name.trim()) {
            alert("Role Name is required.");
            return;
        }

        onSave(form);

    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="md"
        >

            <DialogTitle>
                {mode === "create"
                    ? "Create Role"
                    : "Edit Role"}
            </DialogTitle>

            <DialogContent dividers>

                <Grid container spacing={2} sx={{ mt: 1 }}>

                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            required
                            name="role_code"
                            label="Role Code"
                            value={form.role_code}
                            onChange={handleChange}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            required
                            name="role_name"
                            label="Role Name"
                            value={form.role_name}
                            onChange={handleChange}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            multiline
                            rows={3}
                            name="description"
                            label="Description"
                            value={form.description}
                            onChange={handleChange}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={form.is_system}
                                    name="is_system"
                                    onChange={handleChange}
                                />
                            }
                            label="System Role"
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={form.status === "ACTIVE"}
                                    onChange={(e) =>
                                        setForm((prev) => ({
                                            ...prev,
                                            status: e.target.checked
                                                ? "ACTIVE"
                                                : "INACTIVE",
                                        }))
                                    }
                                />
                            }
                            label="Active"
                        />
                    </Grid>

                </Grid>

            </DialogContent>

            <DialogActions>

                <Stack direction="row" spacing={2}>

                    <Button
                        onClick={onClose}
                        disabled={loading}
                    >
                        Cancel
                    </Button>

                    <Button
                        variant="contained"
                        onClick={handleSubmit}
                        disabled={loading}
                    >
                        {mode === "create"
                            ? "Create"
                            : "Update"}
                    </Button>

                </Stack>

            </DialogActions>

        </Dialog>
    );
}
