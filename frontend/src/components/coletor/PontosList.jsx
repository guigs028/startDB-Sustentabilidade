import { Plus } from 'lucide-react';
import PontoCard from './PontoCard';

export default function PontosList({ pontos, onEdit, onDelete, onNew }) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold text-gray-800">Pontos Cadastrados ({pontos.length})</h2>
        <button
          onClick={onNew}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Novo Ponto
        </button>
      </div>

      {pontos.length === 0 ? (
        <div className="bg-white rounded-xl p-12 text-center shadow-sm border border-gray-100">
          <div className="text-6xl mb-4">📍</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Nenhum ponto cadastrado
          </h3>
          <p className="text-gray-500 mb-6">
            Crie seu primeiro ponto de coleta para começar a receber descartes
          </p>
          <button
            onClick={onNew}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition inline-flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Cadastrar Primeiro Ponto
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {pontos.map((ponto) => (
            <PontoCard
              key={ponto.id}
              ponto={ponto}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}
