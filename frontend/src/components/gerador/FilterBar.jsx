import { Search } from 'lucide-react';

export default function FilterBar({ searchTerm, setSearchTerm, selectedMaterial, setSelectedMaterial, materiais }) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6 space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Buscar por nome ou endereço..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-transparent focus:bg-white focus:border-green-500 rounded-lg transition outline-none"
        />
      </div>
      
      <div className="relative">
        <select
          value={selectedMaterial}
          onChange={(e) => setSelectedMaterial(e.target.value)}
          className="w-full px-4 py-3 bg-gray-50 border border-transparent focus:bg-white focus:border-green-500 rounded-lg text-gray-600 appearance-none outline-none cursor-pointer"
        >
          <option value="">Todos os materiais</option>
          {materiais.map((m) => (
            <option key={m.id} value={m.nome}>{m.nome}</option>
          ))}
        </select>
      </div>
    </div>
  );
}