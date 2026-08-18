import { useEffect, useState } from "react";

import {
  Paper,
  Typography,
} from "@mui/material";

import ProductToolbar from "./ProductToolbar";
import ProductTable from "./ProductTable";
import ProductDialog from "./ProductDialog";
import ProductViewDialog from "./ProductViewDialog";

import {
  getProducts,
  deleteProduct,
} from "../../services/productService";

export default function ProductList() {

  const [products, setProducts] = useState([]);

  const [selected, setSelected] = useState(null);

  const [dialogOpen, setDialogOpen] = useState(false);

  const [viewOpen, setViewOpen] = useState(false);

  const [search, setSearch] = useState("");

  // ---------------------------------------------------------
  // Load Products
  // ---------------------------------------------------------

  const loadProducts = async () => {

    try {

      const data = await getProducts();

      setProducts(data);

    } catch (error) {

      console.error(
        "Failed to load products:",
        error
      );

    }

  };

  useEffect(() => {

    loadProducts();

  }, []);

  // ---------------------------------------------------------
  // Add
  // ---------------------------------------------------------

  const handleAdd = () => {

    setSelected(null);

    setDialogOpen(true);

  };

  // ---------------------------------------------------------
  // Edit
  // ---------------------------------------------------------

  const handleEdit = (row) => {

    setSelected(row);

    setDialogOpen(true);

  };

  // ---------------------------------------------------------
  // View
  // ---------------------------------------------------------

  const handleView = (row) => {

    setSelected(row);

    setViewOpen(true);

  };

  // ---------------------------------------------------------
  // Delete
  // ---------------------------------------------------------

  const handleDelete = async (row) => {

    if (
      !window.confirm(
        `Delete product "${row.product_name}"?`
      )
    ) {

      return;

    }

    try {

      await deleteProduct(row.id);

      await loadProducts();

    } catch (error) {

      console.error(
        "Failed to delete product:",
        error
      );

      alert(
        JSON.stringify(
          error.response?.data || {
            detail: "Failed to delete product.",
          },
          null,
          2
        )
      );

    }

  };

  // ---------------------------------------------------------
  // Search
  // ---------------------------------------------------------

  const searchValue = search
    .trim()
    .toLowerCase();

  const filteredProducts =
    products.filter((product) => {

      return (

        product.product_code
          ?.toLowerCase()
          .includes(searchValue)

        ||

        product.product_name
          ?.toLowerCase()
          .includes(searchValue)

        ||

        product.sku
          ?.toLowerCase()
          .includes(searchValue)

        ||

        product.barcode
          ?.toLowerCase()
          .includes(searchValue)

        ||

        product.unit
          ?.toLowerCase()
          .includes(searchValue)

        ||

        product.description
          ?.toLowerCase()
          .includes(searchValue)

        ||

        product.remarks
          ?.toLowerCase()
          .includes(searchValue)

      );

    });

  // ---------------------------------------------------------
  // Render
  // ---------------------------------------------------------

  return (
    <>

      <Typography
        variant="h3"
        fontWeight={700}
        gutterBottom
      >
        Product Management
      </Typography>

      <Typography
        color="text.secondary"
        sx={{ mb: 3 }}
      >
        Manage products, pricing, stock settings and suppliers
      </Typography>

      <Paper sx={{ p: 3 }}>

        <ProductToolbar
          search={search}
          setSearch={setSearch}
          onRefresh={loadProducts}
          onAdd={handleAdd}
        />

        <ProductTable
          rows={filteredProducts}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

      </Paper>

      <ProductDialog
        open={dialogOpen}
        product={selected}
        onClose={() => {
          setDialogOpen(false);
        }}
        onSaved={async () => {

          setDialogOpen(false);

          await loadProducts();

        }}
      />

      <ProductViewDialog
        open={viewOpen}
        product={selected}
        onClose={() => {
          setViewOpen(false);
        }}
      />

    </>
  );

}
