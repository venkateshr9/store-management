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

export default function SupplierTable({
  rows,
  onView,
  onEdit,
  onDelete,
}) {
  const columns = [
    {
      field: "supplier_code",
      headerName: "Code",
      flex: 1,
      minWidth: 120,
    },

    {
      field: "supplier_name",
      headerName: "Supplier Name",
      flex: 2,
      minWidth: 180,
    },

    {
      field: "contact_person",
      headerName: "Contact Person",
      flex: 1.5,
      minWidth: 150,
    },

    {
      field: "phone",
      headerName: "Phone",
      flex: 1,
      minWidth: 120,
    },

    {
      field: "email",
      headerName: "Email",
      flex: 1.5,
      minWidth: 180,
    },

    {
      field: "is_active",
      headerName: "Status",
      width: 120,

      renderCell: (params) => (
        <Chip
          label={params.value ? "Active" : "Inactive"}
          color={params.value ? "success" : "error"}
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
            onClick={() => onView(params.row)}
          >
            <Visibility />
          </IconButton>

          <IconButton
            color="warning"
            onClick={() => onEdit(params.row)}
          >
            <Edit />
          </IconButton>

          <IconButton
            color="error"
            onClick={() => onDelete(params.row)}
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
