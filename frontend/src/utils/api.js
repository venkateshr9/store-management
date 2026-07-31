// src/utils/api.js

import axios from "axios";

/*
|--------------------------------------------------------------------------
| Axios Instance
|--------------------------------------------------------------------------
|
| Base URL is read from the Vite environment variable.
| Example:
| VITE_API_URL=https://192.168.1.35/api/v1
|
*/

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 30000,
    headers: {
        "Content-Type": "application/json",
    },
});

/*
|--------------------------------------------------------------------------
| Request Interceptor
|--------------------------------------------------------------------------
*/

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

/*
|--------------------------------------------------------------------------
| Response Interceptor
|--------------------------------------------------------------------------
*/

api.interceptors.response.use(
    (response) => response,

    (error) => {
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    localStorage.removeItem("access_token");
                    window.location.href = "/login";
                    break;

                case 403:
                    console.error("Permission denied");
                    break;

                case 404:
                    console.error("Resource not found");
                    break;

                case 500:
                    console.error("Internal server error");
                    break;

                default:
                    break;
            }
        }

        return Promise.reject(error);
    }
);

export default api;
