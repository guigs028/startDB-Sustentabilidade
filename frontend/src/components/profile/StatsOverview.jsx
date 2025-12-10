export default function StatsOverview({ total, approved, userType }) {
  const isColetor = userType === 'COLETOR';
  
  return (
    <div className="grid grid-cols-2 gap-4 mb-6">
      <div className="bg-white rounded-lg shadow p-6 text-center">
        <p className="text-sm text-gray-500 mb-2">
          {isColetor ? 'Pontos Cadastrados' : 'Descartes Registrados'}
        </p>
        <p className="text-3xl font-bold text-green-600">{total}</p>
      </div>
      <div className="bg-white rounded-lg shadow p-6 text-center">
        <p className="text-sm text-gray-500 mb-2">
          {isColetor ? 'Pontos Ativos' : 'Descartes Aprovados'}
        </p>
        <p className="text-3xl font-bold text-green-600">{approved}</p>
      </div>
    </div>
  );
}