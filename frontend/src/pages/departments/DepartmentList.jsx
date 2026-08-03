import { useEffect, useState } from "react";

import {
  Paper,
  Typography,
} from "@mui/material";

import DepartmentToolbar from "./DepartmentToolbar";
import DepartmentTable from "./DepartmentTable";
import DepartmentDialog from "./DepartmentDialog";
import DepartmentViewDialog from "./DepartmentViewDialog";

import {
  getDepartments,
  deleteDepartment,
} from "../../services/departmentService";

export default function DepartmentList() {

  const [departments, setDepartments] = useState([]);

  const [selected, setSelected] = useState(null);

  const [dialogOpen, setDialogOpen] = useState(false);

  const [viewOpen, setViewOpen] = useState(false);

  const [search, setSearch] = useState("");

  const loadDepartments = async () => {

    const data = await getDepartments();

    setDepartments(data);

  };

  useEffect(() => {

    loadDepartments();

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

    if (!window.confirm("Delete this department?"))
      return;

    await deleteDepartment(row.id);

    loadDepartments();

  };

  const filteredDepartments = departments.filter((d) =>

    d.department_code
      ?.toLowerCase()
      .includes(search.toLowerCase())

    ||

    d.department_name
      ?.toLowerCase()
      .includes(search.toLowerCase())

    ||

    d.description
      ?.toLowerCase()
      .includes(search.toLowerCase())

    ||

    d.remarks
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
        Department Management
      </Typography>

      <Typography
        color="text.secondary"
        sx={{ mb: 3 }}
      >
        Manage departments
      </Typography>

      <Paper sx={{ p: 3 }}>

        <DepartmentToolbar
          search={search}
          setSearch={setSearch}
          onRefresh={loadDepartments}
          onAdd={handleAdd}
        />

        <DepartmentTable
          rows={filteredDepartments}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

      </Paper>

      <DepartmentDialog
        open={dialogOpen}
        onClose={() => {
          setDialogOpen(false);
        }}
        onSaved={() => {
          setDialogOpen(false);
          loadDepartments();
        }}
        department={selected}
       />
	  
      <DepartmentViewDialog
        open={viewOpen}
        onClose={() => setViewOpen(false)}
        department={selected}
      />

    </>
  );

}
