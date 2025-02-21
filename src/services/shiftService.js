// src/services/shiftService.js
import apiClient from './apiClient';

const shiftService = {
  fetchShifts: async () => {
    const response = await apiClient.get('/shifts'); // Adjust the endpoint as necessary
    return response.data;
  },

  addShift: async (shiftData) => {
    const response = await apiClient.post('/shifts', shiftData);
    return response.data;
  },

  fetchShiftById: async (id) => { // New method to fetch shift by ID
    const response = await apiClient.get(`/shifts/${id}`);
    return response.data;
  },
};

export default shiftService;