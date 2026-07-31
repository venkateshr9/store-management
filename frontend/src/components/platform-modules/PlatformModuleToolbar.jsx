import React from "react";

import {
    Box,
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Stack,
    TextField,
    Typography,
} from "@mui/material";

import RefreshIcon from "@mui/icons-material/Refresh";
import AddIcon from "@mui/icons-material/Add";

export default function PlatformModuleToolbar({
    search,
    status,
    onSearchChange,
    onStatusChange,
    onRefresh,
    onAdd,
}) {
    return (
        <Box
            sx={{
                mb: 3,
                p: 2,
                borderRadius: 2,
                backgroundColor: "background.paper",
                boxShadow: 1,
            }}
        >
            <Stack
                direction={{ xs: "column", md: "row" }}
                spacing={2}
                justifyContent="space-between"
                alignItems={{ xs: "stretch", md: "center" }}
            >
                <Typography variant="h5" fontWeight="bold">
                    Platform Modules
                </Typography>

                <Stack
                    direction={{ xs: "column", md: "row" }}
                    spacing={2}
                    alignItems="center"
                >
                    <TextField
                        label="Search"
                        size="small"
                        value={search}
                        onChange={(e) => onSearchChange(e.target.value)}
                        sx={{ minWidth: 250 }}
                    />

                    <FormControl size="small" sx={{ minWidth: 150 }}>
                        <InputLabel>Status</InputLabel>

                        <Select
                            value={status}
                            label="Status"
                            onChange={(e) => onStatusChange(e.target.value)}
                        >
                            <MenuItem value="all">All</MenuItem>
                            <MenuItem value="active">Active</MenuItem>
                            <MenuItem value="inactive">Inactive</MenuItem>
                        </Select>
                    </FormControl>

                    <Button
                        variant="outlined"
                        startIcon={<RefreshIcon />}
                        onClick={onRefresh}
                    >
                        Refresh
                    </Button>

                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={onAdd}
                    >
                        Add Module
                    </Button>
                </Stack>
            </Stack>
        </Box>
    );
}
