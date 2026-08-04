import React from "react";

import {
    Stack,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Button,
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
        <Stack
 		direction={{ xs: "column", md: "row" }}
    		spacing={2}
    		sx={{
        		justifyContent: "space-between",
        		alignItems: {
            			xs: "stretch",
           	 		md: "center",
        		},
    		}}
	>

	    <Stack
                direction={{ xs: "column", md: "row" }}
                spacing={2}
                sx={{ flex: 1 }}
            >
                <TextField
                    size="small"
                    label="Search"
                    placeholder="Role Code / Role Name"
                    value={search}
                    onChange={(e) => onSearchChange(e.target.value)}
                    sx={{ minWidth: 300 }}
                />

                <FormControl size="small" sx={{ minWidth: 180 }}>
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
            </Stack>

            <Stack direction="row" spacing={2}>
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
        </Stack>
    );
}
