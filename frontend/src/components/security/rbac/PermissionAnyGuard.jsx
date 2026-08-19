import usePermission from "../../../hooks/usePermission";

/**
 * Render children when the current user has
 * at least one of the supplied permissions.
 */
export default function PermissionAnyGuard({
  permissions = [],
  children,
  fallback = null,
}) {
  const { hasAnyPermission } = usePermission();

  if (!hasAnyPermission(permissions)) {
    return fallback;
  }

  return children;
}
