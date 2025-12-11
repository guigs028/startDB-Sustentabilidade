import { MapPin, Clock, Pencil, Trash2, Phone } from 'lucide-react';

export default function PontoCard({ ponto, onEdit, onDelete }) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold text-gray-900">{ponto.nome}</h3>
        <span className="px-3 py-1 bg-green-50 text-green-600 text-xs font-medium rounded-full">
          Ativo
        </span>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-start gap-2 text-gray-600">
          <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
          <span className="text-sm">{ponto.endereco}</span>
        </div>

        {ponto.horarios && (
          <div className="flex items-center gap-2 text-gray-600">
            <Clock className="w-4 h-4 flex-shrink-0" />
            <span className="text-sm">{ponto.horarios}</span>
          </div>
        )}

        {ponto.contato && (
          <div className="flex items-center gap-2 text-gray-600">
            <Phone className="w-4 h-4 flex-shrink-0" />
            <span className="text-sm"> {ponto.contato}</span>
          </div>
        )}
      </div>

      <div className="mb-4">
        <p className="text-xs font-medium text-gray-700 mb-2">Materiais Aceitos:</p>
        <div className="flex flex-wrap gap-2">
          {ponto.materiais && ponto.materiais.length > 0 ? (
            ponto.materiais.map((material) => (
              <span
                key={material.id}
                className="px-2 py-1 bg-blue-50 text-blue-600 text-xs font-medium rounded-md"
              >
                {material.nome}
              </span>
            ))
          ) : (
            <span className="text-xs text-gray-400">Nenhum material informado</span>
          )}
        </div>
      </div>

      <div className="flex gap-2 pt-4 border-t border-gray-100">
        <button
          onClick={() => onEdit(ponto)}
          className="flex-1 flex items-center justify-center gap-2 bg-blue-50 hover:bg-blue-100 text-blue-600 px-4 py-2 rounded-lg font-medium transition"
        >
          <Pencil className="w-4 h-4" />
          Editar
        </button>
        <button
          onClick={() => onDelete(ponto.id)}
          className="flex items-center justify-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 px-4 py-2 rounded-lg font-medium transition"
        >
          <Trash2 className="w-4 h-4" />
          Excluir
        </button>
      </div>
    </div>
  );
}
