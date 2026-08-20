import {
  Box,
  Divider,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import BusinessIcon from "@mui/icons-material/Business";
import CategoryIcon from "@mui/icons-material/Category";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import AssessmentIcon from "@mui/icons-material/Assessment";
import SecurityIcon from "@mui/icons-material/Security";
import AppsIcon from "@mui/icons-material/Apps";

import { Link, useLocation } from "react-router-dom";

import usePermission from "../hooks/usePermission";

const drawerWidth = 240;

const menus = [
  {
    text: "Dashboard",
    icon: <DashboardIcon />,
    path: "/dashboard",
    permission: "dashboard:view",
    section: "Overview",
  },

  {
    text: "Platform Modules",
    icon: <AppsIcon />,
    path: "/platform-modules",
    permission: "platform_modules:view",
    section: "Administration",
  },
  {
    text: "Role Management",
    icon: <PeopleIcon />,
    path: "/security/roles",
    permission: "roles:view",
    section: "Administration",
  },
  {
    text: "Permissions",
    icon: <SecurityIcon />,
    path: "/security/permissions",
    permission: "permissions:view",
    section: "Administration",
  },
  {
    text: "Users",
    icon: <PeopleIcon />,
    path: "/users",
    permission: "users:view",
    section: "Organization",
  },
  {
    text: "Departments",
    icon: <BusinessIcon />,
    path: "/departments",
    permission: "departments:view",
    section: "Organization",
  },

  {
    text: "Categories",
    icon: <CategoryIcon />,
    path: "/categories",
    permission: "categories:view",
    section: "Inventory",
  },
  {
    text: "Products",
    icon: <Inventory2Icon />,
    path: "/products",
    permission: "items:view",
    section: "Inventory",
  },
  {
    text: "Suppliers",
    icon: <LocalShippingIcon />,
    path: "/suppliers",
    permission: "suppliers:view",
    section: "Inventory",
  },

  {
    text: "Reports",
    icon: <AssessmentIcon />,
    path: "/reports",
    permission: "reports:view",
    section: "Analytics",
  },
];

const sectionOrder = [
  "Overview",
  "Administration",
  "Organization",
  "Inventory",
  "Analytics",
];

export default function Sidebar() {
  const location = useLocation();
  const { hasPermission } = usePermission();

  const visibleMenus = menus.filter((menu) =>
    hasPermission(menu.permission)
  );

  const isActive = (path) => {
    if (path === "/dashboard") {
      return location.pathname === "/dashboard";
    }

    return (
      location.pathname === path ||
      location.pathname.startsWith(`${path}/`)
    );
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,

        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",

          backgroundColor: "#FFFFFF",
          borderRight: "1px solid",
          borderColor: "divider",

          display: "flex",
          flexDirection: "column",

          overflowX: "hidden",
        },
      }}
    >
      {/* Topbar spacer */}
      <Toolbar
        sx={{
          minHeight: "72px !important",
          borderBottom: "1px solid",
          borderColor: "divider",
        }}
      />

      {/* Navigation header */}
      <Box
        sx={{
          px: 2,
          pt: 2.25,
          pb: 1,
        }}
      >
        <Typography
          variant="overline"
          sx={{
            display: "block",
            color: "text.secondary",
            fontSize: "0.68rem",
            fontWeight: 700,
            letterSpacing: "0.08em",
          }}
        >
          Navigation
        </Typography>
      </Box>

      {/* Navigation */}
      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          overflowX: "hidden",
          px: 1.25,
          pb: 2,
        }}
      >
        {sectionOrder.map((section) => {
          const sectionMenus = visibleMenus.filter(
            (menu) => menu.section === section
          );

          if (!sectionMenus.length) {
            return null;
          }

          return (
            <Box key={section} sx={{ mb: 1.5 }}>
              {section !== "Overview" && (
                <Typography
                  variant="caption"
                  sx={{
                    display: "block",
                    px: 1.5,
                    pt: 1.25,
                    pb: 0.75,
                    color: "text.disabled",
                    fontSize: "0.68rem",
                    fontWeight: 700,
                    letterSpacing: "0.07em",
                    textTransform: "uppercase",
                  }}
                >
                  {section}
                </Typography>
              )}

              <List
                disablePadding
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 0.35,
                }}
              >
                {sectionMenus.map((menu) => {
                  const active = isActive(menu.path);

                  return (
                    <ListItemButton
                      key={menu.text}
                      component={Link}
                      to={menu.path}
                      selected={active}
                      sx={{
                        minHeight: 44,
                        px: 1.5,
                        borderRadius: 1.5,

                        color: active
                          ? "primary.main"
                          : "text.secondary",

                        transition:
                          "background-color 160ms ease, color 160ms ease, transform 160ms ease",

                        "&:hover": {
                          backgroundColor: "rgba(30, 58, 95, 0.06)",
                          color: "primary.main",
                        },

                        "&.Mui-selected": {
                          backgroundColor:
                            "rgba(30, 58, 95, 0.10)",
                          color: "primary.main",
                        },

                        "&.Mui-selected:hover": {
                          backgroundColor:
                            "rgba(30, 58, 95, 0.14)",
                        },
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 38,
                          color: "inherit",

                          "& .MuiSvgIcon-root": {
                            fontSize: 20,
                          },
                        }}
                      >
                        {menu.icon}
                      </ListItemIcon>

                      <ListItemText
                        primary={menu.text}
                        slotProps={{
                          primary: {
                            fontSize: "0.875rem",
                            fontWeight: active ? 600 : 500,
                            noWrap: true,
                          },
                        }}
                      />
                    </ListItemButton>
                  );
                })}
              </List>

              {section !== "Analytics" && (
                <Divider
                  sx={{
                    mt: 1.25,
                    mx: 1,
                    borderColor: "divider",
                  }}
                />
              )}
            </Box>
          );
        })}
      </Box>

      {/* Footer */}
      <Box
        sx={{
          px: 2,
          py: 1.5,
          borderTop: "1px solid",
          borderColor: "divider",
          backgroundColor: "#FAFBFC",
        }}
      >
        <Typography
          variant="caption"
          sx={{
            display: "block",
            color: "text.disabled",
            textAlign: "center",
            fontSize: "0.68rem",
          }}
        >
          Store Management System
        </Typography>

        <Typography
          variant="caption"
          sx={{
            display: "block",
            color: "text.disabled",
            textAlign: "center",
            fontSize: "0.62rem",
            mt: 0.25,
          }}
        >
          Administration Portal
        </Typography>
      </Box>
    </Drawer>
  );
}
