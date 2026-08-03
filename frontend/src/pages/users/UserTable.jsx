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

export default function UserTable({
  rows,
  onView,
  onEdit,
  onChangePassword,
  onDelete,
}) {

  const columns = [

    {
      field: "employee_no",
      headerName: "Employee No",
      width: 140,
    },

    {
      field: "username",
      headerName: "Username",
      width: 150,
    },

    {
      field: "full_name",
      headerName: "Full Name",
      flex: 1,
      minWidth: 200,
    },

    {
      field: "email",
      headerName: "Email",
      width: 220,
    },

    {
      field: "mobile",
      headerName: "Mobile",
      width: 140,
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
      width: 200,
      sortable: false,
	
	renderCell: (params) => (

  	   <Stack
    	     direction="row"
             spacing={1}
           >

           <IconButton
             color="primary"
             onClick={() => onView(params.row)}
           >
            <VisibilityIcon />
           </IconButton>

           <IconButton
             color="warning"
             onClick={() => onEdit(params.row)}
           >
             <EditIcon />
           </IconButton>

           <IconButton
             color="secondary"
             onClick={() => onChangePassword(params.row)}
           >
          <KeyIcon />
         </IconButton>

         <IconButton
           color="error"
           onClick={() => onDelete(params.row)}
         >
        <DeleteIcon />
        </IconButton>

       </Stack>
     ),
    },

  ];

  return (
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
    />
  );
}
