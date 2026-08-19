import { useState, useEffect } from "react";

import usePermission from "../../hooks/usePermission";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";

export default function ChangePasswordDialog({
  open,
  onClose,
  onSave,
  user,
}) {

  const { hasPermission } = usePermission();
  const canUpdate = hasPermission("users:update");

  const [password, setPassword] = useState("");

  useEffect(() => {

    if (open) {
      setPassword("");
    }

  }, [open]);

  const handleSave = async () => {

    if (!canUpdate) {
      return;
    }

    if (password.length < 8) {

      alert("Password must be at least 8 characters.");

      return;

    }

    try {

      await onSave(password);

      setPassword("");

    } catch (err) {

      alert(
        err.response?.data?.detail ||
        "Unable to change password."
      );

    }

  };

  return (

    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
    >

      <DialogTitle>
        Change Password
      </DialogTitle>

      <DialogContent>

        <TextField
          fullWidth
          margin="normal"
          label="Username"
          value={user?.username || ""}
          disabled
        />

        <TextField
          fullWidth
          margin="normal"
          label="New Password"
          type="password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

      </DialogContent>

      <DialogActions>

        <Button onClick={onClose}>
          Cancel
        </Button>

        {canUpdate && (
          <Button
            variant="contained"
            onClick={handleSave}
          >
            Change Password
          </Button>
        )}

      </DialogActions>

    </Dialog>

  );

}
