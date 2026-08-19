import { createContext } from "react";

const AuthContext = createContext({
  user: null,
  authenticated: false,
  loading: true,

  roles: [],
  permissions: [],

  setUser: () => {},
  setAuthenticated: () => {},

  hasPermission: () => false,
  hasRole: () => false,

  loadCurrentUser: async () => {},
  logout: () => {},
});

export default AuthContext;
