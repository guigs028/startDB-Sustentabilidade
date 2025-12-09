import api from './api';

export const userService = {
  getProfile: async () => {
    const response = await api.get('/usuarios/me');
    return response.data;
  },
  
  updateProfile: async (userData) => {
    const response = await api.put('/usuarios/me', userData);
    return response.data;
  }
};
