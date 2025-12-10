export default function RecentActivity({ descartes }) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-bold text-gray-900 mb-4">Meus Descartes Recentes</h2>
      
      {descartes.length === 0 ? (
        <p className="text-gray-500 text-center py-4">Nenhum descarte registrado ainda</p>
      ) : (
        <div className="space-y-3">
          {descartes.slice(0, 5).map((descarte, index) => (
            <div 
              key={descarte.id || index} // 
              className="flex items-center justify-between p-3 border border-gray-200 rounded-lg"
            >
              <div>
                <p className="font-medium text-gray-900">
                    {descarte.materialNome || descarte.material?.nome || 'Material sem nome'}
                </p> 
                
                <p className="text-sm text-gray-500">
                  {descarte.quantidade} {descarte.unidadeMedida?.toLowerCase()} - {descarte.pontoColetaNome || descarte.pontoColeta?.nome || 'Ponto de Coleta'}
                </p>
              </div>

              <span className="text-sm text-green-600 font-medium">
                {descarte.dataCriacao ? new Date(descarte.dataCriacao).toLocaleDateString('pt-BR') : '-'}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}