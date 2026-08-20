import {
    Box,
    IconButton,
    Stack,
} from "@mui/material";

import {
    DataGrid,
} from "@mui/x-data-grid";

import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function PermissionTable({
    permissions,
    loading,
    onView,
    onEdit,
    onDelete,
}) {

    const columns = [
        {
            field: "module",
            headerName: "Module",
            flex: 1,
            minWidth: 180,
            headerAlign: "center",
        },

        {
            field: "action",
            headerName: "Action",
            flex: 1,
            minWidth: 150,
            headerAlign: "center",
        },

        {
            field: "description",
            headerName: "Description",
            flex: 2,
            minWidth: 250,
            headerAlign: "center",
        },

        {
            field: "code",
            headerName: "Permission Code",
            flex: 2,
            minWidth: 230,
            headerAlign: "center",
        },

        {
            field: "actions",
            headerName: "Actions",
            width: 150,
            sortable: false,
            filterable: false,
            disableColumnMenu: true,
            headerAlign: "center",
            align: "center",

            renderCell: (params) => (
                <Stack
                    direction="row"
                    spacing={0.5}
                    alignItems="center"
                    justifyContent="center"
                >
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
                </Stack>
            ),
        },
    ];

    return (
        <Box
            sx={{
                width: "100%",
                border: "1px solid #D9E1EA",
                borderRadius: 2,
                overflow: "hidden",
                backgroundColor: "#FFFFFF",
            }}
        >
            <DataGrid
                autoHeight
                loading={loading}
                rows={permissions}
                columns={columns}
                pageSizeOptions={[10, 25, 50]}
                initialState={{
                    pagination: {
                        paginationModel: {
                            page: 0,
                            pageSize: 10,
                        },
                    },
                }}
                disableRowSelectionOnClick

                sx={{
                    border: 0,

                    "& .MuiDataGrid-columnHeaders": {
                        backgroundColor: "#1F3A5F",
                        color: "#FFFFFF",
                        fontWeight: 700,
                        minHeight: "46px !important",
                        maxHeight: "46px !important",
                    },

                    "& .MuiDataGrid-columnHeader": {
                        backgroundColor: "#1F3A5F",
                        borderRight: "1px solid rgba(255,255,255,0.18)",
                    },

                    "& .MuiDataGrid-columnHeaderTitle": {
                        fontWeight: 700,
                        color: "#FFFFFF",
                        textAlign: "center",
                    },

                    "& .MuiDataGrid-columnHeader:focus, & .MuiDataGrid-columnHeader:focus-within": {
                        outline: "none",
                    },

                    "& .MuiDataGrid-cell": {
                        borderRight: "1px solid #E2E8F0",
                        borderBottom: "1px solid #E2E8F0",
                        fontSize: "0.875rem",
                        color: "#27364B",
                    },

                    "& .MuiDataGrid-row": {
                        borderBottom: "1px solid #E2E8F0",
                    },

                    "& .MuiDataGrid-row:hover": {
                        backgroundColor: "#F8FAFC",
                    },

                    "& .MuiDataGrid-cell:focus, & .MuiDataGrid-cell:focus-within": {
                        outline: "none",
                    },

                    "& .MuiDataGrid-footerContainer": {
                        borderTop: "1px solid #D9E1EA",
                        minHeight: 52,
                    },

                    "& .MuiDataGrid-virtualScroller": {
                        overflowX: "auto",
                    },
                }}
            />
        </Box>
    );
}
