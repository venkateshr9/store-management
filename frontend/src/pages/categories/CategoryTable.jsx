import {
  Chip,
  IconButton,
} from "@mui/material";

import {
  DataGrid,
} from "@mui/x-data-grid";

import {
  Visibility,
  Edit,
  Delete,
} from "@mui/icons-material";

export default function CategoryTable({

  rows,

  onView,

  onEdit,

  onDelete,

}) {

  const columns = [

    {
      field: "category_code",
      headerName: "Code",
      flex: 1,
    },

    {
      field: "category_name",
      headerName: "Category Name",
      flex: 2,
    },

    {
      field: "description",
      headerName: "Description",
      flex: 2,
    },

    {
      field: "is_active",
      headerName: "Status",
      width: 120,

      renderCell: (params) => (

        <Chip
          label={
            params.value
              ? "Active"
              : "Inactive"
          }

          color={
            params.value
              ? "success"
              : "error"
          }

          size="small"
        />

      ),

    },

    {
      field: "actions",
      headerName: "Actions",
      width: 150,

      sortable: false,

      renderCell: (params) => (

        <>

          <IconButton
            color="primary"
            onClick={() =>
              onView(params.row)
            }
          >
            <Visibility />
          </IconButton>

          <IconButton
            color="warning"
            onClick={() =>
              onEdit(params.row)
            }
          >
            <Edit />
          </IconButton>

          <IconButton
            color="error"
            onClick={() =>
              onDelete(params.row)
            }
          >
            <Delete />
          </IconButton>

        </>

      ),

    },

  ];

  return (

    <DataGrid

      rows={rows}

      columns={columns}

      autoHeight

      pageSizeOptions={[
        10,
        25,
        50,
      ]}

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
