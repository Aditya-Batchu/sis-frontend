import api from './api';

export const campusService = {
  // Get all campuses with query filters
  getCampuses: async (params = {}) => {
    const response = await api.get('/system-setup/campuses', { params });
    return response.data.data;
  },

  // Get campus dashboard stats
  getCampusStats: async () => {
    const response = await api.get('/system-setup/campuses/stats');
    return response.data.data;
  },

  // Get single campus by ID
  getCampusById: async (id) => {
    const response = await api.get(`/system-setup/campuses/${id}`);
    return response.data.data;
  },

  // Create new campus
  createCampus: async (campusData) => {
    const response = await api.post('/system-setup/campuses', campusData);
    return response.data.data;
  },

  // Update existing campus
  updateCampus: async (id, campusData) => {
    const response = await api.put(`/system-setup/campuses/${id}`, campusData);
    return response.data.data;
  },

  // Soft-delete campus
  deleteCampus: async (id) => {
    const response = await api.delete(`/system-setup/campuses/${id}`);
    return response.data.data;
  },
};
