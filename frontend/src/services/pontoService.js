import api from './api';

export const pontoService = {
  getMeusPontos: async () => {
    const response = await api.get('/pontos/meus');
    return response.data;
  },

  getAllPontos: async (params) => {
    const response = await api.get('/pontos', { params });
    return response.data;
  },

  createPonto: async (pontoData) => {
    const materiaisIds = Array.isArray(pontoData.materiaisIds) 
      ? pontoData.materiaisIds.filter(id => id != null) 
      : [];
    
    const payload = {
      nome: pontoData.nome,
      endereco: pontoData.endereco,
      contato: pontoData.contato,
      horarios: pontoData.horarios || 'Seg-Sex 08h-18h',
      materiaisAceitos: materiaisIds,
      latitude: pontoData.latitude,   
      longitude: pontoData.longitude

    };
    
    const response = await api.post('/pontos', payload);
    return response.data;
  },

  updatePonto: async (id, pontoData) => {
    const materiaisIds = Array.isArray(pontoData.materiaisIds) 
      ? pontoData.materiaisIds.filter(id => id != null) 
      : [];
    
    const payload = {
      nome: pontoData.nome,
      endereco: pontoData.endereco,
      contato: pontoData.contato,
      horarios: pontoData.horarios || 'Seg-Sex 08h-18h',
      materiaisAceitos: materiaisIds,
      latitude: pontoData.latitude,   
      longitude: pontoData.longitude
    };
    
    const response = await api.put(`/pontos/${id}`, payload);
    return response.data;
  },

  deletePonto: async (id) => {
    const response = await api.delete(`/pontos/${id}`);
    return response.data;
  },

  getPontoById: async (id) => {
    const response = await api.get(`/pontos/${id}`);
    return response.data;
  },

  getMateriais: async () => {
    const response = await api.get('/materiais');
    return response.data;
  }
};
