import axios from "axios";

const api = axios.create({
  baseURL: "/api/v1",
  timeout: 10000,

  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Attach JWT token automatically
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Global response handler
api.interceptors.response.use(
  (response) => response,

  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("access_token");

      // Later we'll redirect to login automatically.
      // window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default api;
