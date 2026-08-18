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

export default function SupplierViewDialog({
  open,
  onClose,
  supplier,
}) {
  if (!supplier) {
    return null;
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle>
        Supplier Details
      </DialogTitle>

      <DialogContent>
        <Grid
          container
          spacing={2}
          sx={{ mt: 1 }}
        >
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2">
              Supplier Code
            </Typography>

            <Typography>
              {supplier.supplier_code}
            </Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2">
              Supplier Name
            </Typography>

            <Typography>
              {supplier.supplier_name}
            </Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2">
              Contact Person
            </Typography>

            <Typography>
              {supplier.contact_person || "-"}
            </Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2">
              Phone
            </Typography>

            <Typography>
              {supplier.phone || "-"}
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="subtitle2">
              Email
            </Typography>

            <Typography>
              {supplier.email || "-"}
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="subtitle2">
              Address
            </Typography>

            <Typography>
              {supplier.address || "-"}
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="subtitle2">
              Description
            </Typography>

            <Typography>
              {supplier.description || "-"}
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="subtitle2">
              Remarks
            </Typography>

            <Typography>
              {supplier.remarks || "-"}
            </Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2">
              Status
            </Typography>

            <Chip
              label={
                supplier.is_active
                  ? "Active"
                  : "Inactive"
              }
              color={
                supplier.is_active
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
              {supplier.id}
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
