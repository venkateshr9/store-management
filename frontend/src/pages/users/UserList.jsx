import { useEffect, useState } from "react";

import {
  Paper,
  Typography,
} from "@mui/material";

import UserToolbar from "./UserToolbar";
import UserTable from "./UserTable";
import UserDialog from "./UserDialog";
import UserViewDialog from "./UserViewDialog";
import ChangePasswordDialog from "./ChangePasswordDialog";
import UserRoleDialog from "./UserRoleDialog";

import {
  getUsers,
  deleteUser,
  changePassword,
} from "../../services/userService";

import usePermission from "../../hooks/usePermission";

export default function UserList() {
  const {
    hasPermission,
  } = usePermission();

  const canCreate = hasPermission("users:create");
  const canUpdate = hasPermission("users:update");
  const canDelete = hasPermission("users:delete");

  const [users, setUsers] = useState([]);
  const [selected, setSelected] = useState(null);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);
  const [passwordOpen, setPasswordOpen] = useState(false);
  const [roleOpen, setRoleOpen] = useState(false);

  const [search, setSearch] = useState("");

  const loadUsers = async () => {
    const data = await getUsers();
    setUsers(data);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleAdd = () => {
    if (!canCreate) {
      return;
    }

    setSelected(null);
    setDialogOpen(true);
  };

  const handleEdit = (row) => {
    if (!canUpdate) {
      return;
    }

    setSelected(row);
    setDialogOpen(true);
  };

  const handleView = (row) => {
    setSelected(row);
    setViewOpen(true);
  };

  const handleChangePassword = (row) => {
    if (!canUpdate) {
      return;
    }

    setSelected(row);
    setPasswordOpen(true);
  };

  const handleManageRoles = (row) => {
    if (!canUpdate) {
      return;
    }

    setSelected(row);
    setRoleOpen(true);
  };

  const handleDelete = async (row) => {
    if (!canDelete) {
      return;
    }

    if (!window.confirm("Delete this user?")) {
      return;
    }

    await deleteUser(row.id);

    await loadUsers();
  };

  const filteredUsers = users.filter(
    (u) =>
      u.employee_no
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
      u.username
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
      u.full_name
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
      u.email
        ?.toLowerCase()
        .includes(search.toLowerCase())
  );

  return (
    <>
      <Paper sx={{ p: 3 }}>
        <UserToolbar
          search={search}
          setSearch={setSearch}
          onRefresh={loadUsers}
          onAdd={handleAdd}
          canCreate={canCreate}
        />

        <UserTable
          rows={filteredUsers}
          onView={handleView}
          onEdit={handleEdit}
          onChangePassword={handleChangePassword}
          onManageRoles={handleManageRoles}
          onDelete={handleDelete}
          canUpdate={canUpdate}
          canDelete={canDelete}
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

      <ChangePasswordDialog
        open={passwordOpen}
        user={selected}
        onClose={() => setPasswordOpen(false)}
        onSave={async (password) => {
          if (!canUpdate) {
            return;
          }

          await changePassword(
            selected.id,
            password
          );

          setPasswordOpen(false);
        }}
      />

      <UserViewDialog
        open={viewOpen}
        onClose={() => setViewOpen(false)}
        user={selected}
      />

      <UserRoleDialog
        open={roleOpen}
        user={selected}
        onClose={() => setRoleOpen(false)}
        onSaved={async () => {
          setRoleOpen(false);
          await loadUsers();
        }}
      />
    </>
  );
}
