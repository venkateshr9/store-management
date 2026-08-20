import {
  Box,
  Button,
  Stack,
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
    <Box
      sx={{
        mb: 3,
        p: 2,
        borderRadius: 2,
        backgroundColor: "background.paper",
        boxShadow: 1,
      }}
    >
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={2}
        sx={{
          alignItems: {
            xs: "stretch",
            md: "center",
          },
          justifyContent: "flex-start",
        }}
      >
        <TextField
          label="Search"
          size="small"
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          sx={{
            minWidth: 250,
          }}
        />

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
            startIcon={<AddIcon fontSize="small" />}
            onClick={onAdd}
          >
            Add User
          </Button>
        )}
      </Stack>
    </Box>
  );
}
