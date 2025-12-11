export default function PontosStats({ pontosAtivos, entregasPendentes, materiaisAceitos }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500 mb-1">Pontos Ativos</p>
            <p className="text-3xl font-bold text-green-600">{pontosAtivos}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500 mb-1">Entregas Pendentes</p>
            <p className="text-3xl font-bold text-blue-600">{entregasPendentes}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500 mb-1">Materiais Aceitos</p>
            <p className="text-3xl font-bold text-purple-600">{materiaisAceitos}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
