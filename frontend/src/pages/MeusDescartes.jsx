import { useState, useEffect } from 'react';
import api from '../services/api';
import DescartesHeader from '../components/descartes/DescartesHeader';
import DescartesFilter from '../components/descartes/DescartesFilter';
import DescarteCard from '../components/descartes/DescarteCard';

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

  // logica para remoção de um descarte
  const handleCancelar = async (id) => {
    if (!window.confirm('Deseja realmente cancelar este descarte?')) return;
    
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