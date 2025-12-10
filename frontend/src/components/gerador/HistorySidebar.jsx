import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function HistorySidebar({ descartes }) {
  const navigate = useNavigate();

  const getStatusColor = (status) => {
    const map = {
      'APROVADO': 'text-green-700 bg-green-50 border-green-200',
      'PENDENTE': 'text-yellow-700 bg-yellow-50 border-yellow-200',
      'NEGADO': 'text-red-700 bg-red-50 border-red-200',
      'CONCLUIDO': 'text-blue-700 bg-blue-50 border-blue-200'
    };
    return map[status] || 'text-gray-600 bg-gray-50';
  };

  return (
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
              <span className="font-bold text-gray-800 text-sm">
                {d.materialNome || 'Material'} 
              </span>
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
  );
}