import React, { useEffect, useState } from "react";

import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    FormControlLabel,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    Stack,
    Switch,
    TextField,
} from "@mui/material";

const defaultForm = {
    module_code: "",
    module_name: "",
    display_name: "",
    module_type: "MASTER",
    menu_group: "",
    table_name: "",
    api_prefix: "",
    route_path: "",
    icon: "",
    menu_order: 1,
    description: "",
    is_active: true,
};

export default function PlatformModuleDialog({
    open,
    mode = "create",
    module = null,
    loading = false,
    onClose,
    onSave,
}) {
    const [form, setForm] = useState(defaultForm);

    useEffect(() => {
        if (module) {
            setForm({
                ...defaultForm,
                ...module,
            });
        } else {
            setForm(defaultForm);
        }
    }, [module, open]);

    const handleChange = (event) => {
        const { name, value, checked, type } = event.target;

        setForm((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = () => {
        onSave(form);
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">

            <DialogTitle>
                {mode === "create"
                    ? "Create Platform Module"
                    : "Edit Platform Module"}
            </DialogTitle>

            <DialogContent dividers>

                <Grid container spacing={2} sx={{ mt: 1 }}>

                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            required
                            name="module_code"
                            label="Module Code"
                            value={form.module_code}
                            onChange={handleChange}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            required
                            name="module_name"
                            label="Module Name"
                            value={form.module_name}
                            onChange={handleChange}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            name="display_name"
                            label="Display Name"
                            value={form.display_name}
                            onChange={handleChange}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <FormControl fullWidth>
                            <InputLabel>Module Type</InputLabel>

                            <Select
                                name="module_type"
                                value={form.module_type}
                                label="Module Type"
                                onChange={handleChange}
                            >
                                <MenuItem value="MASTER">Master</MenuItem>
                                <MenuItem value="TRANSACTION">Transaction</MenuItem>
                                <MenuItem value="REPORT">Report</MenuItem>
                                <MenuItem value="SYSTEM">System</MenuItem>
                            </Select>

                        </FormControl>
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

                    <Grid item xs={12}>
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={form.is_active}
                                    name="is_active"
                                    onChange={handleChange}
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
