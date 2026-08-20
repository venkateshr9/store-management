import {
  Chip,
  IconButton,
  Box,
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
      headerAlign: "center",
      align: "center",
    },

    {
      field: "supplier_name",
      headerName: "Supplier Name",
      flex: 2,
      minWidth: 180,
      headerAlign: "center",
      align: "left",
    },

    {
      field: "contact_person",
      headerName: "Contact Person",
      flex: 1.5,
      minWidth: 150,
      headerAlign: "center",
      align: "left",
    },

    {
      field: "phone",
      headerName: "Phone",
      flex: 1,
      minWidth: 120,
      headerAlign: "center",
      align: "center",
    },

    {
      field: "email",
      headerName: "Email",
      flex: 1.5,
      minWidth: 180,
      headerAlign: "center",
      align: "left",
    },

    {
      field: "is_active",
      headerName: "Status",
      width: 120,
      headerAlign: "center",
      align: "center",

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
      headerAlign: "center",
      align: "center",
      sortable: false,
      filterable: false,
      disableColumnMenu: true,

      renderCell: (params) => (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 0.5,
            width: "100%",
          }}
        >
          <IconButton
            size="small"
            color="primary"
            onClick={() => onView(params.row)}
          >
            <Visibility fontSize="small" />
          </IconButton>

          <IconButton
            size="small"
            color="warning"
            onClick={() => onEdit(params.row)}
          >
            <Edit fontSize="small" />
          </IconButton>

          <IconButton
            size="small"
            color="error"
            onClick={() => onDelete(params.row)}
          >
            <Delete fontSize="small" />
          </IconButton>
        </Box>
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

        "& .MuiDataGrid-root": {
          border: "none",
        },

        "& .MuiDataGrid-columnHeaders": {
          backgroundColor: "#1F3A5F",
          color: "#FFFFFF",
          borderBottom: "1px solid #D9E1EA",
        },

        "& .MuiDataGrid-columnHeader": {
          backgroundColor: "#1F3A5F",
        },

        "& .MuiDataGrid-columnHeaderTitle": {
          fontWeight: 700,
          color: "#FFFFFF",
          textAlign: "center",
        },

        "& .MuiDataGrid-columnSeparator": {
          color: "#D9E1EA",
        },

        "& .MuiDataGrid-cell": {
          borderRight: "1px solid #D9E1EA",
          borderBottom: "1px solid #D9E1EA",
        },

        "& .MuiDataGrid-row": {
          borderBottom: "1px solid #D9E1EA",
        },

        "& .MuiDataGrid-row:hover": {
          backgroundColor: "#F8FAFC",
        },

        "& .MuiDataGrid-footerContainer": {
          borderTop: "1px solid #D9E1EA",
        },
      }}
    >
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
    </Box>
  );
}
