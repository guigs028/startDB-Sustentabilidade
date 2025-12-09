import { MapPin, Clock, Trash2 } from 'lucide-react';
import Button from '../ui/Button';

export default function PontoCard({ ponto, onEdit, onDelete }) {
  const { nome, endereco, horarios, distancia, materiais, totalEntregas } = ponto;

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-semibold text-[#212121]">{nome}</h3>
        <span className="px-3 py-1 bg-[#2E7D32]/10 text-[#2E7D32] text-sm font-medium rounded-full">
          Ativo
        </span>
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex items-start gap-2 text-gray-600">
          <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0" />
          <span className="text-sm">{endereco}</span>
        </div>

        {horarios && (
          <div className="flex items-center gap-2 text-gray-600">
            <Clock className="w-5 h-5 flex-shrink-0" />
            <span className="text-sm">{horarios}</span>
          </div>
        )}

        {distancia && (
          <div className="flex items-center gap-2 text-gray-600">
            <Clock className="w-5 h-5" />
            <span className="text-sm">{distancia} km</span>
          </div>
        )}
      </div>

      <div className="mb-4">
        <p className="text-sm font-medium text-gray-700 mb-2">Materiais Aceitos:</p>
        <div className="flex flex-wrap gap-2">
          {materiais && materiais.map((material) => (
            <span
              key={material.id}
              className="px-3 py-1 bg-[#1565C0]/10 text-[#1565C0] text-xs font-medium rounded-full"
            >
              {material.nome}
            </span>
          ))}
        </div>
      </div>

      {totalEntregas !== undefined && (
        <div className="flex items-center gap-2 text-gray-500 text-sm mb-4">
          <span>📦 {totalEntregas} entregas recebidas</span>
        </div>
      )}

      <div className="flex gap-2 pt-4 border-t border-gray-100">
        <Button
          variant="outline"
          className="flex-1"
          onClick={() => onEdit(ponto)}
        >
          Editar Ponto
        </Button>
        <Button
          variant="danger"
          className="px-4"
          onClick={() => onDelete(ponto.id)}
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
