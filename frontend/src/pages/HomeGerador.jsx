import { useState, useEffect } from 'react';
import api from '../services/api';

// Importação dos Componentes Modulares
import Header from '../components/gerador/Header';
import FilterBar from '../components/gerador/FilterBar';
import PointsList from '../components/gerador/PointsList';
import HistorySidebar from '../components/gerador/HistorySidebar';

export default function HomeGerador() {
  // states
  const [pontos, setPontos] = useState([]);
  const [descartes, setDescartes] = useState([]);
  const [materiais, setMateriais] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMaterial, setSelectedMaterial] = useState('');

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
        <div className="lg:col-span-2">
          <Header />
          
          <FilterBar 
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedMaterial={selectedMaterial}
            setSelectedMaterial={setSelectedMaterial}
            materiais={materiais}
          />
          
          <PointsList pontos={filteredPontos} />
        </div>

        {/* Sidebar (Direita) */}
        <div className="lg:col-span-1">
          <HistorySidebar descartes={descartes} />
        </div>

      </div>
    </div>
  );
}