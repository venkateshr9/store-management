import {
  Chip,
  IconButton,
  Stack,
} from "@mui/material";

import {
  DataGrid,
} from "@mui/x-data-grid";

import {
  Visibility,
  Edit,
  Delete,
} from "@mui/icons-material";

export default function DepartmentTable({
  rows,
  onView,
  onEdit,
  onDelete,
}) {
  const columns = [
    {
      field: "department_code",
      headerName: "Code",
      flex: 1,
      headerAlign: "center",
    },

    {
      field: "department_name",
      headerName: "Department Name",
      flex: 2,
      headerAlign: "center",
    },

    {
      field: "description",
      headerName: "Description",
      flex: 2,
      headerAlign: "center",
    },

    {
      field: "is_active",
      headerName: "Status",
      width: 120,
      headerAlign: "center",
      align: "center",

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
      headerAlign: "center",
      align: "center",
      sortable: false,
      filterable: false,
      disableColumnMenu: true,

      renderCell: (params) => (
        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          justifyContent="center"
          sx={{ width: "100%" }}
        >
          <IconButton
            size="small"
            color="primary"
            onClick={() =>
              onView(params.row)
            }
          >
            <Visibility fontSize="small" />
          </IconButton>

          <IconButton
            size="small"
            color="warning"
            onClick={() =>
              onEdit(params.row)
            }
          >
            <Edit fontSize="small" />
          </IconButton>

          <IconButton
            size="small"
            color="error"
            onClick={() =>
              onDelete(params.row)
            }
          >
            <Delete fontSize="small" />
          </IconButton>
        </Stack>
      ),
    },
  ];

  return (
    <div
      style={{
        width: "100%",
        border: "1px solid #D9E1EA",
        borderRadius: "8px",
        overflow: "hidden",
        backgroundColor: "#FFFFFF",
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

        sx={{
          border: "none",

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
      />
    </div>
  );
}
