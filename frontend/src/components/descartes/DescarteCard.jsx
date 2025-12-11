import React from 'react';
import { Trash2, Calendar, MapPin, Phone, Package } from 'lucide-react';
import StatusBadge from './StatusBadge';

const displayStatus = (status) => {
    if (status === 'CONCLUIDO') return 'APROVADO';
    if (status === 'CANCELADO') return 'NEGADO';
    return status;
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

          {/* Bloco de Detalhes - Agora Vertical */}
          <div className="space-y-2 text-sm text-gray-600 mt-2">
            
            {/* Quantidade */}
            <p className="flex items-center gap-2">
              <span className="font-semibold text-gray-900 w-20">Quantidade:</span> 
              <span>{descarte.quantidade} {descarte.unidadeMedida?.toLowerCase() || 'un'}</span>
            </p>

            {/* Ponto (Movi para cima para ficar junto do endereço) */}
            <p className="flex items-center gap-2">
              <span className="font-semibold text-gray-900 w-20">Local:</span> 
              <span>{descarte.pontoColetaNome || 'Ponto de Coleta'}</span>
            </p>

            {/* Endereço */}
            <p className="flex items-start gap-2">
              <span className="font-semibold text-gray-900 w-20">Endereço:</span> 
              <span className="flex-1">{descarte.pontoColetaEndereco || 'Não informado'}</span>
            </p>

            {/* Telefone */}
            <p className="flex items-center gap-2">
              <span className="font-semibold text-gray-900 w-20">Contato:</span> 
              <span>{descarte.pontoColetaTelefone || 'N/A'}</span>
            </p>

            {/* Data */}
            <p className="flex items-center gap-2 text-gray-400 text-xs pt-2">
               <Calendar className="w-3 h-3" />
               Registrado em {new Date(descarte.dataCriacao).toLocaleDateString('pt-BR')}
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