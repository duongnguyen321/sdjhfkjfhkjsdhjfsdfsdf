import apiClient from './index.js';

export const listBank = async () => {
    try {
        const response = await apiClient.get('/bank');
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || error.message);
    }
};

export const apiAddBank = async (data) => {
    try {
        const response = await apiClient.post('/bank', data);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || error.message);
    }
};

export const apiUpdateBank = async (id, data) => {
    try {
        const response = await apiClient.post(`/bank/${id}`, data);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || error.message);
    }
};

export const apiDeleteBank = async (id) => {
    try {
        const response = await apiClient.delete(`/bank/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || error.message);
    }
};
