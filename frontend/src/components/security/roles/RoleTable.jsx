import React from "react";

import { Box, IconButton } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import StatusChip from "../../common/StatusChip";

export default function RoleTable({
    rows = [],
    loading = false,
    onView,
    onEdit,
    onDelete,
}) {

    const columns = [

        {
            field: "role_code",
            headerName: "Role Code",
            width: 170,
        },

        {
            field: "role_name",
            headerName: "Role Name",
            flex: 1,
            minWidth: 220,
        },

        {
            field: "description",
            headerName: "Description",
            flex: 1,
            minWidth: 260,
        },

        {
            field: "is_system",
            headerName: "System",
            width: 120,
            renderCell: (params) =>
                params.row.is_system ? "Yes" : "No",
        },

        {
            field: "status",
            headerName: "Status",
            width: 120,
            renderCell: (params) => (
                <StatusChip status={params.row.status} />
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
