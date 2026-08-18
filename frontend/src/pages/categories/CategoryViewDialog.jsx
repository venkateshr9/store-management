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

export default function CategoryViewDialog({
  open,
  onClose,
  category,
}) {

  if (!category) return null;

  return (

    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
    >

      <DialogTitle>
        Category Details
      </DialogTitle>

      <DialogContent>

        <Grid
          container
          spacing={2}
          sx={{ mt: 1 }}
        >

          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2">
              Category Code
            </Typography>

            <Typography>
              {category.category_code}
            </Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2">
              Category Name
            </Typography>

            <Typography>
              {category.category_name}
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="subtitle2">
              Description
            </Typography>

            <Typography>
              {category.description || "-"}
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="subtitle2">
              Remarks
            </Typography>

            <Typography>
              {category.remarks || "-"}
            </Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2">
              Status
            </Typography>

            <Chip
              label={
                category.is_active
                  ? "Active"
                  : "Inactive"
              }
              color={
                category.is_active
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
              {category.id}
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
