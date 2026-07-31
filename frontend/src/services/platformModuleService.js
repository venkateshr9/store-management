// src/services/platformModuleService.js

import api from "../utils/api";

const BASE_URL = "/platform-modules";

const platformModuleService = {
    getAll(params = {}) {
        return api.get(BASE_URL, { params });
    },

    getById(id) {
        return api.get(`${BASE_URL}/${id}`);
    },

    create(data) {
        return api.post(BASE_URL, data);
    },

    update(id, data) {
        return api.put(`${BASE_URL}/${id}`, data);
    },

    remove(id) {
        return api.delete(`${BASE_URL}/${id}`);
    },

    deactivate(id) {
        return api.patch(`${BASE_URL}/${id}/deactivate`);
    },

    restore(id) {
        return api.patch(`${BASE_URL}/${id}/restore`);
    },

    getActive() {
        return api.get(`${BASE_URL}/active`);
    },
};

export default platformModuleService;
