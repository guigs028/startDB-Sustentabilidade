import { useState, useEffect } from 'react';
import api from '../services/api';
import { Trash2, Calendar, Clock, CheckCircle, XCircle, MapPin } from 'lucide-react';

export default function MeusDescartes() {
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
    if (!window.confirm('Deseja realmente cancelar este descarte?')) return;
    
    try {
      // Nota: Certifique-se que o backend suporta DELETE neste endpoint
      await api.delete(`/descartes/${id}`);
      loadDescartes();
    } catch (error) {
      alert('Erro ao cancelar descarte.');
    }
  };

  const filteredDescartes = filterStatus === 'TODOS' 
    ? descartes 
    : descartes.filter(d => d.status === filterStatus);

  // Componente Badge atualizado conforme imagem
  const StatusBadge = ({ status }) => {
    const styles = {
      'APROVADO': { bg: 'bg-green-100', text: 'text-green-800', icon: <CheckCircle className="w-3 h-3" />, label: 'Aprovado' },
      'PENDENTE': { bg: 'bg-[#FEF9C3]', text: 'text-yellow-800', icon: <Clock className="w-3 h-3" />, label: 'Pendente' },
      'NEGADO': { bg: 'bg-red-100', text: 'text-red-800', icon: <XCircle className="w-3 h-3" />, label: 'Negado' },
      'CONCLUIDO': { bg: 'bg-blue-100', text: 'text-blue-800', icon: <CheckCircle className="w-3 h-3" />, label: 'Concluído' },
    };
    
    const config = styles[status] || styles['PENDENTE'];

    return (
      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${config.bg} ${config.text}`}>
        {config.icon} {config.label}
      </span>
    );
  };

  if (loading) return <div className="py-12 text-center text-gray-500">Carregando...</div>;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 bg-gray-50 min-h-screen">
      {/* Cabeçalho */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Meus Descartes</h1>
        <p className="text-gray-500">Acompanhe o status de todos os seus registros de descarte</p>
      </div>

      {/* Tabs de Filtro - Estilo da Imagem */}
      <div className="flex gap-2 mb-8 flex-wrap">
        {[
            { id: 'TODOS', label: 'Todos' },
            { id: 'PENDENTE', label: 'Pendente' },
            { id: 'APROVADO', label: 'Aprovado' },
            { id: 'NEGADO', label: 'Negado' }
        ].map((tab) => (
            <button
                key={tab.id}
                onClick={() => setFilterStatus(tab.id)}
                className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${
                    filterStatus === tab.id
                    ? 'bg-[#00684A] text-white shadow-md' // Verde escuro ativo
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300' // Cinza inativo
                }`}
            >
                {tab.label}
            </button>
        ))}
      </div>

      {/* Lista de Cards */}
      <div className="space-y-4">
        {filteredDescartes.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg border border-dashed border-gray-200">
            <p className="text-gray-500">Nenhum descarte encontrado.</p>
          </div>
        ) : (
          filteredDescartes.map((descarte) => (
            <div
              key={descarte.id}
              className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                
                {/* Lado Esquerdo: Informações */}
                <div className="flex-1 space-y-3">
                  <div className="flex items-center gap-3 flex-wrap">
                    {/* NOME DO MATERIAL (Vindo do DTO) */}
                    <h3 className="text-xl font-bold text-gray-900">
                      {descarte.materialNome || 'Material'} 
                    </h3>
                    <StatusBadge status={descarte.status} />
                  </div>

                  <div className="space-y-1 text-sm text-gray-600">
                    <p>
                      <span className="font-semibold text-gray-900">Quantidade:</span> {descarte.quantidade} {descarte.unidadeMedida?.toLowerCase() || 'un'}
                    </p>
                    <p className="flex items-center gap-1">
                      <span className="font-semibold text-gray-900">Ponto:</span> {descarte.pontoColetaNome || 'Ponto de Coleta'}
                    </p>
                    <p className="flex items-center gap-1 text-gray-400 text-xs pt-1">
                       <Calendar className="w-3 h-3" />
                       {new Date(descarte.dataCriacao).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                </div>

                {/* Lado Direito: Ações */}
                {descarte.status === 'PENDENTE' && (
                  <button
                    onClick={() => handleCancelar(descarte.id)}
                    className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition text-sm font-medium self-start sm:self-center ml-auto sm:ml-0"
                  >
                    <Trash2 className="w-4 h-4" />
                    Cancelar
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}