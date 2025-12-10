import { User, Phone, MapPin, Save } from 'lucide-react';

export default function EditForm({ formData, handleChange, handleSubmit, loading, onCancel }) {
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Nome */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4" />
            Nome
          </div>
        </label>
        <input
          type="text"
          name="nome"
          value={formData.nome}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
          placeholder="Seu nome completo"
          maxLength={100}
        />
        <p className="mt-1 text-sm text-gray-500">
          {formData.nome.length}/100 caracteres
        </p>
      </div>

      {/* Telefone */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4" />
            Telefone
          </div>
        </label>
        <input
          type="tel"
          name="telefone"
          value={formData.telefone}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
          placeholder="(11) 99999-9999"
          maxLength={15}
        />
        <p className="mt-1 text-sm text-gray-500">
          Entre 10 e 15 caracteres
        </p>
      </div>

      {/* Endereço */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            Endereço
          </div>
        </label>
        <textarea
          name="endereco"
          value={formData.endereco}
          onChange={handleChange}
          rows={3}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition resize-none"
          placeholder="Rua, número, bairro, cidade"
          maxLength={200}
        />
        <p className="mt-1 text-sm text-gray-500">
          {formData.endereco.length}/200 caracteres
        </p>
      </div>

      {/* Botões de Ação */}
      <div className="flex gap-4 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium"
          disabled={loading}
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="flex-1 flex items-center justify-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={loading}
        >
          <Save className="w-5 h-5" />
          {loading ? 'Salvando...' : 'Salvar Alterações'}
        </button>
      </div>
    </form>
  );
}