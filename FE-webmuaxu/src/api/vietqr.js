// src/apiService.js
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://api.vietqr.io/v2', // Địa chỉ gốc của API
  headers: {
    'Content-Type': 'application/json'
  }
});

export const lookupAccount = async (bin, accountNumber) => {
  const data = {
    bin: bin,
    accountNumber: accountNumber
  };

  const config = {
    headers: {
      'x-client-id': 'db9f7538-6967-4edd-a2b3-e5b242297039',
      'x-api-key': '4610e97e-c6df-4094-b771-bf4e57b5be41',
      'Content-Type': 'application/json'
    }
  };

  try {
    const response = await apiClient.post('/lookup', data, config);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || error.message);
  }
};

export const createQRBank = async (data) => {

  const config = {
    headers: {
      'x-client-id': 'db9f7538-6967-4edd-a2b3-e5b242297039',
      'x-api-key': '4610e97e-c6df-4094-b771-bf4e57b5be41',
      'Content-Type': 'application/json'
    }
  };

  try {
    const response = await apiClient.post('/generate', data, config);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || error.message);
  }
};
