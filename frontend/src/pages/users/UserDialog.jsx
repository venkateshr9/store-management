import {
  createUser,
  updateUser,
} from "../../services/userService";

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

export default function UserDialog({
  open,
  onClose,
  onSaved,
  user,
}) {
  
  const [form, setForm] = useState({
    employee_no: "",
    username: "",
    full_name: "",
    email: "",
    mobile: "",
    password: "",
    role_id: null,
    department_id: null,
    remarks: "",
    is_active: true,
  });

  useEffect(() => {

    if (user) {

      setForm({
        employee_no: user.employee_no || "",
        username: user.username || "",
        full_name: user.full_name || "",
        email: user.email || "",
        mobile: user.mobile || "",
        password: "",
        role_id: user.role_id ?? null,
        department_id: user.department_id ?? null,
        remarks: user.remarks || "",
        is_active: user.is_active,
      });

    } else {

      setForm({
        employee_no: "",
        username: "",
        full_name: "",
        email: "",
        mobile: "",
        password: "",
        role_id: null,
        department_id: null,
        remarks: "",
        is_active: true,
      });

    }

  }, [user]);
    
  const handleChange = (event) => {

    const { name, value } = event.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

  };
  
  const handleSave = async () => {

  const payload = {
    ...form,

    department_id:
      form.department_id === "" || form.department_id == null
	  ? null
	  : Number(form.department_id),

    role_id:
      form.role_id === "" || form.role_id == null
	  ? null
	  : Number(form.role_id),
  };

  if (user) {
    delete payload.password;
  }


  try {

    if (user) {
      await updateUser(user.id, payload);
    } else {
      await createUser(payload);
    }

    onSaved();

  } catch (err) {


    alert(
      JSON.stringify(
        err.response?.data,
        null,
        2
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
        {user ? "Edit User" : "Add User"}
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
        label="Employee No"
        name="employee_no"
        value={form.employee_no}
        onChange={handleChange}
      />
    </Grid>

       <Grid item xs={12} md={6}>
        <TextField
        fullWidth
        label="Username"
        name="username"
        value={form.username}
        onChange={handleChange}
      />
    </Grid>

    <Grid item xs={12}>
      <TextField
        fullWidth
        label="Full Name"
        name="full_name"
        value={form.full_name}
        onChange={handleChange}
      />
    </Grid>

       <Grid item xs={12} md={6}>
	<TextField
        fullWidth
        label="Email"
        name="email"
        value={form.email}
        onChange={handleChange}
      />
    </Grid>

       <Grid item xs={12} md={6}>
	<TextField
        fullWidth
        label="Mobile"
        name="mobile"
        value={form.mobile}
        onChange={handleChange}
      />
    </Grid>

    {!user && (
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Password"
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
        />
      </Grid>
    )}

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
