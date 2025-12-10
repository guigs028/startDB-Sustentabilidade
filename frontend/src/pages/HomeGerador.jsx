import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Plus } from 'lucide-react';
import api from '../services/api';

export default function HomeGerador() {
  const navigate = useNavigate();
  const [pontos, setPontos] = useState([]);
  const [descartes, setDescartes] = useState([]);
  const [meusMateriais, setMeusMateriais] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMaterial, setSelectedMaterial] = useState('');
  const [materiais, setMateriais] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [pontosRes, descartesRes, materiaisRes, meusMateriaisRes] = await Promise.allSettled([
        api.get('/pontos'),
        api.get('/descartes/historico'),
        api.get('/materiais'),
        api.get('/materiais/meus')
      ]);
      
      if (pontosRes.status === 'fulfilled') {
        setPontos(pontosRes.value.data);
      }
      if (descartesRes.status === 'fulfilled') {
        setDescartes(descartesRes.value.data);
      }
      if (materiaisRes.status === 'fulfilled') {
        setMateriais(materiaisRes.value.data);
      }
      if (meusMateriaisRes.status === 'fulfilled') {
        setMeusMateriais(meusMateriaisRes.value.data);
      }
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredPontos = pontos.filter(ponto => {
    const matchesSearch = ponto.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ponto.endereco.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesMaterial = !selectedMaterial || 
                           ponto.materiais?.some(m => m.nome === selectedMaterial);
    return matchesSearch && matchesMaterial;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'APROVADO':
        return 'bg-green-100 text-green-700';
      case 'PENDENTE':
        return 'bg-yellow-100 text-yellow-700';
      case 'CONCLUIDO':
        return 'bg-blue-100 text-blue-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl text-gray-600">Carregando...</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Coluna Esquerda - Buscar Pontos */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">
                Onde Descartar Meus Resíduos?
              </h1>
              <p className="text-gray-600 mb-6">
                Encontre pontos de coleta próximos e registre seus descartes
              </p>

              {/* Barra de Busca */}
              <div className="mb-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Buscar por nome ou endereço..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Filtro por Material */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Filtrar por Material
                </label>
                <select
                  value={selectedMaterial}
                  onChange={(e) => setSelectedMaterial(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="">Todos os materiais</option>
                  {materiais.map((material) => (
                    <option key={material.id} value={material.nome}>
                      {material.nome}
                    </option>
                  ))}
                </select>
              </div>

              {/* Lista de Pontos de Coleta */}
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-gray-900">
                  Pontos de Coleta ({filteredPontos.length})
                </h2>
                
                {filteredPontos.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">
                    Nenhum ponto de coleta encontrado
                  </p>
                ) : (
                  filteredPontos.map((ponto) => (
                    <div
                      key={ponto.id}
                      className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {ponto.nome}
                        </h3>
                        <button
                          onClick={() => navigate(`/descartes/novo?pontoId=${ponto.id}`)}
                          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition text-sm font-medium"
                        >
                          Registrar Descarte
                        </button>
                      </div>
                      
                      <p className="text-gray-600 text-sm mb-2">
                        📍 {ponto.endereco}
                      </p>
                      
                      <p className="text-gray-600 text-sm mb-3">
                        🕐 {ponto.horarios || 'Horário não informado'}
                      </p>
                      
                      <p className="text-gray-600 text-sm mb-2">
                        📏 {ponto.distancia || '2.3 km'}
                      </p>

                      {/* Tags de Materiais */}
                      <div className="flex flex-wrap gap-2 mt-3">
                        {ponto.materiais?.slice(0, 3).map((material, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium"
                          >
                            {material.nome || material}
                          </span>
                        ))}
                        {ponto.materiais?.length > 3 && (
                          <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                            +{ponto.materiais.length - 3} mais
                          </span>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Coluna Direita - Meus Materiais */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-900">
                  Meus Materiais
                </h2>
                <button
                  onClick={() => navigate('/materiais/novo')}
                  className="text-green-600 hover:text-green-700"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>

              <div className="max-h-96 overflow-y-auto space-y-3 pr-2">
                {meusMateriais.length === 0 ? (
                  <p className="text-gray-500 text-sm text-center py-8">
                    Nenhum material cadastrado
                  </p>
                ) : (
                  meusMateriais.map((material) => (
                    <div
                      key={material.id}
                      className="border border-gray-200 rounded-lg p-3 hover:shadow-sm transition"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <span className="font-medium text-gray-900 text-sm">
                          {material.nome}
                        </span>
                        <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                          {material.categoria}
                        </span>
                      </div>
                      
                      <p className="text-gray-600 text-xs mb-1">
                        Destino: {material.destino}
                      </p>
                      
                      <p className="text-gray-500 text-xs">
                        Unidade: {material.unidadePadrao || 'Un'}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}
