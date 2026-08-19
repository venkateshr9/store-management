import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import AuthContext from "./AuthContext";

import {
  fetchCurrentUser,
  getCurrentUser,
  isAuthenticated,
  logout as authLogout,
} from "./authService";

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [authenticated, setAuthenticated] =
    useState(false);
  const [loading, setLoading] = useState(true);

  // ---------------------------------------------------------
  // Load authenticated user from backend
  // ---------------------------------------------------------

  const loadCurrentUser = useCallback(async () => {
    if (!isAuthenticated()) {
      setAuthenticated(false);
      setUser(null);
      return;
    }

    try {
      const currentUser =
        await fetchCurrentUser();

      setUser(currentUser);
      setAuthenticated(true);

      // Keep localStorage synchronized.
      localStorage.setItem(
        "user",
        JSON.stringify(currentUser)
      );
    } catch (error) {
      console.error(
        "Failed to load current user:",
        error
      );

      authLogout();

      setAuthenticated(false);
      setUser(null);
    }
  }, []);

  // ---------------------------------------------------------
  // Initial authentication check
  // ---------------------------------------------------------

  useEffect(() => {
    const initializeAuth = async () => {
      setLoading(true);

      await loadCurrentUser();

      setLoading(false);
    };

    initializeAuth();
  }, [loadCurrentUser]);

  // ---------------------------------------------------------
  // Permission helper
  // ---------------------------------------------------------

  const hasPermission = useCallback(
    (permission) => {
      if (!permission) {
        return false;
      }

      return (
        user?.permissions?.includes(permission) ??
        false
      );
    },
    [user]
  );

  // ---------------------------------------------------------
  // Role helper
  // ---------------------------------------------------------

  const hasRole = useCallback(
    (roleCode) => {
      if (!roleCode) {
        return false;
      }

      return (
        user?.roles?.some(
          (role) => role.code === roleCode
        ) ?? false
      );
    },
    [user]
  );

  // ---------------------------------------------------------
  // Logout
  // ---------------------------------------------------------

  const logout = useCallback(() => {
    authLogout();

    setAuthenticated(false);
    setUser(null);
  }, []);

  // ---------------------------------------------------------
  // Context value
  // ---------------------------------------------------------

  const contextValue = useMemo(
    () => ({
      user,
      authenticated,
      loading,

      roles: user?.roles ?? [],
      permissions: user?.permissions ?? [],

      setUser,
      setAuthenticated,

      hasPermission,
      hasRole,

      loadCurrentUser,
      logout,
    }),
    [
      user,
      authenticated,
      loading,
      hasPermission,
      hasRole,
      loadCurrentUser,
      logout,
    ]
  );

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}
