// src/services/apiClient.js
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://clinicplus-7bid.onrender.com', // Base URL for your API
});

// Add a request interceptor to include the token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API error:', error);
    if (error.response && error.response.status === 401) {
      // Handle unauthorized access (e.g., redirect to login)
      localStorage.removeItem('token');
      localStorage.removeItem('isAuthenticated');
      window.location.href = '/login'; // Redirect to login
    }
    return Promise.reject(error);
  }
);

export default apiClient;