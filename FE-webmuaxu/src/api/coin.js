import apiClient from './index.js';

export const listCoin = async () => {
    try {
        const response = await apiClient.get('/coins');
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || error.message);
    }
};

export const apiAddCoin = async (data) => {
    try {
        const response = await apiClient.post('/coins', data);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || error.message);
    }
};

export const apiUpdateCoin = async (id, data) => {
    try {
        const response = await apiClient.post(`/coins/${id}`, data);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || error.message);
    }
};

export const apiDeleteCoin = async (id) => {
    try {
        const response = await apiClient.delete(`/coins/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || error.message);
    }
};
