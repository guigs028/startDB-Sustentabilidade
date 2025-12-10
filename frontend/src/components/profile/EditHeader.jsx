import { X } from 'lucide-react';

export default function EditHeader({ onCancel }) {
  return (
    <div className="flex items-center justify-between mb-8">
      <h1 className="text-2xl font-bold text-gray-900">Editar Perfil</h1>
      <button
        onClick={onCancel}
        className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition"
      >
        <X className="w-4 h-4" />
        Cancelar
      </button>
    </div>
  );
}