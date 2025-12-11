import { useState, useEffect } from 'react';
import api from '../services/api';
import DescartesHeader from '../components/descartes/DescartesHeader';
import DescartesFilter from '../components/descartes/DescartesFilter';
import DescarteCard from '../components/descartes/DescarteCard';
import { useLocation } from 'react-router-dom'; 
import { Info, X } from 'lucide-react';

export default function MeusDescartes() {
  const [descartes, setDescartes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('TODOS');
  const location = useLocation();
  const [showOrientation, setShowOrientation] = useState(false);

  useEffect(() => {
    loadDescartes();
  if (location.state?.novoRegistro) {
        setShowOrientation(true);
        window.history.replaceState({}, document.title);
    }
  }, [location]);

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

  // logica para remoção de um descarte
  const handleCancelar = async (id) => {
    if (!window.confirm('Deseja realmente cancelar este descarte?')) return; // tirar isso e fazer modal
    
    try {
      await api.delete(`/descartes/${id}`);
      loadDescartes(); // Recarrega a lista
    } catch (error) {
      console.log(error); // para depurar posteriormente => vamos precisar mexer nisto 
      alert('Erro ao cancelar descarte.');
    }
  };

  const filteredDescartes = filterStatus === 'TODOS' 
    ? descartes 
    : descartes.filter(d => {
        if (filterStatus === 'APROVADO') {
          return d.status === 'CONCLUIDO' || d.status === 'APROVADO' || d.status === 'AGENDADO';
        }
        if (filterStatus === 'NEGADO') {
          return d.status === 'CANCELADO' || d.status === 'NEGADO';
        }
        
        return d.status === filterStatus;  
      });

  if (loading) return <div className="py-12 text-center text-gray-500">Carregando...</div>;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 bg-gray-50 min-h-screen">
      
      <DescartesHeader />
        {showOrientation && (
          <div className="mb-6 bg-blue-50 border border-blue-200 rounded-xl p-4 relative animate-fade-in shadow-sm">
            <button 
              onClick={() => setShowOrientation(false)}
              className="absolute top-4 right-4 text-blue-400 hover:text-blue-600"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="flex gap-3">
              <div className="bg-blue-100 p-2 rounded-lg h-fit">
                <Info className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-bold text-blue-900 text-lg mb-1">
                  Solicitação enviada! E agora?
                </h3>
                <ul className="text-blue-800 text-sm space-y-2 mt-2">
                  <li className="flex items-center gap-2">
                    <span className="bg-blue-200 text-blue-800 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold">1</span>
                    Aguarde o ponto de coleta <strong>APROVAR</strong> sua solicitação.
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="bg-blue-200 text-blue-800 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold">2</span>
                    Fique de olho no status aqui nesta tela.
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="bg-blue-200 text-blue-800 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold">3</span>
                    Assim que aprovado, leve o material ao endereço indicado.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
      <DescartesFilter 
        currentFilter={filterStatus} 
        setFilter={setFilterStatus} 
      />

      <div className="space-y-4">
        {filteredDescartes.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg border border-dashed border-gray-200">
            <p className="text-gray-500">Nenhum descarte encontrado.</p>
          </div>
        ) : (
          filteredDescartes.map((descarte) => (
            <DescarteCard 
              key={descarte.id} 
              descarte={descarte} 
              onCancel={handleCancelar} 
            />
          ))
        )}
      </div>
    </div>
  );
}