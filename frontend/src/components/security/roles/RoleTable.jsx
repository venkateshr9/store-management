import React from "react";

import { Box, IconButton, Tooltip } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SecurityIcon from "@mui/icons-material/Security";

import StatusChip from "../../common/StatusChip";

export default function RoleTable({
    rows = [],
    loading = false,
    onView,
    onEdit,
    onDelete,
    onManagePermissions,
}) {
    const columns = [
        {
            field: "role_code",
            headerName: "Role Code",
            width: 170,
            headerAlign: "center",
        },

        {
            field: "role_name",
            headerName: "Role Name",
            flex: 1,
            minWidth: 220,
            headerAlign: "center",
        },

        {
            field: "description",
            headerName: "Description",
            flex: 1,
            minWidth: 260,
            headerAlign: "center",
        },

        {
            field: "is_system",
            headerName: "System",
            width: 100,
            headerAlign: "center",
            align: "center",
            renderCell: (params) =>
                params.row.is_system ? "Yes" : "No",
        },

        {
            field: "status",
            headerName: "Status",
            width: 120,
            headerAlign: "center",
            align: "center",
            renderCell: (params) => (
                <StatusChip status={params.row.status} />
            ),
        },

        {
            field: "actions",
            headerName: "Actions",
            width: 210,
            sortable: false,
            filterable: false,
            disableColumnMenu: true,
            headerAlign: "center",
            align: "center",

            renderCell: (params) => (
                <Box
                    sx={{
                        display: "flex",
                        gap: 0.5,
                        alignItems: "center",
                        justifyContent: "center",
                        width: "100%",
                    }}
                >
                    <Tooltip title="View Role">
                        <IconButton
                            size="small"
                            color="primary"
                            onClick={() => onView(params.row)}
                        >
                            <VisibilityIcon fontSize="small" />
                        </IconButton>
                    </Tooltip>

                    <Tooltip title="Manage Permissions">
                        <IconButton
                            size="small"
                            color="secondary"
                            onClick={() =>
                                onManagePermissions(params.row)
                            }
                        >
                            <SecurityIcon fontSize="small" />
                        </IconButton>
                    </Tooltip>

                    <Tooltip title="Edit Role">
                        <IconButton
                            size="small"
                            color="warning"
                            onClick={() => onEdit(params.row)}
                        >
                            <EditIcon fontSize="small" />
                        </IconButton>
                    </Tooltip>

                    <Tooltip title="Delete Role">
                        <IconButton
                            size="small"
                            color="error"
                            onClick={() => onDelete(params.row)}
                        >
                            <DeleteIcon fontSize="small" />
                        </IconButton>
                    </Tooltip>
                </Box>
            ),
        },
    ];

    return (
        <Box
            sx={{
                height: 650,
                width: "100%",
                border: "1px solid #D9E1EA",
                borderRadius: 2,
                overflow: "hidden",
                backgroundColor: "#FFFFFF",

                "& .MuiDataGrid-root": {
                    border: "none",
                },

                "& .MuiDataGrid-columnHeaders": {
                    backgroundColor: "#1F3A5F",
                    color: "#FFFFFF",
                    fontWeight: 700,
                    borderBottom: "1px solid #D9E1EA",
                },

                "& .MuiDataGrid-columnHeader": {
                    backgroundColor: "#1F3A5F",
                    color: "#FFFFFF",
                    fontWeight: 700,
                    borderRight: "1px solid #D9E1EA",
                },

                "& .MuiDataGrid-columnHeaderTitle": {
                    fontWeight: 700,
                    color: "#FFFFFF",
                },

                "& .MuiDataGrid-cell": {
                    borderRight: "1px solid #D9E1EA",
                    borderBottom: "1px solid #D9E1EA",
                },

                "& .MuiDataGrid-row": {
                    borderBottom: "1px solid #D9E1EA",
                },

                "& .MuiDataGrid-footerContainer": {
                    borderTop: "1px solid #D9E1EA",
                },

                "& .MuiDataGrid-columnSeparator": {
                    color: "#D9E1EA",
                },
            }}
        >
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
