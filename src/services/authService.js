import apiClient from './apiClient';

const authService = {
  login: async (username, password) => {
    try {
      const response = await apiClient.post(`/login`, { username, password });
      const { data } = response.data

      if (data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('user', JSON.stringify(data.user || {}));
      }
    } catch (error) {
      // Clear all authentication-related localStorage items
      localStorage.removeItem('token');
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('user');
      
      console.error('Login error', error);
      throw error;
    }
  },

  logout: async () => {
    try {
      // Optional: Call backend logout endpoint if required
      await apiClient.post(`/logout`, {}, {});

      // Clear local storage
      localStorage.removeItem('token');
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('user');
    } catch (error) {
      console.error('Logout error', error);
    }
  },

  getCurrentUser: () => {
    return JSON.parse(localStorage.getItem('user'));
  },

  getToken: () => {
    return localStorage.getItem('token');
  }
};

export default authService;