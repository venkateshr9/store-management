import { useEffect, useState } from "react";

import {
  Paper,
  Typography,
} from "@mui/material";

import UserToolbar from "./UserToolbar";
import UserTable from "./UserTable";
import UserDialog from "./UserDialog";
import UserViewDialog from "./UserViewDialog";

import {
  getUsers,
  deleteUser,
} from "../../services/userService";

export default function UserList() {

  const [users, setUsers] = useState([]);

  const [selected, setSelected] = useState(null);

  const [dialogOpen, setDialogOpen] = useState(false);

  const [viewOpen, setViewOpen] = useState(false);

  const [search, setSearch] = useState("");

  const loadUsers = async () => {
    const data = await getUsers();
    setUsers(data);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleAdd = () => {
    setSelected(null);
    setDialogOpen(true);
  };

  const handleEdit = (row) => {
    setSelected(row);
    setDialogOpen(true);
  };

  const handleView = (row) => {
    setSelected(row);
    setViewOpen(true);
  };

  const handleDelete = async (row) => {

    if (!window.confirm("Delete this user?"))
      return;

    await deleteUser(row.id);

    loadUsers();
  };

  const filteredUsers = users.filter((u) =>

    u.employee_no
        ?.toLowerCase()
        .includes(search.toLowerCase())

    ||

    u.username
        ?.toLowerCase()
        .includes(search.toLowerCase())

    ||

    u.full_name
        ?.toLowerCase()
        .includes(search.toLowerCase())

    ||

    u.email
        ?.toLowerCase()
        .includes(search.toLowerCase())

	);

  return (
    <>

      <Typography
        variant="h3"
        fontWeight={700}
        gutterBottom
      >
        User Management
      </Typography>

      <Typography
        color="text.secondary"
        sx={{ mb:3 }}
      >
        Manage system users
      </Typography>

      <Paper sx={{ p:3 }}>

	<UserToolbar
  	    search={search}
    	    setSearch={setSearch}
            onRefresh={loadUsers}
            onAdd={handleAdd}
         />

	 <UserTable
             rows={filteredUsers}
             onView={handleView}
             onEdit={handleEdit}
             onDelete={handleDelete}
	  />
      </Paper>

      <UserDialog
  	open={dialogOpen}
  	user={selected}
  	onClose={() => setDialogOpen(false)}
  	onSaved={() => {

    		setDialogOpen(false);

    		loadUsers();

  	}}
	/>

      <UserViewDialog
        open={viewOpen}
        onClose={()=>setViewOpen(false)}
        user={selected}
      />

    </>
  );

}
