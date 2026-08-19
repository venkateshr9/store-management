import { Navigate, Outlet } from "react-router-dom";
import usePermission from "../hooks/usePermission";

export default function PermissionRoute({
  permission,
}) {
  const { hasPermission } = usePermission();

  if (!hasPermission(permission)) {
    return (
      <Navigate
        to="/dashboard"
        replace
      />
    );
  }

  return <Outlet />;
}
