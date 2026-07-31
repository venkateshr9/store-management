import React from "react";

import { Box, IconButton } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import StatusChip from "../common/StatusChip";

export default function PlatformModuleTable({
    rows = [],
    loading = false,
    onView,
    onEdit,
    onDelete,
}) {

    const columns = [
        {
            field: "module_code",
            headerName: "Code",
            width: 140,
        },
        {
            field: "module_name",
            headerName: "Module Name",
            flex: 1,
            minWidth: 220,
        },
        {
            field: "display_name",
            headerName: "Display Name",
            flex: 1,
            minWidth: 220,
        },
        {
            field: "module_type",
            headerName: "Type",
            width: 140,
        },
        {
            field: "menu_group",
            headerName: "Menu Group",
            width: 180,
        },
        {
            field: "menu_order",
            headerName: "Order",
            width: 90,
            type: "number",
        },
        {
            field: "is_active",
            headerName: "Status",
            width: 120,
            renderCell: (params) => (
                <StatusChip
                    status={params.row.status}
                />
            ),
        },
        {
            field: "actions",
            headerName: "Actions",
            width: 160,
            sortable: false,
            filterable: false,
            disableColumnMenu: true,
            renderCell: (params) => (
                <>
                    <IconButton
                        size="small"
                        color="primary"
                        onClick={() => onView(params.row)}
                    >
                        <VisibilityIcon fontSize="small" />
                    </IconButton>

                    <IconButton
                        size="small"
                        color="warning"
                        onClick={() => onEdit(params.row)}
                    >
                        <EditIcon fontSize="small" />
                    </IconButton>

                    <IconButton
                        size="small"
                        color="error"
                        onClick={() => onDelete(params.row)}
                    >
                        <DeleteIcon fontSize="small" />
                    </IconButton>
                </>
            ),
        },
    ];

    return (
        <Box sx={{ height: 650, width: "100%" }}>
            <DataGrid
                rows={rows}
                columns={columns}
                loading={loading}
                getRowId={(row) => row.id}
                pageSizeOptions={[10, 25, 50, 100]}
                initialState={{
                    pagination: {
                        paginationModel: {
                            page: 0,
                            pageSize: 10,
                        },
                    },
                }}
                disableRowSelectionOnClick
            />
        </Box>
    );
}
