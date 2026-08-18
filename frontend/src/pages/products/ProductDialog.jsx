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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
} from "@mui/material";

import {
  createProduct,
  updateProduct,
} from "../../services/productService";

import {
  getDepartments,
} from "../../services/departmentService";

import {
  getCategories,
} from "../../services/categoryService";

import {
  getSuppliers,
} from "../../services/supplierService";


const initialForm = {
  product_code: "",
  product_name: "",
  sku: "",
  barcode: "",
  category_id: "",
  department_id: "",
  supplier_id: "",
  unit: "",
  purchase_price: "",
  selling_price: "",
  tax_rate: "0.00",
  reorder_level: "0.00",
  description: "",
  is_active: true,
  remarks: "",
};


export default function ProductDialog({
  open,
  onClose,
  onSaved,
  product,
}) {

  const [form, setForm] = useState(
    initialForm
  );

  const [departments, setDepartments] =
    useState([]);

  const [categories, setCategories] =
    useState([]);

  const [suppliers, setSuppliers] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");


  // ---------------------------------------------------------
  // Load lookup data
  // ---------------------------------------------------------

  const loadLookups = async () => {

    try {

      const [
        departmentData,
        categoryData,
        supplierData,
      ] = await Promise.all([
        getDepartments(),
        getCategories(),
        getSuppliers(),
      ]);

      setDepartments(
        departmentData || []
      );

      setCategories(
        categoryData || []
      );

      setSuppliers(
        supplierData || []
      );

    } catch (err) {

      console.error(
        "Failed to load product lookups:",
        err
      );

      setError(
        "Unable to load departments, categories, or suppliers."
      );

    }
  };


  // ---------------------------------------------------------
  // Initialize form
  // ---------------------------------------------------------

  useEffect(() => {

    if (!open) {
      return;
    }

    setError("");

    loadLookups();

    if (product) {

      setForm({
        product_code:
          product.product_code || "",

        product_name:
          product.product_name || "",

        sku:
          product.sku || "",

        barcode:
          product.barcode || "",

        category_id:
          product.category_id ?? "",

        department_id:
          product.department_id ?? "",

        supplier_id:
          product.supplier_id ?? "",

        unit:
          product.unit || "",

        purchase_price:
          product.purchase_price ?? "",

        selling_price:
          product.selling_price ?? "",

        tax_rate:
          product.tax_rate ?? "0.00",

        reorder_level:
          product.reorder_level ?? "0.00",

        description:
          product.description || "",

        is_active:
          product.is_active ?? true,

        remarks:
          product.remarks || "",
      });

    } else {

      setForm({
        ...initialForm,
      });

    }

  }, [open, product]);


  // ---------------------------------------------------------
  // Change
  // ---------------------------------------------------------

  const handleChange = (event) => {

    const {
      name,
      value,
    } = event.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

  };


  // ---------------------------------------------------------
  // Save
  // ---------------------------------------------------------

  const handleSave = async () => {

    setError("");
    setLoading(true);

    try {

      const payload = {
        product_code:
          form.product_code.trim(),

        product_name:
          form.product_name.trim(),

        sku:
          form.sku.trim() || null,

        barcode:
          form.barcode.trim() || null,

        category_id:
          Number(form.category_id),

        department_id:
          Number(form.department_id),

        supplier_id:
          form.supplier_id === ""
            ? null
            : Number(form.supplier_id),

        unit:
          form.unit.trim(),

        purchase_price:
          Number(form.purchase_price),

        selling_price:
          Number(form.selling_price),

        tax_rate:
          Number(form.tax_rate || 0),

        reorder_level:
          Number(form.reorder_level || 0),

        description:
          form.description.trim() || null,

        is_active:
          form.is_active,

        remarks:
          form.remarks.trim() || null,
      };


      if (product) {

        await updateProduct(
          product.id,
          payload
        );

      } else {

        await createProduct(
          payload
        );

      }

      onSaved();

    } catch (err) {

      console.error(
        "Product save error:",
        err
      );

      const detail =
        err.response?.data?.detail;

      if (typeof detail === "string") {

        setError(detail);

      } else if (Array.isArray(detail)) {

        setError(
          detail
            .map(
              (item) =>
                item.msg ||
                JSON.stringify(item)
            )
            .join(", ")
        );

      } else {

        setError(
          "Unable to save product."
        );

      }

    } finally {

      setLoading(false);

    }

  };


  return (
    <Dialog
      open={open}
      onClose={loading ? undefined : onClose}
      maxWidth="md"
      fullWidth
    >

      <DialogTitle>
        {product
          ? "Edit Product"
          : "Add Product"}
      </DialogTitle>


      <DialogContent>

        {error && (
          <Alert
            severity="error"
            sx={{ mt: 1, mb: 2 }}
          >
            {error}
          </Alert>
        )}


        <Grid
          container
          spacing={2}
          sx={{ mt: 1 }}
        >

          {/* Product Code */}

          <Grid item xs={12} md={6}>

            <TextField
              fullWidth
              required
              label="Product Code"
              name="product_code"
              value={form.product_code}
              onChange={handleChange}
            />

          </Grid>


          {/* Product Name */}

          <Grid item xs={12} md={6}>

            <TextField
              fullWidth
              required
              label="Product Name"
              name="product_name"
              value={form.product_name}
              onChange={handleChange}
            />

          </Grid>


          {/* SKU */}

          <Grid item xs={12} md={6}>

            <TextField
              fullWidth
              label="SKU"
              name="sku"
              value={form.sku}
              onChange={handleChange}
            />

          </Grid>


          {/* Barcode */}

          <Grid item xs={12} md={6}>

            <TextField
              fullWidth
              label="Barcode"
              name="barcode"
              value={form.barcode}
              onChange={handleChange}
            />

          </Grid>


          {/* Department */}

          <Grid item xs={12} md={4}>

            <FormControl
              fullWidth
              required
            >

              <InputLabel>
                Department
              </InputLabel>

              <Select
                name="department_id"
                value={form.department_id}
                label="Department"
                onChange={handleChange}
              >

                {departments.map(
                  (department) => (
                    <MenuItem
                      key={department.id}
                      value={department.id}
                    >
                      {department.department_code}
                      {" - "}
                      {department.department_name}
                    </MenuItem>
                  )
                )}

              </Select>

            </FormControl>

          </Grid>


          {/* Category */}

          <Grid item xs={12} md={4}>

            <FormControl
              fullWidth
              required
            >

              <InputLabel>
                Category
              </InputLabel>

              <Select
                name="category_id"
                value={form.category_id}
                label="Category"
                onChange={handleChange}
              >

                {categories.map(
                  (category) => (
                    <MenuItem
                      key={category.id}
                      value={category.id}
                    >
                      {category.category_code}
                      {" - "}
                      {category.category_name}
                    </MenuItem>
                  )
                )}

              </Select>

            </FormControl>

          </Grid>


          {/* Supplier */}

          <Grid item xs={12} md={4}>

            <FormControl fullWidth>

              <InputLabel>
                Supplier
              </InputLabel>

              <Select
                name="supplier_id"
                value={form.supplier_id}
                label="Supplier"
                onChange={handleChange}
              >

                <MenuItem value="">
                  No Supplier
                </MenuItem>

                {suppliers.map(
                  (supplier) => (
                    <MenuItem
                      key={supplier.id}
                      value={supplier.id}
                    >
                      {supplier.supplier_code}
                      {" - "}
                      {supplier.supplier_name}
                    </MenuItem>
                  )
                )}

              </Select>

            </FormControl>

          </Grid>


          {/* Unit */}

          <Grid item xs={12} md={4}>

            <TextField
              fullWidth
              required
              label="Unit"
              name="unit"
              placeholder="pcs, box, kg, litre..."
              value={form.unit}
              onChange={handleChange}
            />

          </Grid>


          {/* Purchase Price */}

          <Grid item xs={12} md={4}>

            <TextField
              fullWidth
              required
              type="number"
              label="Purchase Price"
              name="purchase_price"
              value={form.purchase_price}
              onChange={handleChange}
              inputProps={{
                min: 0,
                step: "0.01",
              }}
            />

          </Grid>


          {/* Selling Price */}

          <Grid item xs={12} md={4}>

            <TextField
              fullWidth
              required
              type="number"
              label="Selling Price"
              name="selling_price"
              value={form.selling_price}
              onChange={handleChange}
              inputProps={{
                min: 0,
                step: "0.01",
              }}
            />

          </Grid>


          {/* Tax */}

          <Grid item xs={12} md={4}>

            <TextField
              fullWidth
              type="number"
              label="Tax Rate (%)"
              name="tax_rate"
              value={form.tax_rate}
              onChange={handleChange}
              inputProps={{
                min: 0,
                max: 100,
                step: "0.01",
              }}
            />

          </Grid>


          {/* Reorder Level */}

          <Grid item xs={12} md={4}>

            <TextField
              fullWidth
              type="number"
              label="Reorder Level"
              name="reorder_level"
              value={form.reorder_level}
              onChange={handleChange}
              inputProps={{
                min: 0,
                step: "0.01",
              }}
            />

          </Grid>


          {/* Active */}

          <Grid item xs={12} md={4}>

            <FormControlLabel
              control={
                <Switch
                  checked={form.is_active}
                  onChange={(event) =>
                    setForm((prev) => ({
                      ...prev,
                      is_active:
                        event.target.checked,
                    }))
                  }
                />
              }
              label="Active"
            />

          </Grid>


          {/* Description */}

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


          {/* Remarks */}

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

        </Grid>

      </DialogContent>


      <DialogActions>

        <Button
          onClick={onClose}
          disabled={loading}
        >
          Cancel
        </Button>

        <Button
          variant="contained"
          onClick={handleSave}
          disabled={loading}
        >
          {loading
            ? "Saving..."
            : product
              ? "Update"
              : "Save"}
        </Button>

      </DialogActions>

    </Dialog>
  );
}
