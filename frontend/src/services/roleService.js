import api from "../api/axios";

const BASE_URL = "/roles";

const roleService = {
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

    getActive() {
        return api.get(`${BASE_URL}/active`);
    },
};

export default roleService;
