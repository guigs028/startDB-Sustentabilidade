import React from 'react';
import { Trash2, Calendar } from 'lucide-react';
import StatusBadge from './StatusBadge';

const displayStatus = (status) => {
    return status === 'CONCLUIDO' ? 'APROVADO' : status;
};

export default function DescarteCard({ descarte, onCancel }) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
        
        {/* Informações */}
        <div className="flex-1 space-y-3">
          <div className="flex items-center gap-3 flex-wrap">
            <h3 className="text-xl font-bold text-gray-900">
              {descarte.materialNome || 'Material'} 
            </h3>
            <StatusBadge status={displayStatus(descarte.status)} />
          </div>

          <div className="space-y-1 text-sm text-gray-600">
            <p>
              <span className="font-semibold text-gray-900">Quantidade:</span> {descarte.quantidade} {descarte.unidadeMedida?.toLowerCase() || 'un'}
            </p>
            <p className="flex items-center gap-1">
              <span className="font-semibold text-gray-900">Ponto:</span> {descarte.pontoColetaNome || 'Ponto de Coleta'}
            </p>
            <p className="flex items-center gap-1 text-gray-400 text-xs pt-1">
               <Calendar className="w-3 h-3" />
               {new Date(descarte.dataCriacao).toLocaleDateString('pt-BR')}
            </p>
          </div>
        </div>

        {/* Ações */}
        {descarte.status === 'PENDENTE' && (
          <button
            onClick={() => onCancel(descarte.id)}
            className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition text-sm font-medium self-start sm:self-center ml-auto sm:ml-0"
          >
            <Trash2 className="w-4 h-4" />
            Cancelar
          </button>
        )}
      </div>
    </div>
  );
}