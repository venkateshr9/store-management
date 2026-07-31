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
import InventoryIcon from "@mui/icons-material/Inventory2";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import AssessmentIcon from "@mui/icons-material/Assessment";

import { Link } from "react-router-dom";

const drawerWidth = 240;

const menus = [
  {
    text: "Dashboard",
    icon: <DashboardIcon />,
    path: "/dashboard",
  },
  {
    text: "Platform Modules",
    icon: <InventoryIcon />,
    path: "/platform-modules",
  },
  {
    text: "Role Management",
    icon: <PeopleIcon />,
    path: "/security/roles",
  },
  {
    text: "Users",
    icon: <PeopleIcon />,
    path: "/users",
  },
  {
    text: "Departments",
    icon: <BusinessIcon />,
    path: "/departments",
  },
  {
    text: "Products",
    icon: <InventoryIcon />,
    path: "/products",
  },
  {
    text: "Suppliers",
    icon: <LocalShippingIcon />,
    path: "/suppliers",
  },
  {
    text: "Reports",
    icon: <AssessmentIcon />,
    path: "/reports",
  },
];


export default function Sidebar() {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
        },
      }}
    >
      <Toolbar />

      <List>
        {menus.map((menu) => (
          <ListItemButton
            key={menu.text}
            component={Link}
            to={menu.path}
          >
            <ListItemIcon>
              {menu.icon}
            </ListItemIcon>

            <ListItemText primary={menu.text} />
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  );
}
