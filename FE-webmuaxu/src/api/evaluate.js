import apiClient from './index.js';

export const listEvaluate = async () => {
    try {
        const response = await apiClient.get('/evaluate');
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || error.message);
    }
};

export const apiAddEvaluate = async (data) => {
    try {
        const response = await apiClient.post('/evaluate', data);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || error.message);
    }
};

export const apiUpdateEvaluate = async (id, data) => {
    try {
        const response = await apiClient.post(`/evaluate/${id}`, data);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || error.message);
    }
};

export const apiDeleteEvaluate = async (id) => {
    try {
        const response = await apiClient.delete(`/evaluate/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || error.message);
    }
};
