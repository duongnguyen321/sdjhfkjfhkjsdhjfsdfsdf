import apiClient from './index.js';

export const listTransaction = async () => {
    try {
        const response = await apiClient.get('/transaction');
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || error.message);
    }
};

export const apiAddTransaction = async (data) => {
    try {
        const response = await apiClient.post('/transaction', data);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || error.message);
    }
};

export const apiUpdateTransaction = async (id, data) => {
    try {
        const response = await apiClient.post(`/transaction/${id}`, data);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || error.message);
    }
};

export const apiDeleteTransaction = async (id) => {
    try {
        const response = await apiClient.delete(`/transaction/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || error.message);
    }
};
