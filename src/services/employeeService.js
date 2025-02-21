// src/services/employeeService.js
import apiClient from './apiClient';

const employeeService = {
  fetchEmployees: async (page, limit, query) => {
    try {
      const response = await apiClient.get('/employees/search', {
        params: {
          page: page + 1, // Assuming the API expects 1-based index
          limit: limit,
          query: query
        },
      });
      return response.data || {};
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

  getEmployeeById: async (id) => { // New method to fetch employee by ID
    try {
      const response = await apiClient.get(`/employees/${id}`);
      return response.data["data"]; // Return the employee data
    } catch (error) {
      console.error('Error fetching employee by ID:', error);
      throw error; // Rethrow error for further handling in the calling component
    }
  },

  assignShift: async (employeeId, shiftData) => {
    const response = await apiClient.post(`/employees/${employeeId}/assign_shift`, shiftData);
    return response.data;
  },

  clockIn: async (employeeId, shiftId) => {
    const response = await apiClient.post(`/employees/${employeeId}/clockin`, { shift_id: shiftId });
    return response.data;
  },

  clockOut: async (employeeId, shiftId) => {
    const response = await apiClient.post(`/employees/${employeeId}/clockout`, { shift_id: shiftId });
    return response.data;
  },
};

export default employeeService;