import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Login from "../pages/auth/Login";
import Dashboard from "../pages/dashboard/Dashboard";
import PlatformModuleList from "../pages/platform-modules/PlatformModuleList";
import RoleList from "../pages/security/roles";

import PrivateRoute from "../auth/PrivateRoute";
import DashboardLayout from "../layouts/DashboardLayout";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />

        <Route path="/login" element={<Login />} />

        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <DashboardLayout>
                <Dashboard />
              </DashboardLayout>
            </PrivateRoute>
          }
        />
	<Route
  	  path="/security/roles"
  	  element={
          <PrivateRoute>
      	  <DashboardLayout>
       	  <RoleList />
      	  </DashboardLayout>
    	  </PrivateRoute>
  	  }
	/>
	<Route
  	  path="/platform-modules"
  	  element={
    	  <PrivateRoute>
      	  <DashboardLayout>
          <PlatformModuleList />
          </DashboardLayout>
         </PrivateRoute>
         }
	/>
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
