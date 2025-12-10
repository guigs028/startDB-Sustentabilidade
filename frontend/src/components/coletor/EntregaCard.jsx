export default function EntregaCard({ entrega, onAprovar, onNegar }) {
  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h4 className="font-semibold text-gray-900">{entrega.geradorNome || 'Gerador'}</h4>
          <p className="text-sm text-gray-600 mt-1">
            {entrega.materialNome} - {entrega.quantidade} {entrega.unidadeMedida || 'kg'}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Local: {entrega.pontoColetaNome}
          </p>
          <p className="text-xs text-gray-400">
            {new Date(entrega.dataCriacao).toLocaleDateString('pt-BR')}
          </p>
        </div>
        <span className="px-3 py-1 bg-yellow-50 text-yellow-700 text-xs font-medium rounded-full">
          Pendente
        </span>
      </div>
      
      <div className="flex gap-2 mt-4">
        <button
          onClick={() => onAprovar(entrega.id)}
          className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition"
        >
          Aprovar
        </button>
        <button
          onClick={() => onNegar(entrega.id)}
          className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition"
        >
          Negar
        </button>
      </div>
    </div>
  );
}
