import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, ArrowRight, Clock } from 'lucide-react';
import api from '../services/api';

export default function HomeGerador() {
  const navigate = useNavigate();
  const [pontos, setPontos] = useState([]);
  const [descartes, setDescartes] = useState([]);
  const [materiais, setMateriais] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMaterial, setSelectedMaterial] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [pontosRes, descartesRes, materiaisRes] = await Promise.allSettled([
        api.get('/pontos'),
        api.get('/descartes/historico'),
        api.get('/materiais')
      ]);
      
      if (pontosRes.status === 'fulfilled') setPontos(pontosRes.value.data);
      if (descartesRes.status === 'fulfilled') setDescartes(descartesRes.value.data);
      if (materiaisRes.status === 'fulfilled') setMateriais(materiaisRes.value.data);
      
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredPontos = pontos.filter(ponto => {
    // busca textual )Nome ou Endereço)
    const matchesSearch = ponto.nome?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          ponto.endereco?.toLowerCase().includes(searchTerm.toLowerCase());
    
    // filtra por Material 
    if (selectedMaterial) {
        const aceitaMaterial = ponto.materiais?.some(m => m.nome === selectedMaterial);
        
        return matchesSearch && aceitaMaterial;
    }

    return matchesSearch;
  });

  const getStatusColor = (status) => {
    const map = {
        'APROVADO': 'text-green-700 bg-green-50 border-green-200',
        'PENDENTE': 'text-yellow-700 bg-yellow-50 border-yellow-200',
        'NEGADO': 'text-red-700 bg-red-50 border-red-200',
        'CONCLUIDO': 'text-blue-700 bg-blue-50 border-blue-200'
    };
    return map[status] || 'text-gray-600 bg-gray-50';
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center text-gray-500">Carregando...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-gray-50 min-h-screen">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Coluna Esquerda - Principal */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
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
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-transparent focus:bg-white focus:border-green-500 rounded-lg transition outline-none"
                  />
                </div>
                
                <div className="relative">
                    <select
                        value={selectedMaterial}
                        onChange={(e) => setSelectedMaterial(e.target.value)}
                        className="w-full px-4 py-3 bg-gray-50 border border-transparent focus:bg-white focus:border-green-500 rounded-lg text-gray-600 appearance-none outline-none cursor-pointer"
                    >
                        <option value="">Todos os materiais</option>
                        {materiais.map((m) => (
                            <option key={m.id} value={m.nome}>{m.nome}</option>
                        ))}
                    </select>
                </div>
              </div>
            </div>

            <div className="space-y-4">
               <h2 className="text-lg font-bold text-gray-800 px-1">Pontos de Coleta ({filteredPontos.length})</h2>
               {filteredPontos.map((ponto) => (
                  <div key={ponto.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:shadow-md transition">
                      <div className="flex-1">
                          <h3 className="font-bold text-gray-900 text-lg">{ponto.nome}</h3>
                          <div className="flex items-center text-gray-500 text-sm mt-1 mb-3">
                              <MapPin className="w-4 h-4 mr-1 text-green-600" />
                              {ponto.endereco}
                          </div>
                          {/* Tags de materiais com fundo azul claro */}
                          <div className="flex gap-2 flex-wrap">
                              {ponto.materiais?.map((m, i) => (
                                  <span key={i} className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-semibold rounded-md">
                                      {m.nome || m}
                                  </span>
                              ))}
                          </div>
                      </div>
                      <button 
                        onClick={() => navigate(`/descartes/novo?pontoId=${ponto.id}`)}
                        className="bg-[#00684A] hover:bg-[#00523a] text-white px-6 py-2.5 rounded-lg font-medium transition whitespace-nowrap shadow-sm"
                      >
                          Registrar Descarte
                      </button>
                  </div>
               ))}
            </div>
          </div>

          {/* Coluna Direita - Meus Descartes (Histórico) */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 sticky top-6">
               <div className="flex justify-between items-center mb-6">
                  <h2 className="font-bold text-gray-900">Meus Descartes</h2>
                  <button onClick={() => navigate('/descartes')} className="p-2 bg-green-50 rounded-lg text-green-700 hover:bg-green-100 transition">
                      <ArrowRight className="w-4 h-4" />
                  </button>
               </div>

               <div className="space-y-3">
                  {descartes.slice(0, 4).map((d) => (
                      <div key={d.id} className="border border-gray-100 rounded-xl p-4 hover:border-green-200 transition bg-white">
                          <div className="flex justify-between items-start mb-3">
                              {/* Nome do Material */}
                              <span className="font-bold text-gray-800 text-sm">
                                {d.materialNome || 'Material'} 
                              </span>
                              {/* Badge de Status Pequeno */}
                              <span className={`px-2 py-0.5 rounded text-[10px] font-bold border uppercase tracking-wide ${getStatusColor(d.status)}`}>
                                  {d.status}
                              </span>
                          </div>
                          <div className="text-sm text-gray-500 space-y-1">
                             <p>{d.quantidade} {d.unidadeMedida?.toLowerCase()}</p>
                             <p className="text-xs text-gray-400">{new Date(d.dataCriacao).toLocaleDateString('pt-BR')}</p>
                          </div>
                      </div>
                  ))}
                  {descartes.length === 0 && <p className="text-gray-400 text-center py-8 text-sm">Sem histórico recente.</p>}
               </div>
            </div>
          </div>
        </div>
      </div>
  );
}