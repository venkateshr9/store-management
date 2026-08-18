import {
  Stack,
  TextField,
  Button,
} from "@mui/material";

import {
  Refresh,
  Add,
} from "@mui/icons-material";

export default function SupplierToolbar({
  search,
  setSearch,
  onRefresh,
  onAdd,
}) {
  return (
    <Stack
      direction="row"
      spacing={2}
      sx={{ mb: 3 }}
    >
      <TextField
        label="Search Supplier"
        size="small"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{ width: 350 }}
      />

      <Button
        variant="outlined"
        startIcon={<Refresh />}
        onClick={onRefresh}
      >
        Refresh
      </Button>

      <Button
        variant="contained"
        startIcon={<Add />}
        onClick={onAdd}
      >
        Add Supplier
      </Button>
    </Stack>
  );
}
