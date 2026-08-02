import api from "../api/axios";

const BASE_URL = "/permissions";

export const getPermissions = () =>
    api.get(BASE_URL);

export const getPermission = (id) =>
    api.get(`${BASE_URL}/${id}`);

export const createPermission = (data) =>
    api.post(BASE_URL, data);

export const updatePermission = (id, data) =>
    api.put(`${BASE_URL}/${id}`, data);

export const deletePermission = (id) =>
    api.delete(`${BASE_URL}/${id}`);
