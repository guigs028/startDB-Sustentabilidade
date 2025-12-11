import React from 'react';
import { Clock, CheckCircle, XCircle } from 'lucide-react';

export default function StatusBadge({ status }) {
  const styles = {
    'APROVADO': { bg: 'bg-green-100', text: 'text-green-800', icon: <CheckCircle className="w-3 h-3" />, label: 'Aprovado' },
    'PENDENTE': { bg: 'bg-[#FEF9C3]', text: 'text-yellow-800', icon: <Clock className="w-3 h-3" />, label: 'Pendente' },
    'NEGADO': { bg: 'bg-red-100', text: 'text-red-800', icon: <XCircle className="w-3 h-3" />, label: 'Negado' },
    'CONCLUIDO': { bg: 'bg-green-100', text: 'text-green-800', icon: <CheckCircle className="w-3 h-3" />, label: 'Aprovado' },
    'CANCELADO': { bg: 'bg-red-100', text: 'text-red-800', icon: <XCircle className="w-3 h-3" />, label: 'Negado' },
  };
  
  const config = styles[status] || styles['PENDENTE'];

  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${config.bg} ${config.text}`}>
      {config.icon} {config.label}
    </span>
  );
}