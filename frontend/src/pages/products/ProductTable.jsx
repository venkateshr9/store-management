import {
  Chip,
  IconButton,
} from "@mui/material";

import {
  DataGrid,
} from "@mui/x-data-grid";

import {
  Visibility,
  Edit,
  Delete,
} from "@mui/icons-material";

export default function ProductTable({
  rows,
  onView,
  onEdit,
  onDelete,
}) {
  const columns = [
    {
      field: "product_code",
      headerName: "Code",
      flex: 1,
      minWidth: 120,
    },

    {
      field: "product_name",
      headerName: "Product Name",
      flex: 2,
      minWidth: 180,
    },

    {
      field: "sku",
      headerName: "SKU",
      flex: 1,
      minWidth: 120,
      valueGetter: (value) => value || "-",
    },

    {
      field: "barcode",
      headerName: "Barcode",
      flex: 1,
      minWidth: 130,
      valueGetter: (value) => value || "-",
    },

    {
      field: "unit",
      headerName: "Unit",
      width: 100,
    },

    {
      field: "purchase_price",
      headerName: "Purchase Price",
      width: 140,
      type: "number",
    },

    {
      field: "selling_price",
      headerName: "Selling Price",
      width: 140,
      type: "number",
    },

    {
      field: "tax_rate",
      headerName: "Tax %",
      width: 90,
      type: "number",
    },

    {
      field: "is_active",
      headerName: "Status",
      width: 110,

      renderCell: (params) => (
        <Chip
          label={
            params.value
              ? "Active"
              : "Inactive"
          }
          color={
            params.value
              ? "success"
              : "error"
          }
          size="small"
        />
      ),
    },

    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      sortable: false,

      renderCell: (params) => (
        <>
          <IconButton
            color="primary"
            onClick={() =>
              onView(params.row)
            }
          >
            <Visibility />
          </IconButton>

          <IconButton
            color="warning"
            onClick={() =>
              onEdit(params.row)
            }
          >
            <Edit />
          </IconButton>

          <IconButton
            color="error"
            onClick={() =>
              onDelete(params.row)
            }
          >
            <Delete />
          </IconButton>
        </>
      ),
    },
  ];

  return (
    <DataGrid
      rows={rows}
      columns={columns}
      autoHeight
      pageSizeOptions={[
        10,
        25,
        50,
      ]}
      initialState={{
        pagination: {
          paginationModel: {
            pageSize: 10,
          },
        },
      }}
      disableRowSelectionOnClick
    />
  );
}
