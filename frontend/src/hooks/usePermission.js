import { useContext } from "react";

import AuthContext from "../auth/AuthContext";

/**
 * Central frontend RBAC permission helpers.
 *
 * Examples:
 *
 * const { hasPermission, hasRole } = usePermission();
 *
 * hasPermission("users:view")
 * hasPermission("users:create")
 * hasPermission("users:update")
 * hasPermission("users:delete")
 *
 * hasRole("ROLE_1")
 */
export default function usePermission() {
  const {
    permissions = [],
    roles = [],
    hasPermission: contextHasPermission,
    hasRole: contextHasRole,
  } = useContext(AuthContext);

  const hasPermission = (permission) => {
    if (!permission) {
      return false;
    }

    if (typeof contextHasPermission === "function") {
      return contextHasPermission(permission);
    }

    return permissions.includes(permission);
  };

  const hasRole = (roleCode) => {
    if (!roleCode) {
      return false;
    }

    if (typeof contextHasRole === "function") {
      return contextHasRole(roleCode);
    }

    return roles.some(
      (role) => role.code === roleCode
    );
  };

  const hasAnyPermission = (requiredPermissions = []) => {
    if (!Array.isArray(requiredPermissions)) {
      return false;
    }

    return requiredPermissions.some((permission) =>
      hasPermission(permission)
    );
  };

  const hasAllPermissions = (requiredPermissions = []) => {
    if (!Array.isArray(requiredPermissions)) {
      return false;
    }

    return requiredPermissions.every((permission) =>
      hasPermission(permission)
    );
  };

  const hasAnyRole = (requiredRoles = []) => {
    if (!Array.isArray(requiredRoles)) {
      return false;
    }

    return requiredRoles.some((role) =>
      hasRole(role)
    );
  };

  const hasAllRoles = (requiredRoles = []) => {
    if (!Array.isArray(requiredRoles)) {
      return false;
    }

    return requiredRoles.every((role) =>
      hasRole(role)
    );
  };

  return {
    permissions,
    roles,

    hasPermission,
    hasAnyPermission,
    hasAllPermissions,

    hasRole,
    hasAnyRole,
    hasAllRoles,
  };
}
