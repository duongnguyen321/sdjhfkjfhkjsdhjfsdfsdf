import apiClient from './index.js';

export const listWeb = async () => {
    try {
        const response = await apiClient.get('/web');
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || error.message);
    }
};

export const apiAddWeb = async (data) => {
    try {
        const response = await apiClient.post('/web', data);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || error.message);
    }
};

export const apiUpdateWeb = async (id, data) => {
    try {
        const response = await apiClient.post(`/web/${id}`, data);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || error.message);
    }
};

export const apiDeleteWeb = async (id) => {
    try {
        const response = await apiClient.delete(`/web/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || error.message);
    }
};
