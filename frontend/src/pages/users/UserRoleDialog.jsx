import React, { useEffect, useState } from "react";

import {
  Alert,
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControlLabel,
  FormGroup,
  Snackbar,
  Typography,
} from "@mui/material";

import SecurityIcon from "@mui/icons-material/Security";

import useRoles from "../../hooks/useRoles";

import {
  getUserRoles,
  updateUserRoles,
} from "../../services/userService";

export default function UserRoleDialog({
  open,
  user,
  onClose,
  onSaved,
}) {
  const {
    roles,
    loading: rolesLoading,
    loadRoles,
  } = useRoles();

  const [selectedRoles, setSelectedRoles] = useState([]);
  const [loadingUserRoles, setLoadingUserRoles] = useState(false);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(() => {
    if (!open || !user) {
      return;
    }

    let cancelled = false;

    const loadUserRoles = async () => {
      setLoadingUserRoles(true);
      setError("");

      try {
        await loadRoles();

        const currentRoles = await getUserRoles(user.id);

        if (!cancelled) {
          setSelectedRoles(
            currentRoles.map((role) => Number(role.role_id))
          );
        }
      } catch (err) {
        console.error(err);

        if (!cancelled) {
          setError(
            err?.response?.data?.detail ||
              "Unable to load user roles."
          );
        }
      } finally {
        if (!cancelled) {
          setLoadingUserRoles(false);
        }
      }
    };

    loadUserRoles();

    return () => {
      cancelled = true;
    };
  }, [open, user, loadRoles]);

  const handleToggle = (roleId) => {
    const id = Number(roleId);

    setSelectedRoles((current) => {
      if (current.includes(id)) {
        return current.filter(
          (existingId) => existingId !== id
        );
      }

      return [...current, id];
    });
  };

  const handleSave = async () => {
    if (!user) {
      return;
    }

    setSaving(true);
    setError("");

    try {
      await updateUserRoles(
        user.id,
        selectedRoles
      );

      setSnackbar({
        open: true,
        message: "User roles updated successfully.",
        severity: "success",
      });

      if (onSaved) {
        await onSaved();
      }
    } catch (err) {
      console.error(err);

      setError(
        err?.response?.data?.detail ||
          "Unable to save user roles."
      );
    } finally {
      setSaving(false);
    }
  };

  const handleClose = () => {
    if (saving) {
      return;
    }

    setSelectedRoles([]);
    setError("");
    onClose();
  };

  const busy =
    rolesLoading ||
    loadingUserRoles ||
    saving;

  return (
    <>
      <Dialog
        open={open}
        onClose={busy ? undefined : handleClose}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <SecurityIcon color="primary" />

            <Typography
              variant="h6"
              fontWeight={700}
            >
              Manage User Roles
            </Typography>
          </Box>

          {user && (
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mt: 0.5 }}
            >
              {user.full_name} ({user.username})
            </Typography>
          )}
        </DialogTitle>

        <DialogContent dividers>
          {error && (
            <Alert
              severity="error"
              sx={{ mb: 2 }}
            >
              {error}
            </Alert>
          )}

          {busy && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                py: 3,
              }}
            >
              <CircularProgress />
            </Box>
          )}

          {!busy && !error && (
            <>
              <Typography
                variant="subtitle1"
                fontWeight={600}
                sx={{ mb: 1 }}
              >
                Available Roles
              </Typography>

              <Divider sx={{ mb: 1 }} />

              {roles.length === 0 ? (
                <Alert severity="info">
                  No roles are available.
                </Alert>
              ) : (
                <FormGroup>
                  {roles.map((role) => (
                    <FormControlLabel
                      key={role.id}
                      control={
                        <Checkbox
                          checked={selectedRoles.includes(
                            Number(role.id)
                          )}
                          onChange={() =>
                            handleToggle(role.id)
                          }
                        />
                      }
                      label={
                        <Box>
                          <Typography
                            variant="body1"
                            fontWeight={600}
                          >
                            {role.role_name}
                          </Typography>

                          <Typography
                            variant="caption"
                            color="text.secondary"
                          >
                            {role.role_code}
                            {role.description
                              ? ` — ${role.description}`
                              : ""}
                          </Typography>
                        </Box>
                      }
                    />
                  ))}
                </FormGroup>
              )}

              <Typography
                variant="caption"
                color="text.secondary"
                sx={{
                  display: "block",
                  mt: 2,
                }}
              >
                Select all roles that should be assigned
                to this user.
              </Typography>
            </>
          )}
        </DialogContent>

        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button
            onClick={handleClose}
            disabled={saving}
          >
            Cancel
          </Button>

          <Button
            variant="contained"
            onClick={handleSave}
            disabled={busy || !!error}
          >
            {saving ? (
              <CircularProgress
                size={22}
                color="inherit"
              />
            ) : (
              "Save Roles"
            )}
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() =>
          setSnackbar((current) => ({
            ...current,
            open: false,
          }))
        }
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Alert
          severity={snackbar.severity}
          variant="filled"
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
}
