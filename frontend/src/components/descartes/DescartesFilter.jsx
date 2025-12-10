import React from 'react';

export default function DescartesFilter({ currentFilter, setFilter }) {
  const filters = [
    { id: 'TODOS', label: 'Todos' },
    { id: 'PENDENTE', label: 'Pendente' },
    { id: 'APROVADO', label: 'Aprovado' },
    { id: 'NEGADO', label: 'Negado' }
  ];

  return (
    <div className="flex gap-2 mb-8 flex-wrap">
      {filters.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setFilter(tab.id)}
          className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${
            currentFilter === tab.id
              ? 'bg-[#00684A] text-white shadow-md'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}