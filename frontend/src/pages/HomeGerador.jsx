import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, ArrowRight } from 'lucide-react';
import api from '../services/api';

export default function HomeGerador() {
  const navigate = useNavigate();
  const [pontos, setPontos] = useState([]);
  const [descartes, setDescartes] = useState([]); // Corrigido erro de sintaxe anterior
  const [meusMateriais, setMeusMateriais] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMaterial, setSelectedMaterial] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [pontosRes, descartesRes, meusMateriaisRes] = await Promise.allSettled([
        api.get('/pontos'), //
        api.get('/descartes/historico'), //
        api.get('/materiais') // Ajustado para endpoint de materiais gerais se necessário, ou /materiais/meus se for específico
      ]);
      
      if (pontosRes.status === 'fulfilled') setPontos(pontosRes.value.data);
      if (descartesRes.status === 'fulfilled') setDescartes(descartesRes.value.data);
      if (meusMateriaisRes.status === 'fulfilled') setMeusMateriais(meusMateriaisRes.value.data);
      
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredPontos = pontos.filter(ponto => {
    const matchesSearch = ponto.nome?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          ponto.endereco?.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Filtro simples no front. O ideal seria passar params para a API se a lista for grande
    // API aceita nome e materialId
    if (selectedMaterial) {
       // Lógica simplificada de filtro visual
       return matchesSearch && ponto.categoriasAceitas?.includes(selectedMaterial); // Adapte conforme estrutura do objeto
    }
    
    return matchesSearch;
  });

  const getStatusColor = (status) => {
    const map = {
        'APROVADO': 'text-green-600 bg-green-50 border-green-200',
        'PENDENTE': 'text-yellow-600 bg-yellow-50 border-yellow-200',
        'NEGADO': 'text-red-600 bg-red-50 border-red-200',
        'CONCLUIDO': 'text-blue-600 bg-blue-50 border-blue-200'
    };
    return map[status] || 'text-gray-600 bg-gray-50';
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center text-gray-500">Carregando...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-gray-50 min-h-screen">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Coluna Esquerda - Principal */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Onde Descartar Meus Resíduos?</h1>
              <p className="text-gray-500 mb-6">Encontre pontos de coleta próximos e registre seus descartes</p>

              {/* Busca e Filtro */}
              <div className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Buscar por nome ou endereço..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border-none rounded-lg focus:ring-2 focus:ring-green-500"
                  />
                </div>
                
                <select
                  value={selectedMaterial}
                  onChange={(e) => setSelectedMaterial(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border-none rounded-lg text-gray-600 focus:ring-2 focus:ring-green-500"
                >
                  <option value="">Todos os materiais</option>
                  {/* Populando com categorias únicas ou materiais */}
                  <option value="VIDRO">Vidro</option>
                  <option value="PLASTICO">Plástico</option>
                  <option value="METAL">Metal</option>
                  <option value="PAPEL">Papel</option>
                </select>
              </div>
            </div>

            <div className="space-y-4">
               <h2 className="text-lg font-bold text-gray-800 px-1">Pontos de Coleta ({filteredPontos.length})</h2>
               {filteredPontos.map((ponto) => (
                  <div key={ponto.id} className="bg-white p-6 rounded-xl shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                      <div>
                          <h3 className="font-bold text-gray-900 text-lg">{ponto.nome}</h3>
                          <div className="flex items-center text-gray-500 text-sm mt-1 mb-3">
                              <MapPin className="w-4 h-4 mr-1" />
                              {ponto.endereco}
                          </div>
                          <div className="flex gap-2 flex-wrap">
                              {ponto.materiais?.map((m, i) => ( // Ajuste conforme seu DTO, pode ser categoriasAceitas
                                  <span key={i} className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-md">
                                      {m.nome || m}
                                  </span>
                              ))}
                          </div>
                      </div>
                      <button 
                        onClick={() => navigate(`/descartes/novo?pontoId=${ponto.id}`)}
                        className="bg-green-700 hover:bg-green-800 text-white px-6 py-2 rounded-lg font-medium transition whitespace-nowrap"
                      >
                          Registrar Descarte
                      </button>
                  </div>
               ))}
            </div>
          </div>

          {/* Coluna Direita - Meus Descartes (Conforme Tela 2) */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl p-6 shadow-sm sticky top-6">
               <div className="flex justify-between items-center mb-6">
                  <h2 className="font-bold text-gray-900">Meus Descartes</h2>
                  <button onClick={() => navigate('/descartes')} className="p-2 bg-green-50 rounded-lg text-green-700 hover:bg-green-100">
                      <ArrowRight className="w-4 h-4" />
                  </button>
               </div>

               <div className="space-y-3">
                  {descartes.slice(0, 4).map((d) => (
                      <div key={d.id} className="border border-gray-100 rounded-lg p-4 hover:shadow-sm transition">
                          <div className="flex justify-between items-start mb-2">
                              <span className="font-bold text-gray-800">{d.material?.nome}</span>
                              <span className={`px-2 py-1 rounded text-[10px] font-bold border ${getStatusColor(d.status)}`}>
                                  {d.status}
                              </span>
                          </div>
                          <p className="text-sm text-gray-500">{d.quantidade} {d.unidadeMedida?.toLowerCase()}</p>
                          <p className="text-xs text-gray-400 mt-1">{d.pontoColeta?.nome}</p>
                          <p className="text-xs text-gray-400">{new Date(d.dataCriacao).toLocaleDateString('pt-BR')}</p>
                      </div>
                  ))}
                  {descartes.length === 0 && <p className="text-gray-400 text-center py-4">Sem histórico recente.</p>}
               </div>
            </div>
          </div>
        </div>
      </div>
  );
}