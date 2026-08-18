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

export default function ProductViewDialog({
  open,
  onClose,
  product,
}) {
  if (!product) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="lg"
      fullWidth
    >
      <DialogTitle>
        Product Details
      </DialogTitle>

      <DialogContent>
        <Grid
          container
          spacing={2}
          sx={{ mt: 1 }}
        >

          <Grid item xs={12} md={4}>
            <Typography variant="subtitle2">
              Product Code
            </Typography>
            <Typography>
              {product.product_code || "-"}
            </Typography>
          </Grid>

          <Grid item xs={12} md={8}>
            <Typography variant="subtitle2">
              Product Name
            </Typography>
            <Typography>
              {product.product_name || "-"}
            </Typography>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography variant="subtitle2">
              SKU
            </Typography>
            <Typography>
              {product.sku || "-"}
            </Typography>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography variant="subtitle2">
              Barcode
            </Typography>
            <Typography>
              {product.barcode || "-"}
            </Typography>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography variant="subtitle2">
              Unit
            </Typography>
            <Typography>
              {product.unit || "-"}
            </Typography>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography variant="subtitle2">
              Category ID
            </Typography>
            <Typography>
              {product.category_id || "-"}
            </Typography>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography variant="subtitle2">
              Department ID
            </Typography>
            <Typography>
              {product.department_id || "-"}
            </Typography>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography variant="subtitle2">
              Supplier ID
            </Typography>
            <Typography>
              {product.supplier_id || "-"}
            </Typography>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography variant="subtitle2">
              Purchase Price
            </Typography>
            <Typography>
              {product.purchase_price ?? "-"}
            </Typography>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography variant="subtitle2">
              Selling Price
            </Typography>
            <Typography>
              {product.selling_price ?? "-"}
            </Typography>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography variant="subtitle2">
              Tax Rate
            </Typography>
            <Typography>
              {product.tax_rate ?? "0.00"}%
            </Typography>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography variant="subtitle2">
              Reorder Level
            </Typography>
            <Typography>
              {product.reorder_level ?? "0.00"}
            </Typography>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography variant="subtitle2">
              Status
            </Typography>

            <Chip
              label={
                product.is_active
                  ? "Active"
                  : "Inactive"
              }
              color={
                product.is_active
                  ? "success"
                  : "error"
              }
              size="small"
            />
          </Grid>

          <Grid item xs={12}>
            <Typography variant="subtitle2">
              Description
            </Typography>
            <Typography>
              {product.description || "-"}
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="subtitle2">
              Remarks
            </Typography>
            <Typography>
              {product.remarks || "-"}
            </Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2">
              Product ID
            </Typography>
            <Typography>
              {product.id}
            </Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2">
              Created At
            </Typography>
            <Typography>
              {product.created_at
                ? new Date(
                    product.created_at
                  ).toLocaleString()
                : "-"}
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
