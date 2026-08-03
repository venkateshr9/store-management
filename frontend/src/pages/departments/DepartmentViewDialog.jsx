import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Grid,
  Chip,
} from "@mui/material";

export default function DepartmentViewDialog({
  open,
  onClose,
  department,
}) {

  if (!department) return null;

  return (

    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
    >

      <DialogTitle>
        Department Details
      </DialogTitle>

      <DialogContent>

        <Grid
          container
          spacing={2}
          sx={{ mt: 1 }}
        >

          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2">
              Department Code
            </Typography>

            <Typography>
              {department.department_code}
            </Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2">
              Department Name
            </Typography>

            <Typography>
              {department.department_name}
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="subtitle2">
              Description
            </Typography>

            <Typography>
              {department.description || "-"}
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="subtitle2">
              Remarks
            </Typography>

            <Typography>
              {department.remarks || "-"}
            </Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2">
              Status
            </Typography>

            <Chip
              label={
                department.is_active
                  ? "Active"
                  : "Inactive"
              }
              color={
                department.is_active
                  ? "success"
                  : "error"
              }
              size="small"
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2">
              ID
            </Typography>

            <Typography>
              {department.id}
            </Typography>
          </Grid>

        </Grid>

      </DialogContent>

      <DialogActions>

        <Button onClick={onClose}>
          Close
        </Button>

      </DialogActions>

    </Dialog>

  );

}
