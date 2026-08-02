import {
  Box,
  Toolbar,
} from "@mui/material";

import { Outlet } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

export default function DashboardLayout() {
  return (
    <Box sx={{ display: "flex" }}>

      <Topbar />

      <Sidebar />

         <Box
  	component="main"
  	sx={{
    	flexGrow: 1,
    	p: 3,
    	width: "100%",
    	overflow: "auto",
 	 }}
	>
	 <Toolbar />

        <Outlet />

      </Box>

    </Box>
  );
}
