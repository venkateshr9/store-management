import { useEffect, useState } from "react";

import {
  Paper,
} from "@mui/material";

import CategoryToolbar from "./CategoryToolbar";
import CategoryTable from "./CategoryTable";
import CategoryDialog from "./CategoryDialog";
import CategoryViewDialog from "./CategoryViewDialog";

import {
  getCategories,
  deleteCategory,
} from "../../services/categoryService";

export default function CategoryList() {

  const [categories, setCategories] = useState([]);

  const [selected, setSelected] = useState(null);

  const [dialogOpen, setDialogOpen] = useState(false);

  const [viewOpen, setViewOpen] = useState(false);

  const [search, setSearch] = useState("");

  // ---------------------------------------------------------
  // Load
  // ---------------------------------------------------------

  const loadCategories = async () => {

    const data = await getCategories();

    setCategories(data);

  };

  useEffect(() => {

    loadCategories();

  }, []);

  // ---------------------------------------------------------
  // Add
  // ---------------------------------------------------------

  const handleAdd = () => {

    setSelected(null);

    setDialogOpen(true);

  };

  // ---------------------------------------------------------
  // Edit
  // ---------------------------------------------------------

  const handleEdit = (row) => {

    setSelected(row);

    setDialogOpen(true);

  };

  // ---------------------------------------------------------
  // View
  // ---------------------------------------------------------

  const handleView = (row) => {

    setSelected(row);

    setViewOpen(true);

  };

  // ---------------------------------------------------------
  // Delete
  // ---------------------------------------------------------

  const handleDelete = async (row) => {

    if (!window.confirm("Delete this category?")) {
      return;
    }

    await deleteCategory(row.id);

    await loadCategories();

  };

  // ---------------------------------------------------------
  // Search
  // ---------------------------------------------------------

  const filteredCategories = categories.filter((c) => {

    const value = search.toLowerCase();

    return (

      c.category_code
        ?.toLowerCase()
        .includes(value)

      ||

      c.category_name
        ?.toLowerCase()
        .includes(value)

      ||

      c.description
        ?.toLowerCase()
        .includes(value)

      ||

      c.remarks
        ?.toLowerCase()
        .includes(value)

    );

  });

  // ---------------------------------------------------------
  // Render
  // ---------------------------------------------------------

  return (
    <>

      <Paper sx={{ p: 3 }}>

        <CategoryToolbar
          search={search}
          setSearch={setSearch}
          onRefresh={loadCategories}
          onAdd={handleAdd}
        />

        <CategoryTable
          rows={filteredCategories}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

      </Paper>

      <CategoryDialog
        open={dialogOpen}
        category={selected}
        onClose={() => setDialogOpen(false)}
        onSaved={async () => {

          setDialogOpen(false);

          await loadCategories();

        }}
      />

      <CategoryViewDialog
        open={viewOpen}
        category={selected}
        onClose={() => setViewOpen(false)}
      />

    </>
  );

}
