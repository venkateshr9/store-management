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

export default function PermissionToolbar({
    search,
    setSearch,
    module,
    setModule,
    modules = [],
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
                    label="Search"
                    size="small"
                    value={search}
                    onChange={(e) =>
                        setSearch(e.target.value)
                    }
                    sx={{
                        minWidth: 250,
                    }}
                />

                <FormControl
                    size="small"
                    sx={{
                        minWidth: 150,
                    }}
                >
                    <InputLabel>Module</InputLabel>

                    <Select
                        value={module}
                        label="Module"
                        onChange={(e) =>
                            setModule(e.target.value)
                        }
                    >
                        <MenuItem value="">
                            All
                        </MenuItem>

                        {modules.map((m) => (
                            <MenuItem
                                key={m}
                                value={m}
                            >
                                {m}
                            </MenuItem>
                        ))}
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
                    startIcon={<AddIcon fontSize="small" />}
                    onClick={onAdd}
                >
                    Add Permission
                </Button>
            </Stack>
        </Box>
    );
}
