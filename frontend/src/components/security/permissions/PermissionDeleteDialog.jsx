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

export default function PermissionDeleteDialog({
    open,
    loading = false,
    permission = null,
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
                Delete Permission
            </DialogTitle>

            <DialogContent>

                <Typography>
                    Are you sure you want to delete the permission
                    <strong>
                        {" "}
                        {permission?.module}:{permission?.action}
                    </strong>
                    ?
                </Typography>

                <Typography
                    color="error"
                    sx={{ mt: 2 }}
                >
                    This action cannot be undone.
                </Typography>

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
