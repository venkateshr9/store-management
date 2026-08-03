import {
  createDepartment,
  updateDepartment,
} from "../../services/departmentService";

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

export default function DepartmentDialog({
  open,
  onClose,
  onSaved,
  department,
}) {

  const [form, setForm] = useState({
    department_code: "",
    department_name: "",
    description: "",
    remarks: "",
    is_active: true,
  });

  useEffect(() => {

    if (department) {

      setForm({
        department_code: department.department_code || "",
        department_name: department.department_name || "",
        description: department.description || "",
        remarks: department.remarks || "",
        is_active: department.is_active,
      });

    } else {

      setForm({
        department_code: "",
        department_name: "",
        description: "",
        remarks: "",
        is_active: true,
      });

    }

  }, [department]);

  const handleChange = (event) => {

    const { name, value } = event.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

  };

  const handleSave = async () => {

    try {

      if (department) {

        await updateDepartment(
          department.id,
          form,
        );

      } else {

        await createDepartment(
          form,
        );

      }

      onSaved();

    } catch (err) {

      console.log(err.response?.data);

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
        {department ? "Edit Department" : "Add Department"}
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
              label="Department Code"
              name="department_code"
              value={form.department_code}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Department Name"
              name="department_name"
              value={form.department_name}
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
          Save
        </Button>

      </DialogActions>

    </Dialog>

  );

}
