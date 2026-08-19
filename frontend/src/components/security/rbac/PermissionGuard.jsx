import usePermission from "../../../hooks/usePermission";

/**
 * Render children only when the current user
 * has the requested permission.
 *
 * Usage:
 *
 * <PermissionGuard permission="users:create">
 *   <Button>Create User</Button>
 * </PermissionGuard>
 */
export default function PermissionGuard({
  permission,
  children,
  fallback = null,
}) {
  const { hasPermission } = usePermission();

  if (!hasPermission(permission)) {
    return fallback;
  }

  return children;
}
