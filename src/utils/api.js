import axios from 'axios';

// Use environment variable for API URL, fallback to localhost in development
const API_URL = import.meta.env.VITE_API_URL || 
                (import.meta.env.DEV ? 'http://localhost:3005' : '/api');

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
