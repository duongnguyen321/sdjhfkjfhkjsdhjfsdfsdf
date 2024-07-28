import axios from 'axios';

const apiGetBank = axios.create({
  baseURL: 'https://api.vietqr.io/v2', // API base URL
  headers: {
    'Content-Type': 'application/json'
  }
});

export const getListBank = async () => {
  try {
    const response = await apiGetBank.get('/banks');
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || error.message);
  }
};