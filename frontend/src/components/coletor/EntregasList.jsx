import EntregaCard from './EntregaCard';

export default function EntregasList({ entregas, onAprovar, onNegar }) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold text-gray-800">
        Entregas Recebidas ({entregas.length})
      </h2>

      {entregas.length === 0 ? (
        <div className="bg-white rounded-x1 p-12 text-center shadow-sm border border-gray-100">
          <div className="text-6xl mb-4">📦</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Nenhuma entrega pendente
          </h3>
          <p className="text-gray-500">
            Aguarde descartes dos geradores nos seus pontos de coleta
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {entregas.map((entrega) => (
            <EntregaCard
              key={entrega.id}
              entrega={entrega}
              onAprovar={onAprovar}
              onNegar={onNegar}
            />
          ))}
        </div>
      )}
    </div>
  );
}
