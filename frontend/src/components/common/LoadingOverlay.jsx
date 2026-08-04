import React from "react";
import {
    Backdrop,
    CircularProgress,
    Typography,
    Box,
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
           <Box
    		sx={{
        		display: "flex",
        		flexDirection: "column",
        		alignItems: "center",
        		gap: 2,
    		}}
	>     
	    	<CircularProgress color="inherit" />

                <Typography variant="body1">
                    {message}
                </Typography>
            </Box>
        </Backdrop>
    );
}
