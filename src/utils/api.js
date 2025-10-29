import axios from 'axios';

// Backend API URL - can be overridden with VITE_API_URL environment variable
const API_URL = import.meta.env.VITE_API_URL || 'https://aha-bojanam-backend.onrender.com';

// Create axios instance with base URL
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include auth token if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
