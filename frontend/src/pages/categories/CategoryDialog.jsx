import {
  createCategory,
  updateCategory,
} from "../../services/categoryService";

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

export default function CategoryDialog({
  open,
  onClose,
  onSaved,
  category,
}) {

  const [form, setForm] = useState({
    category_code: "",
    category_name: "",
    description: "",
    remarks: "",
    is_active: true,
  });

  useEffect(() => {

    if (category) {

      setForm({
        category_code: category.category_code || "",
        category_name: category.category_name || "",
        description: category.description || "",
        remarks: category.remarks || "",
        is_active: category.is_active,
      });

    } else {

      setForm({
        category_code: "",
        category_name: "",
        description: "",
        remarks: "",
        is_active: true,
      });

    }

  }, [category]);

  const handleChange = (event) => {

    const { name, value } = event.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

  };

  const handleSave = async () => {

    try {

      if (category) {

        await updateCategory(
          category.id,
          form,
        );

      } else {

        await createCategory(
          form,
        );

      }

      onSaved();

    } catch (err) {


      alert(
        JSON.stringify(
          err.response?.data,
          null,
          2,
        )
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
        {category ? "Edit Category" : "Add Category"}
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
              label="Category Code"
              name="category_code"
              value={form.category_code}
              onChange={handleChange}
            />

          </Grid>

          <Grid item xs={12} md={6}>

            <TextField
              fullWidth
              label="Category Name"
              name="category_name"
              value={form.category_name}
              onChange={handleChange}
            />

          </Grid>

          <Grid item xs={12}>

            <TextField
              fullWidth
              multiline
              rows={3}
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
              rows={3}
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
                    setForm({
                      ...form,
                      is_active: e.target.checked,
                    })
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
          {category ? "Update" : "Save"}
        </Button>

      </DialogActions>

    </Dialog>

  );

}
