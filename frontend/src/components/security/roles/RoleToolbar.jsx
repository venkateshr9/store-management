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
} from "@mui/material";

import RefreshIcon from "@mui/icons-material/Refresh";
import AddIcon from "@mui/icons-material/Add";

export default function RoleToolbar({
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
                sx={{
                    alignItems: {
                        xs: "stretch",
                        md: "center",
                    },
                    justifyContent: "flex-start",
                }}
            >
                <TextField
                    size="small"
                    label="Search"
                    placeholder="Role Code / Role Name"
                    value={search}
                    onChange={(e) => onSearchChange(e.target.value)}
                    sx={{ minWidth: 300 }}
                />

                <FormControl
                    size="small"
                    sx={{ minWidth: 180 }}
                >
                    <InputLabel>Status</InputLabel>

                    <Select
                        value={status}
                        label="Status"
                        onChange={(e) =>
                            onStatusChange(e.target.value)
                        }
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
                    Add Role
                </Button>
            </Stack>
        </Box>
    );
}
