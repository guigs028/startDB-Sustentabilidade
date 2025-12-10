import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import api from '../services/api';
import { AlertCircle, CheckCircle, ArrowLeft, Package } from 'lucide-react';

export default function NovoDescarte() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const pontoId = searchParams.get('pontoId');

  const [ponto, setPonto] = useState(null);
  const [materiaisDisponiveis, setMateriaisDisponiveis] = useState([]);
  const [materialSelecionado, setMaterialSelecionado] = useState(null);
  
  const [formData, setFormData] = useState({
    quantidade: '',
    descricao: ''
  });

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const loadPontoColeta = async () => {
    try {
      setLoading(true);
      const [pontosRes, meusMateriaisRes] = await Promise.all([
        api.get('/pontos'),
        api.get('/materiais/meus')
      ]);
      
      const pontos = pontosRes.data;
      const pontoEncontrado = pontos.find(p => p.id === parseInt(pontoId));
      
      if (!pontoEncontrado) {
        setError('Ponto de coleta não encontrado');
        return;
      }

      setPonto(pontoEncontrado);

      // Obter categorias aceitas pelo ponto
      const categoriasAceitas = pontoEncontrado.categoriasAceitas || [];
      
      // Filtrar: materiais do usuário cuja categoria é aceita pelo ponto
      // Backend já retorna apenas materiais sem descartes
      const meusMateriais = meusMateriaisRes.data;
      const materiaisFiltrados = meusMateriais.filter(material => 
        categoriasAceitas.includes(material.categoria)
      );

      setMateriaisDisponiveis(materiaisFiltrados);
    } catch (error) {
      console.error('Erro ao carregar ponto de coleta:', error);
      setError('Erro ao carregar informações do ponto de coleta');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!pontoId) {
      setError('ID do ponto de coleta não informado');
      setLoading(false);
      return;
    }
    loadPontoColeta();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pontoId]);

  const handleMaterialClick = (material) => {
    setMaterialSelecionado(material);
    setError('');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!materialSelecionado) {
      setError('Selecione um material antes de continuar');
      return;
    }

    setError('');
    setSubmitting(true);

    try {
      const payload = {
        pontoColetaId: parseInt(pontoId),
        materialId: materialSelecionado.id,
        quantidade: parseFloat(formData.quantidade),
        descricao: formData.descricao || null
      };

      await api.post('/descartes', payload);
      setSuccess(true);
      
      setTimeout(() => {
        navigate('/descartes');
      }, 2000);
    } catch (error) {
      console.error('Erro ao criar descarte:', error);
      setError(error.response?.data?.message || 'Erro ao registrar descarte. Tente novamente.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-xl text-gray-600">Carregando...</div>
      </div>
    );
  }

  if (error && !ponto) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="bg-red-50 border border-red-200 rounded-lg p-8 text-center">
          <AlertCircle className="w-16 h-16 text-red-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-red-900 mb-2">Erro</h2>
          <p className="text-red-700 mb-4">{error}</p>
          <button
            onClick={() => navigate('/gerador')}
            className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Voltar para Home
          </button>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
          <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-green-900 mb-2">
            Descarte Registrado com Sucesso!
          </h2>
          <p className="text-green-700 mb-4">
            Seu descarte foi registrado e está aguardando aprovação do ponto de coleta.
          </p>
          <p className="text-sm text-green-600">
            Redirecionando para seus descartes...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Cabeçalho */}
      <div className="mb-8">
        <button
          onClick={() => navigate('/gerador')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeft className="w-5 h-5" />
          Voltar
        </button>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Registrar Descarte
        </h1>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-semibold text-blue-900 mb-1">
            📍 {ponto?.nome}
          </h3>
          <p className="text-sm text-blue-800">{ponto?.endereco}</p>
          <p className="text-sm text-blue-700 mt-1">🕐 {ponto?.horarios}</p>
        </div>
      </div>

      {/* Seleção de Material */}
      {!materialSelecionado ? (
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Selecione o Material que Deseja Descartar
          </h2>
          
          {materiaisDisponiveis.length === 0 ? (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-8 text-center">
              <AlertCircle className="w-12 h-12 text-yellow-600 mx-auto mb-3" />
              <h3 className="font-semibold text-yellow-900 mb-2">
                Nenhum Material Disponível
              </h3>
              <p className="text-yellow-800 mb-4">
                Não há materiais seus que possam ser descartados neste ponto. Isso pode acontecer porque:
              </p>
              <ul className="text-sm text-yellow-700 text-left max-w-md mx-auto space-y-1">
                <li>• Você ainda não cadastrou materiais compatíveis com este ponto</li>
                <li>• Todos os seus materiais já têm descartes pendentes ou aprovados</li>
              </ul>
              <button
                onClick={() => navigate('/materiais/novo')}
                className="mt-6 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium"
              >
                Cadastrar Novo Material
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {materiaisDisponiveis.map((material) => (
                <button
                  key={material.id}
                  onClick={() => handleMaterialClick(material)}
                  className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-green-500 hover:shadow-md transition text-left"
                >
                  <div className="flex items-start gap-3">
                    <Package className="w-8 h-8 text-green-600 flex-shrink-0" />
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 mb-1">
                        {material.nome}
                      </h3>
                      <span className="inline-block px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium mb-2">
                        {material.categoria}
                      </span>
                      <p className="text-sm text-gray-600">
                        Destino: {material.destino}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      ) : (
        /* Formulário de Quantidade */
        <div>
          <div className="mb-6">
            <button
              onClick={() => setMaterialSelecionado(null)}
              className="text-gray-600 hover:text-gray-900 text-sm flex items-center gap-1"
            >
              ← Voltar para seleção de material
            </button>
          </div>

          {/* Material Selecionado */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-3">
              <Package className="w-8 h-8 text-green-600" />
              <div>
                <h3 className="font-bold text-gray-900">
                  {materialSelecionado.nome}
                </h3>
                <p className="text-sm text-gray-600">
                  {materialSelecionado.categoria} • Unidade: {materialSelecionado.unidadePadrao || 'Un'}
                </p>
              </div>
            </div>
          </div>

          {/* Formulário */}
          <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-6 space-y-6">
            
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <p className="text-red-800 text-sm">{error}</p>
              </div>
            )}

            {/* Quantidade */}
            <div>
              <label htmlFor="quantidade" className="block text-sm font-medium text-gray-700 mb-2">
                Quantidade *
              </label>
              <div className="flex gap-3">
                <input
                  type="number"
                  id="quantidade"
                  name="quantidade"
                  value={formData.quantidade}
                  onChange={handleChange}
                  required
                  min="0.1"
                  step="0.1"
                  placeholder="0.0"
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <div className="flex items-center px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg min-w-[120px] justify-center">
                  <span className="text-gray-700 font-medium">
                    {materialSelecionado.unidadePadrao || 'Unidade'}
                  </span>
                </div>
              </div>
              <p className="mt-1 text-xs text-gray-500">
                Informe a quantidade do material a ser descartado
              </p>
            </div>

            {/* Descrição */}
            <div>
              <label htmlFor="descricao" className="block text-sm font-medium text-gray-700 mb-2">
                Descrição (Opcional)
              </label>
              <textarea
                id="descricao"
                name="descricao"
                value={formData.descricao}
                onChange={handleChange}
                rows="4"
                placeholder="Ex: 3 sacolas de garrafas PET vazias e limpas..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
              />
              <p className="mt-1 text-xs text-gray-500">
                Informações complementares que possam ajudar o ponto de coleta
              </p>
            </div>

            {/* Botões */}
            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={() => setMaterialSelecionado(null)}
                className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium"
              >
                Voltar
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {submitting ? 'Registrando...' : 'Registrar Descarte'}
              </button>
            </div>
          </form>

          {/* Informações Adicionais */}
          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-blue-900 mb-2">ℹ️ Informações Importantes</h3>
            <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
              <li>Seu descarte será enviado para aprovação do ponto de coleta</li>
              <li>Você receberá uma notificação quando o status for atualizado</li>
              <li>Certifique-se de que o material está limpo e nas condições adequadas</li>
              <li>Respeite os horários de funcionamento: {ponto?.horarios}</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
