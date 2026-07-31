import React from "react";

import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Stack,
    Typography,
} from "@mui/material";

export default function RoleDeleteDialog({
    open,
    loading = false,
    role = null,
    onClose,
    onConfirm,
}) {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="sm"
            fullWidth
        >
            <DialogTitle>
                Delete Role
            </DialogTitle>

            <DialogContent>

                <Typography>
                    Are you sure you want to delete the role
                    <strong> {role?.role_name}</strong>?
                </Typography>

                {role?.is_system && (
                    <Typography
                        color="error"
                        sx={{ mt: 2 }}
                    >
                        This is a system role. Deletion may not be allowed.
                    </Typography>
                )}

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
                        color="error"
                        onClick={onConfirm}
                        disabled={loading}
                    >
                        Delete
                    </Button>

                </Stack>

            </DialogActions>

        </Dialog>
    );
}
