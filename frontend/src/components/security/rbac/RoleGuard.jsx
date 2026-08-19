import usePermission from "../../../hooks/usePermission";

/**
 * Render children only when the current user has
 * the requested role.
 */
export default function RoleGuard({
  role,
  children,
  fallback = null,
}) {
  const { hasRole } = usePermission();

  if (!hasRole(role)) {
    return fallback;
  }

  return children;
}
