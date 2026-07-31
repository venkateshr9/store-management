import React from "react";

import {
    Box,
    Button,
    FormControl,
    InputAdornment,
    InputLabel,
    MenuItem,
    Select,
    Stack,
    TextField,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import RefreshIcon from "@mui/icons-material/Refresh";
import AddIcon from "@mui/icons-material/Add";

export default function PlatformModuleToolbar({
    search = "",
    status = "all",
    onSearchChange,
    onStatusChange,
    onRefresh,
    onAdd,
}) {
    return (
        <Box
            sx={{
                p: 2,
                mb: 3,
                borderRadius: 2,
                bgcolor: "background.paper",
                boxShadow: 1,
            }}
        >
            <Stack
                direction={{ xs: "column", md: "row" }}
                spacing={2}
                alignItems="center"
                justifyContent="space-between"
            >
                <Stack
                    direction={{ xs: "column", md: "row" }}
                    spacing={2}
                    sx={{ flexGrow: 1 }}
                >
                    <TextField
                        fullWidth
                        size="small"
                        label="Search Modules"
                        value={search}
                        onChange={(e) => onSearchChange(e.target.value)}
                        placeholder="Search by code or module name"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                        }}
                    />

                    <FormControl
                        size="small"
                        sx={{ minWidth: 180 }}
                    >
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

                <Stack
                    direction="row"
                    spacing={2}
                >
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
