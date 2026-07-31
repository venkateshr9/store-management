import React from "react";
import {
    Backdrop,
    CircularProgress,
    Typography,
    Stack,
} from "@mui/material";

export default function LoadingOverlay({
    open = false,
    message = "Loading..."
}) {
    return (
        <Backdrop
            open={open}
            sx={{
                color: "#fff",
                zIndex: (theme) => theme.zIndex.drawer + 999,
            }}
        >
            <Stack
                spacing={2}
                alignItems="center"
            >
                <CircularProgress color="inherit" />

                <Typography variant="body1">
                    {message}
                </Typography>
            </Stack>
        </Backdrop>
    );
}
