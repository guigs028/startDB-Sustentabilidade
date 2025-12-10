export default function PontosStats({ pontosAtivos, entregasRecebidas }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500 mb-1">Pontos Ativos</p>
            <p className="text-3xl font-bold text-green-600">{pontosAtivos}</p>
          </div>
          <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
            <span className="text-2xl">📍</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500 mb-1">Entregas Recebidas</p>
            <p className="text-3xl font-bold text-blue-600">{entregasRecebidas}</p>
          </div>
          <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
            <span className="text-2xl">📦</span>
          </div>
        </div>
      </div>
    </div>
  );
}
