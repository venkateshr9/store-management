import { useEffect, useState } from "react";

import AuthContext from "./AuthContext";
import {
  getCurrentUser,
  isAuthenticated,
  logout as authLogout,
} from "./authService";

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isAuthenticated()) {
      setAuthenticated(true);
      setUser(getCurrentUser());
    }

    setLoading(false);
  }, []);

  const logout = () => {
    authLogout();

    setAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        authenticated,
        loading,
        setUser,
        setAuthenticated,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
