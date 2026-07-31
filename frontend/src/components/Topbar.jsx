import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
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
      sx={{ zIndex: 1201 }}
    >
      <Toolbar>

        <Typography
          variant="h6"
          sx={{ flexGrow: 1 }}
        >
          Store Management System
        </Typography>

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
