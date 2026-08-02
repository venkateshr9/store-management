import {
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
        },

        {
            field: "action",
            headerName: "Action",
            flex: 1,
        },

        {
            field: "description",
            headerName: "Description",
            flex: 2,
        },

        {
            field: "code",
            headerName: "Permission Code",
            flex: 2,
        },

        {
            field: "actions",
            headerName: "Actions",
            width: 150,

            sortable: false,

            renderCell: (params) => (

                <Stack
                    direction="row"
                    spacing={1}
                >

                    <IconButton
                        color="primary"
                        onClick={() =>
                            onView(params.row)
                        }
                    >
                        <VisibilityIcon />
                    </IconButton>

                    <IconButton
                        color="warning"
                        onClick={() =>
                            onEdit(params.row)
                        }
                    >
                        <EditIcon />
                    </IconButton>

                    <IconButton
                        color="error"
                        onClick={() =>
                            onDelete(params.row)
                        }
                    >
                        <DeleteIcon />
                    </IconButton>

                </Stack>

            ),

        },

    ];

    return (

        <DataGrid

            autoHeight

            loading={loading}

            rows={permissions}

            columns={columns}

            pageSizeOptions={[10, 25, 50]}

            initialState={{
                pagination: {
                    paginationModel: {
                        pageSize: 10,
                    },
                },
            }}

            disableRowSelectionOnClick

        />

    );

}
