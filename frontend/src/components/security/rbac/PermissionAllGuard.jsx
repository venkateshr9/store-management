import usePermission from "../../../hooks/usePermission";

/**
 * Render children only when the current user has
 * all supplied permissions.
 */
export default function PermissionAllGuard({
  permissions = [],
  children,
  fallback = null,
}) {
  const { hasAllPermissions } = usePermission();

  if (!hasAllPermissions(permissions)) {
    return fallback;
  }

  return children;
}
