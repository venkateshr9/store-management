import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import BusinessIcon from "@mui/icons-material/Business";
import CategoryIcon from "@mui/icons-material/Category";
import InventoryIcon from "@mui/icons-material/Inventory2";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import AssessmentIcon from "@mui/icons-material/Assessment";
import SecurityIcon from "@mui/icons-material/Security";

import { Link, useLocation } from "react-router-dom";

import usePermission from "../hooks/usePermission";

const drawerWidth = 240;

const menus = [
  {
    text: "Dashboard",
    icon: <DashboardIcon />,
    path: "/dashboard",
    permission: "dashboard:view",
  },
  {
    text: "Platform Modules",
    icon: <InventoryIcon />,
    path: "/platform-modules",
    permission: "platform_modules:view",
  },
  {
    text: "Role Management",
    icon: <PeopleIcon />,
    path: "/security/roles",
    permission: "roles:view",
  },
  {
    text: "Permissions",
    icon: <SecurityIcon />,
    path: "/security/permissions",
    permission: "permissions:view",
  },
  {
    text: "Users",
    icon: <PeopleIcon />,
    path: "/users",
    permission: "users:view",
  },
  {
    text: "Departments",
    icon: <BusinessIcon />,
    path: "/departments",
    permission: "departments:view",
  },
  {
    text: "Categories",
    icon: <CategoryIcon />,
    path: "/categories",
    permission: "categories:view",
  },
  {
    text: "Products",
    icon: <InventoryIcon />,
    path: "/products",
    permission: "items:view",
  },
  {
    text: "Suppliers",
    icon: <LocalShippingIcon />,
    path: "/suppliers",
    permission: "suppliers:view",
  },
  {
    text: "Reports",
    icon: <AssessmentIcon />,
    path: "/reports",
    permission: "reports:view",
  },
];

export default function Sidebar() {
  const location = useLocation();
  const { hasPermission } = usePermission();

  const visibleMenus = menus.filter((menu) =>
    hasPermission(menu.permission)
  );

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
    >
      <Toolbar sx={{ minHeight: 72 }} />

      <List>
        {visibleMenus.map((menu) => (
          <ListItemButton
            key={menu.text}
            component={Link}
            to={menu.path}
            selected={location.pathname === menu.path}
          >
            <ListItemIcon>
              {menu.icon}
            </ListItemIcon>

            <ListItemText
              primary={menu.text}
            />
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  );
}
