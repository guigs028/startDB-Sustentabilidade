import { MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function PointsList({ pontos }) {
  const navigate = useNavigate();

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold text-gray-800 px-1">Pontos de Coleta ({pontos.length})</h2>
      
      {pontos.map((ponto) => (
        <div key={ponto.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:shadow-md transition">
          <div className="flex-1">
            <h3 className="font-bold text-gray-900 text-lg">{ponto.nome}</h3>
            <div className="flex items-center text-gray-500 text-sm mt-1 mb-3">
              <div className="flex items-center text-gray-500 text-sm mt-1 mb-3">
                <MapPin className="w-4 h-4 mr-1 text-green-600" />
                {ponto.endereco}
                <span className="mx-2 text-gray-300">|</span> 
                {ponto.contato}
            </div>
            </div>
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
      
      {pontos.length === 0 && (
        <p className="text-center text-gray-500 py-8">Nenhum ponto encontrado com os filtros atuais.</p>
      )}
    </div>
  );
}