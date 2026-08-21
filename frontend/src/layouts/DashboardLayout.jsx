import {
  Box,
  Toolbar,
} from "@mui/material";

import { Outlet } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

export default function DashboardLayout() {
  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        backgroundColor: "background.default",
        color: "text.primary",
      }}
    >
      <Topbar />

      <Sidebar />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: "100%",

          minHeight: "100vh",

          p: 3,

          overflow: "auto",

          backgroundColor: "background.default",
          color: "text.primary",

          transition:
            "background-color 200ms ease, color 200ms ease",
        }}
      >
        <Toolbar />

        <Outlet />
      </Box>
    </Box>
  );
}
