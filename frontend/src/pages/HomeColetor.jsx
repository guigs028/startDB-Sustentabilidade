import { useState, useEffect } from 'react';
import { pontoService } from '../services/pontoService';
import api from '../services/api';

import ColetorHeader from '../components/coletor/ColetorHeader';
import PontosStats from '../components/coletor/PontosStats';
import PontosList from '../components/coletor/PontosList';
import EntregasList from '../components/coletor/EntregasList';
import PontoModal from '../components/coletor/PontoModal';

export default function HomeColetor() {
  const [pontos, setPontos] = useState([]);
  const [entregas, setEntregas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPonto, setEditingPonto] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [pontosData, entregasData] = await Promise.allSettled([
        pontoService.getMeusPontos(),
        api.get('/descartes/pendentes')
      ]);
      
      if (pontosData.status === 'fulfilled') {
        setPontos(Array.isArray(pontosData.value) ? pontosData.value : []);
      }
      
      if (entregasData.status === 'fulfilled') {
        setEntregas(Array.isArray(entregasData.value.data) ? entregasData.value.data : []);
      }
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePonto = async (pontoData) => {
    if (editingPonto) {
      await pontoService.updatePonto(editingPonto.id, pontoData);
    } else {
      await pontoService.createPonto(pontoData);
    }
    await loadData();
    setIsModalOpen(false);
    setEditingPonto(null);
  };

  const handleEditPonto = (ponto) => {
    setEditingPonto(ponto);
    setIsModalOpen(true);
  };

  const handleDeletePonto = async (pontoId) => {
    if (!confirm('Tem certeza que deseja remover este ponto de coleta?')) {
      return;
    }

    try {
      await pontoService.deletePonto(pontoId);
      await loadData();
    } catch (error) {
      console.error('Erro ao deletar ponto:', error);
      alert('Erro ao remover ponto. Tente novamente.');
    }
  };

  const handleNewPonto = () => {
    setEditingPonto(null);
    setIsModalOpen(true);
  };

  const handleAprovarEntrega = async (entregaId) => {
    try {
      await api.post(`/descartes/${entregaId}/status`, {
        status: 'CONCLUIDO'
      });
      await loadData();
    } catch (error) {
      console.error('Erro ao aprovar entrega:', error);
      console.error('Response:', error.response);
      alert(`Erro ao aprovar entrega: ${error.response?.data?.message || error.message}`);
    }
  };

  const handleNegarEntrega = async (entregaId) => {
    try {
      console.log('Negando entrega:', entregaId);
      await api.post(`/descartes/${entregaId}/status`, {
        status: 'CANCELADO'
      });
      await loadData();
    } catch (error) {
      console.error('Erro ao negar entrega:', error);
      console.error('Response:', error.response);
      alert(`Erro ao negar entrega: ${error.response?.data?.message || error.message}`);
    }
  };

  // Calcular materiais únicos aceitos em todos os pontos
  const materiaisUnicos = new Set();
  pontos.forEach(ponto => {
    ponto.materiais?.forEach(m => materiaisUnicos.add(m.id || m.nome));
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Carregando...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-gray-50 min-h-screen">
      <ColetorHeader />
      
      <PontosStats 
        pontosAtivos={pontos.length} 
        entregasPendentes={entregas.length}
        materiaisAceitos={materiaisUnicos.size}
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <PontosList
          pontos={pontos}
          onEdit={handleEditPonto}
          onDelete={handleDeletePonto}
          onNew={handleNewPonto}
        />
        
        <EntregasList
          entregas={entregas}
          onAprovar={handleAprovarEntrega}
          onNegar={handleNegarEntrega}
        />
      </div>

      <PontoModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingPonto(null);
        }}
        onSubmit={handleCreatePonto}
        editingPonto={editingPonto}
      />
    </div>
  );
}
