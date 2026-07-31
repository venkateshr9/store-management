import api from "../api/axios";

/**
 * Authenticate user
 */
export const login = async (username, password) => {
  const response = await api.post("/v1/auth/login", {
    username,
    password,
  });

  return response.data;
};

/**
 * Logout user
 */
export const logout = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  localStorage.removeItem("user");
};

/**
 * Save authentication data
 */
export const saveAuth = (authData) => {
  if (authData.access_token) {
    localStorage.setItem("access_token", authData.access_token);
  }

  if (authData.refresh_token) {
    localStorage.setItem("refresh_token", authData.refresh_token);
  }

  if (authData.user) {
    localStorage.setItem("user", JSON.stringify(authData.user));
  }
};

/**
 * Get access token
 */
export const getAccessToken = () => {
  return localStorage.getItem("access_token");
};

/**
 * Get logged in user
 */
export const getCurrentUser = () => {
  const user = localStorage.getItem("user");

  return user ? JSON.parse(user) : null;
};

/**
 * Check authentication status
 */
export const isAuthenticated = () => {
  return !!localStorage.getItem("access_token");
};
