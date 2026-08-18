import {
  createSupplier,
  updateSupplier,
} from "../../services/supplierService";

import {
  useEffect,
  useState,
} from "react";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControlLabel,
  Switch,
  Grid,
} from "@mui/material";

export default function SupplierDialog({
  open,
  onClose,
  onSaved,
  supplier,
}) {
  const [form, setForm] = useState({
    supplier_code: "",
    supplier_name: "",
    contact_person: "",
    phone: "",
    email: "",
    address: "",
    description: "",
    is_active: true,
    remarks: "",
  });

  useEffect(() => {
    if (supplier) {
      setForm({
        supplier_code: supplier.supplier_code || "",
        supplier_name: supplier.supplier_name || "",
        contact_person: supplier.contact_person || "",
        phone: supplier.phone || "",
        email: supplier.email || "",
        address: supplier.address || "",
        description: supplier.description || "",
        is_active: supplier.is_active,
        remarks: supplier.remarks || "",
      });
    } else {
      setForm({
        supplier_code: "",
        supplier_name: "",
        contact_person: "",
        phone: "",
        email: "",
        address: "",
        description: "",
        is_active: true,
        remarks: "",
      });
    }
  }, [supplier, open]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      if (supplier) {
        await updateSupplier(
          supplier.id,
          form,
        );
      } else {
        await createSupplier(form);
      }

      onSaved();

    } catch (err) {
      console.error(err.response?.data);

      alert(
        JSON.stringify(
          err.response?.data,
          null,
          2,
        ),
      );
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle>
        {supplier ? "Edit Supplier" : "Add Supplier"}
      </DialogTitle>

      <DialogContent>
        <Grid
          container
          spacing={2}
          sx={{ mt: 1 }}
        >
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              required
              label="Supplier Code"
              name="supplier_code"
              value={form.supplier_code}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              required
              label="Supplier Name"
              name="supplier_name"
              value={form.supplier_name}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Contact Person"
              name="contact_person"
              value={form.contact_person}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Phone"
              name="phone"
              value={form.phone}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              type="email"
              label="Email"
              name="email"
              value={form.email}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={3}
              label="Address"
              name="address"
              value={form.address}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={2}
              label="Description"
              name="description"
              value={form.description}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={2}
              label="Remarks"
              name="remarks"
              value={form.remarks}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Switch
                  checked={form.is_active}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      is_active: e.target.checked,
                    }))
                  }
                />
              }
              label="Active"
            />
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>
          Cancel
        </Button>

        <Button
          variant="contained"
          onClick={handleSave}
        >
          {supplier ? "Update" : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
