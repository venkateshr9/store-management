import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import Login from "../pages/auth/Login";
import Dashboard from "../pages/dashboard/Dashboard";
import PlatformModuleList from "../pages/platform-modules/PlatformModuleList";
import RoleList from "../pages/security/roles";
import PermissionList from "../pages/security/permissions";
import UserList from "../pages/users/UserList";
import DepartmentList from "../pages/departments/DepartmentList";
import CategoryList from "../pages/categories/CategoryList";
import ProductList from "../pages/products/ProductList";
import SupplierList from "../pages/suppliers/SupplierList";

import PrivateRoute from "../auth/PrivateRoute";
import PermissionRoute from "../auth/PermissionRoute";
import DashboardLayout from "../layouts/DashboardLayout";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Navigate to="/login" replace />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        {/* Authentication boundary */}
        <Route element={<PrivateRoute />}>
          <Route element={<DashboardLayout />}>

            {/* Dashboard */}
            <Route element={<PermissionRoute permission="dashboard:view" />}>
              <Route
                path="/dashboard"
                element={<Dashboard />}
              />
            </Route>

            {/* Users */}
            <Route element={<PermissionRoute permission="users:view" />}>
              <Route
                path="/users"
                element={<UserList />}
              />
            </Route>

            {/* Departments */}
            <Route element={<PermissionRoute permission="departments:view" />}>
              <Route
                path="/departments"
                element={<DepartmentList />}
              />
            </Route>

            {/* Categories */}
            <Route element={<PermissionRoute permission="categories:view" />}>
              <Route
                path="/categories"
                element={<CategoryList />}
              />
            </Route>

            {/* Products */}
            <Route element={<PermissionRoute permission="items:view" />}>
              <Route
                path="/products"
                element={<ProductList />}
              />
            </Route>

            {/* Suppliers */}
            <Route element={<PermissionRoute permission="suppliers:view" />}>
              <Route
                path="/suppliers"
                element={<SupplierList />}
              />
            </Route>

            {/* Platform Modules */}
            <Route element={<PermissionRoute permission="platform_modules:view" />}>
              <Route
                path="/platform-modules"
                element={<PlatformModuleList />}
              />
            </Route>

            {/* Roles */}
            <Route element={<PermissionRoute permission="roles:view" />}>
              <Route
                path="/security/roles"
                element={<RoleList />}
              />
            </Route>

            {/* Permissions */}
            <Route element={<PermissionRoute permission="permissions:view" />}>
              <Route
                path="/security/permissions"
                element={<PermissionList />}
              />
            </Route>

          </Route>
        </Route>

        <Route
          path="*"
          element={<Navigate to="/login" replace />}
        />
      </Routes>
    </BrowserRouter>
  );
}
