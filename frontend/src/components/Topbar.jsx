import {
  AppBar,
  Avatar,
  Box,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";

import LogoutIcon from "@mui/icons-material/Logout";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import { useContext, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import AuthContext from "../auth/AuthContext";
import { logout as authLogout } from "../auth/authService";

const pageTitles = {
  "/dashboard": "Dashboard",
  "/users": "Users",
  "/departments": "Departments",
  "/categories": "Categories",
  "/products": "Products",
  "/suppliers": "Suppliers",
  "/platform-modules": "Platform Modules",
  "/security/roles": "Role Management",
  "/security/permissions": "Permissions",
};

export default function Topbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const { user, roles, logout } = useContext(AuthContext);

  const [menuAnchor, setMenuAnchor] = useState(null);

  const pageTitle = useMemo(() => {
    return (
      pageTitles[location.pathname] ||
      "Store Management"
    );
  }, [location.pathname]);

  const displayName =
    user?.full_name ||
    user?.fullName ||
    user?.username ||
    "User";

  const primaryRole =
    roles?.[0]?.name ||
    roles?.[0]?.role_name ||
    "User";

  const initials = displayName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("");

  const handleMenuOpen = (event) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
  };

  const handleLogout = () => {
    handleMenuClose();

    logout();
    authLogout();

    navigate("/login", {
      replace: true,
    });
  };

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        zIndex: (theme) =>
          theme.zIndex.drawer + 1,

        background:
          "linear-gradient(135deg, #132A43 0%, #1E3A5F 100%)",

        color: "#FFFFFF",

        borderBottom:
          "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <Toolbar
        sx={{
          minHeight: {
            xs: 64,
            md: 72,
          },

          px: {
            xs: 2,
            md: 3,
          },
        }}
      >
        {/* Application identity */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            minWidth: 0,
          }}
        >
          <Box
            component="img"
            src="/navbar-logo.png"
            alt="Store Management System"
            sx={{
              height: {
                xs: 48,
                md: 56,
              },

              width: "auto",

              objectFit: "contain",

              display: "block",
            }}
          />

          <Divider
            orientation="vertical"
            flexItem
            sx={{
              mx: 2,
              borderColor:
                "rgba(255,255,255,0.18)",
            }}
          />

          <Box
            sx={{
              display: {
                xs: "none",
                sm: "block",
              },

              minWidth: 0,
            }}
          >
            <Typography
              variant="caption"
              sx={{
                display: "block",
                color:
                  "rgba(255,255,255,0.62)",
                fontWeight: 500,
                lineHeight: 1.2,
              }}
            >
              Store Management System
            </Typography>

            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                lineHeight: 1.3,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {pageTitle}
            </Typography>
          </Box>
        </Box>

        {/* Push user area to right */}
        <Box sx={{ flexGrow: 1 }} />

        {/* Theme/settings placeholder */}
        <Tooltip title="Appearance settings">
          <IconButton
            color="inherit"
            sx={{
              mr: {
                xs: 0.5,
                md: 1,
              },

              color:
                "rgba(255,255,255,0.82)",

              "&:hover": {
                backgroundColor:
                  "rgba(255,255,255,0.10)",
              },
            }}
            onClick={() => {
              // Theme customization will be
              // implemented in the next phase.
            }}
          >
            <SettingsOutlinedIcon />
          </IconButton>
        </Tooltip>

        {/* User identity */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            ml: 1,
          }}
        >
          <Avatar
            sx={{
              width: 38,
              height: 38,

              bgcolor: "#0F766E",
              color: "#FFFFFF",

              fontSize: 14,
              fontWeight: 700,

              border:
                "2px solid rgba(255,255,255,0.25)",
            }}
          >
            {initials || "U"}
          </Avatar>

          <Box
            sx={{
              display: {
                xs: "none",
                md: "block",
              },

              ml: 1.25,
              mr: 0.5,

              minWidth: 90,
              maxWidth: 180,
            }}
          >
            <Typography
              variant="body2"
              sx={{
                fontWeight: 600,
                color: "#FFFFFF",

                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {displayName}
            </Typography>

            <Typography
              variant="caption"
              sx={{
                display: "block",

                color:
                  "rgba(255,255,255,0.65)",

                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {primaryRole}
            </Typography>
          </Box>

          <Tooltip title="Account menu">
            <IconButton
              color="inherit"
              onClick={handleMenuOpen}
              sx={{
                color:
                  "rgba(255,255,255,0.75)",

                "&:hover": {
                  backgroundColor:
                    "rgba(255,255,255,0.10)",
                },
              }}
            >
              <KeyboardArrowDownIcon />
            </IconButton>
          </Tooltip>
        </Box>

        {/* Account menu */}
        <Menu
          anchorEl={menuAnchor}
          open={Boolean(menuAnchor)}
          onClose={handleMenuClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          slotProps={{
            paper: {
              elevation: 4,
              sx: {
                mt: 1,

                minWidth: 220,

                borderRadius: 2,

                border:
                  "1px solid #E4E7EC",

                boxShadow:
                  "0 10px 30px rgba(16, 24, 40, 0.12)",
              },
            },
          }}
        >
          <Box
            sx={{
              px: 2,
              py: 1.5,
            }}
          >
            <Typography
              variant="subtitle2"
              fontWeight={700}
            >
              {displayName}
            </Typography>

            <Typography
              variant="caption"
              color="text.secondary"
            >
              {primaryRole}
            </Typography>
          </Box>

          <Divider />

          <MenuItem
            onClick={() => {
              handleMenuClose();

              // Future profile/preferences page.
            }}
          >
            <SettingsOutlinedIcon
              fontSize="small"
              sx={{ mr: 1.5 }}
            />

            Account & Preferences
          </MenuItem>

          <MenuItem onClick={handleLogout}>
            <LogoutIcon
              fontSize="small"
              sx={{
                mr: 1.5,
                color: "error.main",
              }}
            />

            <Typography color="error.main">
              Logout
            </Typography>
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}
