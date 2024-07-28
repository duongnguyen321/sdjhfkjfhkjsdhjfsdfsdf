import apiClient from './index.js';

// export const listTrade = async (query) => {
//     try {
//         const response = await apiClient.get(`/trades?${query}`);
//         return response.data;
//     } catch (error) {
//         throw new Error(error.response.data.message || error.message);
//     }
// };

export const listTrade = async (query) => {
    try {
        const params = new URLSearchParams(query).toString();
        const response = await apiClient.get(`/trades?${params}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || error.message);
    }
};

export const apiAddTrade = async (data) => {
    try {
        const response = await apiClient.post('/trades', data);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || error.message);
    }
};

export const apiUpdateTrade = async (id, data) => {
    try {
        const response = await apiClient.post(`/trades/${id}`, data);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || error.message);
    }
};

export const apiDeleteTrade = async (id) => {
    try {
        const response = await apiClient.delete(`/trades/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || error.message);
    }
};
