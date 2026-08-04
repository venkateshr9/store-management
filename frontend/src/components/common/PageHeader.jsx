import React from "react";
import { Box, Stack, Typography } from "@mui/material";

export default function PageHeader({
    title,
    subtitle,
    action = null,
}) {
    return (
        <Box sx={{ mb: 3 }}>
	    	<Stack
    			direction="row"
    			sx={{
        			justifyContent: "space-between",
        			alignItems: "center",
    			}}
		>
	    	<Box>
                    <Typography
                        variant="h4"
                        fontWeight={700}
                    >
                        {title}
                    </Typography>

                    {subtitle && (
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ mt: 0.5 }}
                        >
                            {subtitle}
                        </Typography>
                    )}
                </Box>

                {action}
            </Stack>
        </Box>
    );
}
