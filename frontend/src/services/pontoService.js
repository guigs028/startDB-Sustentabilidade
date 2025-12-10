import api from './api';

export const pontoService = {
  // GET /pontos/meus - Lista pontos do coletor autenticado
  getMeusPontos: async () => {
    const response = await api.get('/pontos/meus');
    return response.data;
  },

  // GET /pontos - Lista todos os pontos (para geradores)
  getAllPontos: async (params) => {
    const response = await api.get('/pontos', { params });
    return response.data;
  },

  // POST /pontos - Cria novo ponto
  createPonto: async (pontoData) => {
    // Garantir que materiaisIds é um array de números
    const materiaisIds = Array.isArray(pontoData.materiaisIds) 
      ? pontoData.materiaisIds.filter(id => id != null) 
      : [];
    
    const payload = {
      nome: pontoData.nome,
      endereco: pontoData.endereco,
      contato: pontoData.contato,
      horarios: pontoData.horarios || 'Seg-Sex 08h-18h',
      materiaisAceitos: materiaisIds
    };
    
    console.log('Criando ponto com payload:', payload);
    const response = await api.post('/pontos', payload);
    console.log('Ponto criado com sucesso:', response.data);
    return response.data;
  },

  // PUT /pontos/{id} - Atualiza ponto existente
  updatePonto: async (id, pontoData) => {
    // Garantir que materiaisIds é um array de números
    const materiaisIds = Array.isArray(pontoData.materiaisIds) 
      ? pontoData.materiaisIds.filter(id => id != null) 
      : [];
    
    const payload = {
      nome: pontoData.nome,
      endereco: pontoData.endereco,
      contato: pontoData.contato,
      horarios: pontoData.horarios || 'Seg-Sex 08h-18h',
      materiaisAceitos: materiaisIds
    };
    
    console.log('Atualizando ponto', id, 'com payload:', payload);
    const response = await api.put(`/pontos/${id}`, payload);
    console.log('Ponto atualizado com sucesso:', response.data);
    return response.data;
  },

  // DELETE /pontos/{id} - Remove ponto
  deletePonto: async (id) => {
    const response = await api.delete(`/pontos/${id}`);
    return response.data;
  },

  // GET /pontos/{id} - Busca ponto por ID
  getPontoById: async (id) => {
    const response = await api.get(`/pontos/${id}`);
    return response.data;
  },

  // GET /materiais - Lista todos os materiais disponíveis
  getMateriais: async () => {
    const response = await api.get('/materiais');
    return response.data;
  }
};
