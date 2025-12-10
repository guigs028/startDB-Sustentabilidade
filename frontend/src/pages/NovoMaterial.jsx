import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { AlertCircle, CheckCircle, ArrowLeft, Package } from 'lucide-react';

export default function NovoMaterial() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nome: '',
    categoria: '',
    destino: '',
    unidadePadrao: ''
  });

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const categorias = [
    { value: 'PLASTICO', label: 'Plástico' },
    { value: 'PAPEL', label: 'Papel' },
    { value: 'METAL', label: 'Metal' },
    { value: 'VIDRO', label: 'Vidro' },
    { value: 'ORGANICO', label: 'Orgânico' },
    { value: 'ELETRONICO', label: 'Eletrônico' },
    { value: 'OLEO', label: 'Óleo' }
  ];

  const destinos = [
    { value: 'RECICLAGEM', label: 'Reciclagem' },
    { value: 'COMPOSTAGEM', label: 'Compostagem' },
    { value: 'REUSO', label: 'Reuso' },
    { value: 'DESCARTE_ESPECIAL', label: 'Descarte Especial' }
  ];

  const unidades = [
    { value: 'KILOGRAMA', label: 'Quilograma (kg)' },
    { value: 'LITRO', label: 'Litro (L)' },
    { value: 'UNIDADE', label: 'Unidade (un)' }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      await api.post('/materiais', formData);
      setSuccess(true);
      
      setTimeout(() => {
        navigate('/descartes');
      }, 2000);
    } catch (error) {
      console.error('Erro ao cadastrar material:', error);
      setError(error.response?.data?.message || 'Erro ao cadastrar material. Tente novamente.');
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
          <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-green-900 mb-2">
            Material Cadastrado com Sucesso!
          </h2>
          <p className="text-green-700 mb-4">
            O material foi adicionado ao sistema e já pode ser utilizado para descartes.
          </p>
          <p className="text-sm text-green-600">
            Redirecionando...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Cabeçalho */}
      <div className="mb-8">
        <button
          onClick={() => navigate('/descartes')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeft className="w-5 h-5" />
          Voltar
        </button>
        <div className="flex items-center gap-3 mb-2">
          <Package className="w-8 h-8 text-green-600" />
          <h1 className="text-3xl font-bold text-gray-900">
            Cadastrar Novo Material
          </h1>
        </div>
        <p className="text-gray-600">
          Adicione um novo tipo de material ao sistema
        </p>
      </div>

      {/* Formulário */}
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-6 space-y-6">
        
        {/* Erro */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <p className="text-red-800 text-sm">{error}</p>
          </div>
        )}

        {/* Nome do Material */}
        <div>
          <label htmlFor="nome" className="block text-sm font-medium text-gray-700 mb-2">
            Nome do Material *
          </label>
          <input
            type="text"
            id="nome"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            required
            placeholder="Ex: Garrafa PET, Caixa de Papelão, Lata de Alumínio..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
          <p className="mt-1 text-xs text-gray-500">
            Digite o nome que identifica o material
          </p>
        </div>

        {/* Categoria */}
        <div>
          <label htmlFor="categoria" className="block text-sm font-medium text-gray-700 mb-2">
            Categoria *
          </label>
          <select
            id="categoria"
            name="categoria"
            value={formData.categoria}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="">Selecione uma categoria</option>
            {categorias.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
          <p className="mt-1 text-xs text-gray-500">
            Escolha a categoria que melhor representa o material
          </p>
        </div>

        {/* Destino */}
        <div>
          <label htmlFor="destino" className="block text-sm font-medium text-gray-700 mb-2">
            Destino Final *
          </label>
          <select
            id="destino"
            name="destino"
            value={formData.destino}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="">Selecione o destino</option>
            {destinos.map((dest) => (
              <option key={dest.value} value={dest.value}>
                {dest.label}
              </option>
            ))}
          </select>
          <p className="mt-1 text-xs text-gray-500">
            Informe o destino adequado para esse tipo de material
          </p>
        </div>

        {/* Unidade de Medida */}
        <div>
          <label htmlFor="unidadePadrao" className="block text-sm font-medium text-gray-700 mb-2">
            Unidade de Medida Padrão *
          </label>
          <select
            id="unidadePadrao"
            name="unidadePadrao"
            value={formData.unidadePadrao}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="">Selecione a unidade</option>
            {unidades.map((uni) => (
              <option key={uni.value} value={uni.value}>
                {uni.label}
              </option>
            ))}
          </select>
          <p className="mt-1 text-xs text-gray-500">
            Defina como esse material será medido nos descartes
          </p>
        </div>

        {/* Botões */}
        <div className="flex gap-4 pt-4">
          <button
            type="button"
            onClick={() => navigate('/descartes')}
            className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={submitting}
            className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {submitting ? 'Cadastrando...' : 'Cadastrar Material'}
          </button>
        </div>
      </form>

      {/* Informações Adicionais */}
      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="font-semibold text-blue-900 mb-2">ℹ️ Sobre o Cadastro de Materiais</h3>
        <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
          <li>Materiais cadastrados ficam disponíveis para todos os usuários</li>
          <li>Escolha nomes claros e descritivos para facilitar a identificação</li>
          <li>A categoria ajuda na organização e filtragem dos materiais</li>
          <li>O destino final orienta sobre o tratamento adequado do material</li>
        </ul>
      </div>
    </div>
  );
}
