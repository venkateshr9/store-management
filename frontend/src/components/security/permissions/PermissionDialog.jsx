import React, { useEffect, useState } from "react";

import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    Stack,
    TextField,
} from "@mui/material";

const defaultForm = {
    module: "",
    action: "",
    description: "",
};

export default function PermissionDialog({
    open,
    mode = "create",
    permission = null,
    loading = false,
    onClose,
    onSave,
}) {

    const [form, setForm] = useState(defaultForm);

    useEffect(() => {

	  if (permission) {
    	     setForm({
        	module: permission.module,
        	action: permission.action,
        	description: permission.description || "",
    	     });
          } else {
              setForm(defaultForm);
          }

       /* if (permission) {
            setForm({
                ...defaultForm,
                ...permission,
            });
        } else {
            setForm(defaultForm);
        } */

    }, [permission, open]);

    const handleChange = (event) => {

        const { name, value } = event.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));

    };

    const handleSubmit = () => {

        if (!form.module.trim()) {
            alert("Module is required.");
            return;
        }

        if (!form.action.trim()) {
            alert("Action is required.");
            return;
        }

        /* onSave(form); */

	onSave({
    		module: form.module,
    		action: form.action,
    		description: form.description,
	});

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
                    ? "Create Permission"
                    : "Edit Permission"}
            </DialogTitle>

            <DialogContent dividers>

                <Grid container spacing={2} sx={{ mt: 1 }}>

                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            required
                            label="Module"
                            name="module"
                            value={form.module}
                            onChange={handleChange}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            required
                            label="Action"
                            name="action"
                            value={form.action}
                            onChange={handleChange}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            multiline
                            rows={3}
                            label="Description"
                            name="description"
                            value={form.description}
                            onChange={handleChange}
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
