import {
  IconButton,
  Stack,
  Chip,
} from "@mui/material";

import {
  DataGrid,
} from "@mui/x-data-grid";

import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import KeyIcon from "@mui/icons-material/Key";
import DeleteIcon from "@mui/icons-material/Delete";
import SecurityIcon from "@mui/icons-material/Security";

export default function UserTable({
  rows,
  onView,
  onEdit,
  onChangePassword,
  onDelete,
  onManageRoles,
  canUpdate,
  canDelete,
}) {
  const columns = [
    {
      field: "employee_no",
      headerName: "Employee No",
      width: 140,
      headerAlign: "center",
    },

    {
      field: "username",
      headerName: "Username",
      width: 150,
      headerAlign: "center",
    },

    {
      field: "full_name",
      headerName: "Full Name",
      flex: 1,
      minWidth: 200,
      headerAlign: "center",
    },

    {
      field: "email",
      headerName: "Email",
      width: 220,
      headerAlign: "center",
    },

    {
      field: "mobile",
      headerName: "Mobile",
      width: 140,
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
      width: canUpdate && canDelete
        ? 250
        : canUpdate
          ? 200
          : 130,
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
            <VisibilityIcon fontSize="small" />
          </IconButton>

          {canUpdate && (
            <>
              <IconButton
                size="small"
                color="warning"
                onClick={() =>
                  onEdit(params.row)
                }
              >
                <EditIcon fontSize="small" />
              </IconButton>

              <IconButton
                size="small"
                color="secondary"
                onClick={() =>
                  onChangePassword(params.row)
                }
              >
                <KeyIcon fontSize="small" />
              </IconButton>

              <IconButton
                size="small"
                color="primary"
                onClick={() =>
                  onManageRoles(params.row)
                }
                title="Manage Roles"
              >
                <SecurityIcon fontSize="small" />
              </IconButton>
            </>
          )}

          {canDelete && (
            <IconButton
              size="small"
              color="error"
              onClick={() =>
                onDelete(params.row)
              }
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          )}
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
        pageSizeOptions={[10, 25, 50]}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        autoHeight
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
