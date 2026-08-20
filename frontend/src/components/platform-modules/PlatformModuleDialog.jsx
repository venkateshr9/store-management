import React, { useEffect, useState } from "react";

import Grid from "@mui/material/Grid";

import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    FormControlLabel,
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

    description: "",

    table_name: "",
    route_path: "",
    api_prefix: "",

    menu_group: "",
    menu_icon: "",
    menu_order: 1,

    enable_create: true,
    enable_edit: true,
    enable_delete: true,
    enable_view: true,

    enable_export: false,
    enable_import: false,
    enable_print: false,

    enable_workflow: false,
    enable_attachment: false,
    enable_comments: false,

    enable_audit: true,
    enable_versioning: true,
    enable_soft_delete: true,

    status: "ACTIVE",
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
            module_code: module.module_code,
            module_name: module.module_name,
            display_name: module.display_name,
            module_type: module.module_type,

            description: module.description ?? "",

            table_name: module.table_name,
            route_path: module.route_path ?? "",
            api_prefix: module.api_prefix ?? "",

            menu_group: module.menu_group ?? "",
            menu_icon: module.menu_icon ?? "",
            menu_order: module.menu_order ?? 0,

            enable_create: module.enable_create,
            enable_edit: module.enable_edit,
            enable_delete: module.enable_delete,
            enable_view: module.enable_view,

            enable_export: module.enable_export,
            enable_import: module.enable_import,
            enable_print: module.enable_print,

            enable_workflow: module.enable_workflow,
            enable_attachment: module.enable_attachment,
            enable_comments: module.enable_comments,

            enable_audit: module.enable_audit,
            enable_versioning: module.enable_versioning,
            enable_soft_delete: module.enable_soft_delete,

            status: module.status,
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
    	const {
        	id,
        	created_at,
        	created_by,
        	updated_at,
        	updated_by,
        	deleted_at,
        	deleted_by,
        	...payload
    	} = form;


    	onSave(payload);
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

                    <Grid size={{ xs:12, md:6 }}>
                        <TextField
                            fullWidth
                            required
                            name="module_code"
                            label="Module Code"
                            value={form.module_code}
                            onChange={handleChange}
                        />
                    </Grid>

                    <Grid size={{ xs:12, md:6 }}>
	    		<TextField
                            fullWidth
                            required
                            name="module_name"
                            label="Module Name"
                            value={form.module_name}
                            onChange={handleChange}
                        />
                    </Grid>

                    <Grid size={{ xs:12, md:6 }}>   
	    		<TextField
                            fullWidth
                            name="display_name"
                            label="Display Name"
                            value={form.display_name}
                            onChange={handleChange}
                        />
                    </Grid>

                    <Grid size={{ xs:12, md:6 }}>
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

                    <Grid size={12}>
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

		    <Grid size={12}>
    			<FormControlLabel
        		    control={
            			<Switch
                		    checked={form.status === "ACTIVE"}
                		    onChange={(e) =>
                    			setForm({
                        		    ...form,
                                            status: e.target.checked
                                                ? "ACTIVE"
                                                : "INACTIVE",
                                         })
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
