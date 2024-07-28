// src/apiService.js
import axios from 'axios';
import { config } from '../../config';

const apiClient = axios.create({
    baseURL: config.baseURL,
    headers: {
        'Content-Type': 'application/json'
    }
});

export default apiClient;

export const login = async (data) => {
    try {
        const response = await apiClient.post('/login', data);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || error.message);
    }
};

export const register = async (data) => {
    try {
        const response = await apiClient.post('/register', data);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || error.message);
    }
};

export const loginAdmin = async (data) => {
    try {
        const response = await apiClient.post('/admin/login', data);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || error.message);
    }
};