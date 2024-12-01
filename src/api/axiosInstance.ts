import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://farmer-market-33zm.onrender.com',
});

// Attach token to each request
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Token ${token}`;
  }
  return config;
});

export default axiosInstance;
