import { useEffect, useState } from "react";

import {
  Paper,
  Typography,
} from "@mui/material";

import SupplierToolbar from "./SupplierToolbar";
import SupplierTable from "./SupplierTable";
import SupplierDialog from "./SupplierDialog";
import SupplierViewDialog from "./SupplierViewDialog";

import {
  getSuppliers,
  deleteSupplier,
} from "../../services/supplierService";

export default function SupplierList() {
  const [suppliers, setSuppliers] = useState([]);

  const [selected, setSelected] = useState(null);

  const [dialogOpen, setDialogOpen] = useState(false);

  const [viewOpen, setViewOpen] = useState(false);

  const [search, setSearch] = useState("");

  const loadSuppliers = async () => {
    try {
      const data = await getSuppliers();

      setSuppliers(data);
    } catch (err) {
      console.error(
        "Failed to load suppliers:",
        err.response?.data || err,
      );

      alert(
        JSON.stringify(
          err.response?.data || "Failed to load suppliers",
          null,
          2,
        ),
      );
    }
  };

  useEffect(() => {
    loadSuppliers();
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
    if (
      !window.confirm(
        `Delete supplier "${row.supplier_name}"?`,
      )
    ) {
      return;
    }

    try {
      await deleteSupplier(row.id);

      await loadSuppliers();
    } catch (err) {
      console.error(
        "Failed to delete supplier:",
        err.response?.data || err,
      );

      alert(
        JSON.stringify(
          err.response?.data || "Failed to delete supplier",
          null,
          2,
        ),
      );
    }
  };

  const searchValue = search.toLowerCase();

  const filteredSuppliers = suppliers.filter((supplier) =>
    supplier.supplier_code
      ?.toLowerCase()
      .includes(searchValue)

    ||

    supplier.supplier_name
      ?.toLowerCase()
      .includes(searchValue)

    ||

    supplier.contact_person
      ?.toLowerCase()
      .includes(searchValue)

    ||

    supplier.phone
      ?.toLowerCase()
      .includes(searchValue)

    ||

    supplier.email
      ?.toLowerCase()
      .includes(searchValue)

    ||

    supplier.address
      ?.toLowerCase()
      .includes(searchValue)

    ||

    supplier.description
      ?.toLowerCase()
      .includes(searchValue)

    ||

    supplier.remarks
      ?.toLowerCase()
      .includes(searchValue)
  );

  return (
    <>
      <Typography
        variant="h3"
        fontWeight={700}
        gutterBottom
      >
        Supplier Management
      </Typography>

      <Typography
        color="text.secondary"
        sx={{ mb: 3 }}
      >
        Manage suppliers
      </Typography>

      <Paper sx={{ p: 3 }}>
        <SupplierToolbar
          search={search}
          setSearch={setSearch}
          onRefresh={loadSuppliers}
          onAdd={handleAdd}
        />

        <SupplierTable
          rows={filteredSuppliers}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </Paper>

      <SupplierDialog
        open={dialogOpen}
        supplier={selected}
        onClose={() => setDialogOpen(false)}
        onSaved={async () => {
          setDialogOpen(false);
          await loadSuppliers();
        }}
      />

      <SupplierViewDialog
        open={viewOpen}
        supplier={selected}
        onClose={() => setViewOpen(false)}
      />
    </>
  );
}
