import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { Trash2, Plus } from 'lucide-react';

export default function MeusDescartes() {
  const navigate = useNavigate();
  const [descartes, setDescartes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('TODOS');

  useEffect(() => {
    loadDescartes();
  }, []);

  const loadDescartes = async () => {
    try {
      setLoading(true);
      const response = await api.get('/descartes/historico');
      setDescartes(response.data || []);
    } catch (error) {
      console.error('Erro ao carregar descartes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelar = async (id) => {
    if (!confirm('Deseja realmente cancelar este descarte?')) return;
    
    try {
      await api.delete(`/descartes/${id}`);
      loadDescartes();
    } catch (error) {
      console.error('Erro ao cancelar descarte:', error);
      alert('Erro ao cancelar descarte');
    }
  };

  const getStatusBadge = (status) => {
    const badges = {
      'APROVADO': { color: 'bg-green-100 text-green-700', icon: '✓', label: 'Aprovado' },
      'PENDENTE': { color: 'bg-yellow-100 text-yellow-700', icon: '⏱', label: 'Pendente' },
      'NEGADO': { color: 'bg-red-100 text-red-700', icon: '✕', label: 'Negado' },
      'CONCLUIDO': { color: 'bg-blue-100 text-blue-700', icon: '✓', label: 'Concluído' },
      'CANCELADO': { color: 'bg-gray-100 text-gray-700', icon: '✕', label: 'Cancelado' }
    };
    return badges[status] || badges['PENDENTE'];
  };

  const filteredDescartes = filterStatus === 'TODOS' 
    ? descartes 
    : descartes.filter(d => d.status === filterStatus);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-xl text-gray-600">Carregando...</div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Cabeçalho */}
      <div className="mb-8 flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Meus Descartes</h1>
          <p className="text-gray-600">Acompanhe o status de todos os seus registros de descarte</p>
        </div>
        <button
          onClick={() => navigate('/materiais/novo')}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium"
        >
          <Plus className="w-5 h-5" />
          Novo Material
        </button>
      </div>

      {/* Filtros por Status */}
      <div className="mb-6 flex gap-2 flex-wrap">
        <button
          onClick={() => setFilterStatus('TODOS')}
          className={`px-4 py-2 rounded-lg font-medium transition ${
            filterStatus === 'TODOS'
              ? 'bg-green-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Todos
        </button>
        <button
          onClick={() => setFilterStatus('PENDENTE')}
          className={`px-4 py-2 rounded-lg font-medium transition ${
            filterStatus === 'PENDENTE'
              ? 'bg-green-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Pendente
        </button>
        <button
          onClick={() => setFilterStatus('APROVADO')}
          className={`px-4 py-2 rounded-lg font-medium transition ${
            filterStatus === 'APROVADO'
              ? 'bg-green-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Aprovado
        </button>
        <button
          onClick={() => setFilterStatus('NEGADO')}
          className={`px-4 py-2 rounded-lg font-medium transition ${
            filterStatus === 'NEGADO'
              ? 'bg-green-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Negado
        </button>
      </div>

      {/* Lista de Descartes */}
      <div className="space-y-4">
        {filteredDescartes.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <p className="text-gray-500">Nenhum descarte encontrado</p>
          </div>
        ) : (
          filteredDescartes.map((descarte) => {
            const badge = getStatusBadge(descarte.status);
            return (
              <div
                key={descarte.id}
                className="bg-white rounded-lg shadow p-6 hover:shadow-md transition"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    {/* Material e Status */}
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-xl font-bold text-gray-900">
                        {descarte.material?.nome || 'Material'}
                      </h3>
                      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${badge.color}`}>
                        <span>{badge.icon}</span>
                        {badge.label}
                      </span>
                    </div>

                    {/* Informações */}
                    <div className="space-y-1 text-gray-600">
                      {descarte.material?.categoria && (
                        <p className="text-sm">
                          <span className="font-medium">Categoria:</span> {descarte.material.categoria}
                        </p>
                      )}
                      <p className="text-sm">
                        <span className="font-medium">Quantidade:</span> {descarte.quantidade} {descarte.unidadeMedida?.toLowerCase()}
                      </p>
                      <p className="text-sm">
                        <span className="font-medium">Ponto:</span> {descarte.pontoColeta?.nome || 'Ponto de Coleta'}
                      </p>
                      <p className="text-sm text-gray-400">
                        📅 {new Date(descarte.dataCriacao).toLocaleDateString('pt-BR', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>

                  {/* Botão Cancelar (apenas para PENDENTE) */}
                  {descarte.status === 'PENDENTE' && (
                    <button
                      onClick={() => handleCancelar(descarte.id)}
                      className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                    >
                      <Trash2 className="w-4 h-4" />
                      Cancelar
                    </button>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
