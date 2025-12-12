import { useState, useEffect } from 'react';
import api from '../services/api';
import { Map, List } from 'lucide-react'; // 1. Importe os ícones

// Importação dos Componentes Modulares
import Header from '../components/gerador/Header';
import FilterBar from '../components/gerador/FilterBar';
import PointsList from '../components/gerador/PointsList';
import PointsMap from '../components/gerador/PointsMap'; // 2. Importe o Mapa
import HistorySidebar from '../components/gerador/HistorySidebar';

export default function HomeGerador() {
  // states existentes
  const [pontos, setPontos] = useState([]);
  const [descartes, setDescartes] = useState([]);
  const [materiais, setMateriais] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMaterial, setSelectedMaterial] = useState('');

  // 3. NOVO STATE: Controla se mostramos a Lista ou o Mapa
  const [viewMode, setViewMode] = useState('list'); // 'list' ou 'map'

  useEffect(() => {
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
    loadData();
  }, []);

  // Lógica de Filtragem
  const filteredPontos = pontos.filter(ponto => {
    const matchesSearch = ponto.nome?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          ponto.endereco?.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (selectedMaterial) {
       return matchesSearch && ponto.materiais?.some(m => m.nome === selectedMaterial);
    }
    return matchesSearch;
  });

  if (loading) return <div className="min-h-screen flex items-center justify-center text-gray-500">Carregando...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-gray-50 min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Coluna Principal (Esquerda) */}
        <div className="lg:col-span-2 space-y-6"> {/* Adicionei space-y-6 para espaçamento */}
          <Header />
          
          <FilterBar 
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedMaterial={selectedMaterial}
            setSelectedMaterial={setSelectedMaterial}
            materiais={materiais}
          />

          {/* 4. BOTÕES DE ALTERNÂNCIA (TOGGLE) */}
          <div className="flex justify-end">
             <div className="bg-white p-1 rounded-lg border border-gray-200 flex shadow-sm">
                <button 
                    onClick={() => setViewMode('list')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition ${
                        viewMode === 'list' ? 'bg-[#00684A] text-white shadow-sm' : 'text-gray-600 hover:bg-gray-50'
                    }`}
                >
                    <List size={18} /> Lista
                </button>
                <button 
                    onClick={() => setViewMode('map')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition ${
                        viewMode === 'map' ? 'bg-[#00684A] text-white shadow-sm' : 'text-gray-600 hover:bg-gray-50'
                    }`}
                >
                    <Map size={18} /> Mapa
                </button>
            </div>
          </div>
          
          {/* 5. RENDERIZAÇÃO CONDICIONAL */}
          {/* Passamos 'filteredPontos' para ambos. Se o usuário filtrar, o mapa atualiza junto! */}
          <div className="transition-all duration-300">
             {viewMode === 'list' ? (
                <PointsList pontos={filteredPontos} />
             ) : (
                <PointsMap pontos={filteredPontos} />
             )}
          </div>

        </div>

        {/* Sidebar (Direita) */}
        <div className="lg:col-span-1">
          <HistorySidebar descartes={descartes} />
        </div>

      </div>
    </div>
  );
}