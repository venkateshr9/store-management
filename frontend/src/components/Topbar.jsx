import {
  AppBar,
  Toolbar,
  IconButton,
  Box,
} from "@mui/material";

import LogoutIcon from "@mui/icons-material/Logout";

import { logout } from "../auth/authService";
import { useNavigate } from "react-router-dom";

export default function Topbar() {

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
  <AppBar
    position="fixed"
    sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
	bgcolor: "#1565C0",
    }}
  >
    <Toolbar
      sx={{
        minHeight: 72,
      }}
    >
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          alignItems: "center",
        }}
      >
        <Box
          component="img"
          src="/navbar-logo.png"
          alt="Store Management System"
          sx={{
            height: 75,
            width: "auto",
          }}
        />
      </Box>

      <IconButton
        color="inherit"
        onClick={handleLogout}
      >
        <LogoutIcon />
      </IconButton>

    </Toolbar>
  </AppBar>
);
}
