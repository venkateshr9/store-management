import {
  Box,
  Button,
  TextField,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import RefreshIcon from "@mui/icons-material/Refresh";

export default function UserToolbar({
  search,
  setSearch,
  onRefresh,
  onAdd,
  canCreate,
}) {
  return (
    <Box sx={{ mb: 3 }}>
      <TextField
        fullWidth
        placeholder="Search users..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        sx={{ mb: 2 }}
      />

      <Box
        sx={{
          display: "flex",
          gap: 2,
        }}
      >
        <Button
          variant="outlined"
          startIcon={<RefreshIcon />}
          onClick={onRefresh}
        >
          Refresh
        </Button>

        {canCreate && (
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={onAdd}
          >
            Add User
          </Button>
        )}
      </Box>
    </Box>
  );
}
