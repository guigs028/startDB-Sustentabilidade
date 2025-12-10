export default function StatusAlerts({ error, success }) {
  if (!error && !success) return null;

  return (
    <>
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700">
          Perfil atualizado com sucesso! Redirecionando...
        </div>
      )}
    </>
  );
}