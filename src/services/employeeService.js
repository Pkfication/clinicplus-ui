// src/services/employeeService.js
import apiClient from './apiClient';

const employeeService = {
  fetchEmployees: async (page, limit) => {
    try {
      const response = await apiClient.get('/employees', {
        params: {
          page: page + 1, // Assuming the API expects 1-based index
          limit: limit,
        },
      });
      return response.data.data || [];
    } catch (error) {
      console.error('Error fetching employees:', error);
      throw error; // Rethrow error for further handling in the calling component
    }
  },

  addEmployee: async (employeeData) => {
    try {
      const response = await apiClient.post('/employees', employeeData);
      return response.data; // Return the created employee data if needed
    } catch (error) {
      console.error('Error adding employee:', error);
      throw error; // Rethrow error for further handling in the calling component
    }
  },

  updateEmployee: async (id, employeeData) => {
    try {
      const response = await apiClient.put(`/employees/${id}`, employeeData);
      return response.data; // Return the updated employee data if needed
    } catch (error) {
      console.error('Error updating employee:', error);
      throw error; // Rethrow error for further handling in the calling component
    }
  },
};

export default employeeService;