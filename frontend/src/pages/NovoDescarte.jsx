import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import api from '../services/api';
import { 
  AlertCircle, 
  CheckCircle, 
  ArrowLeft, 
  Package, 
  MapPin, 
  Clock 
} from 'lucide-react';

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
  const [materialError, setMaterialError] = useState(''); 
  const [success, setSuccess] = useState(false);

  const loadDados = useCallback(async () => {
    if (!pontoId) {
      setError('ID do ponto de coleta não informado.');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError('');
      setMaterialError('');

      const [pontosRes, materiaisRes] = await Promise.allSettled([
        api.get('/pontos'),
        api.get('/materiais') 
      ]);

      if (pontosRes.status === 'fulfilled') {
        const listaPontos = pontosRes.value.data || [];
        const pontoEncontrado = listaPontos.find(p => p.id === Number(pontoId));
        
        if (!pontoEncontrado) {
          setError('Ponto de coleta não encontrado.');
          setLoading(false);
          return;
        }
        
        setPonto(pontoEncontrado);

        if (materiaisRes.status === 'fulfilled') {
          const materiaisDoPonto = pontoEncontrado.materiais || [];
          const idsAceitos = materiaisDoPonto.map(m => m.id);

          const listaMateriais = materiaisRes.value.data || [];
          
          const compativeis = listaMateriais.filter(mat => 
            idsAceitos.includes(mat.id)
          );
          
          setMateriaisDisponiveis(compativeis);
        } else {
          console.error("Falha ao buscar materiais:", materiaisRes.reason);
          setMaterialError('Não foi possível carregar a lista de materiais.');
        }

      } else {
        throw new Error('Não foi possível carregar a lista de pontos.');
      }

    } catch (err) {
      console.error('Erro crítico:', err);
      setError('Erro ao carregar informações.');
    } finally {
      setLoading(false);
    }
  }, [pontoId]);

  useEffect(() => {
    loadDados();
  }, [loadDados]);

  const handleMaterialClick = (material) => {
    setMaterialSelecionado(material);
    setError('');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!materialSelecionado) {
      setError('Selecione um material antes de continuar.');
      return;
    }

    setSubmitting(true);
    setError('');

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
      console.error('Erro ao registrar:', error);
      // Tratamento de mensagem de erro mais robusto
      const msg = error.response?.data?.message || 'Erro ao registrar descarte.';
      setError(msg);
      setSubmitting(false);
    }
  };


  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl text-gray-600 animate-pulse">Carregando informações...</div>
      </div>
    );
  }

  if (error && !ponto) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="bg-red-50 border border-red-200 rounded-lg p-8 text-center">
          <AlertCircle className="w-16 h-16 text-red-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-red-900 mb-2">Ops!</h2>
          <p className="text-red-700 mb-6">{error}</p>
          <button
            onClick={() => navigate('/gerador')}
            className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
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
        <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center animate-fade-in">
          <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-green-900 mb-2">Sucesso!</h2>
          <p className="text-green-700 mb-4">Sua solicitação de descarte foi registrada.</p>
          <p className="text-sm text-green-600">Redirecionando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Cabeçalho do Ponto */}
      <div className="mb-8">
        <button
          onClick={() => navigate('/gerador')}
          className="flex items-center gap-2 text-gray-600 hover:text-green-600 mb-4 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Voltar
        </button>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Registrar Descarte</h1>
        
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-green-600" />
              {ponto?.nome}
            </h3>
            <p className="text-gray-600 ml-7">{ponto?.endereco}</p>
          </div>
          <div className="bg-blue-50 px-4 py-2 rounded-lg flex items-center gap-2 text-blue-800 text-sm">
            <Clock className="w-4 h-4" />
            <span>{ponto?.horarios}</span>
          </div>
        </div>
      </div>

      {/* Seleção de Material */}
      {!materialSelecionado ? (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">1. O que você vai descartar?</h2>
          
          {/* Aviso de erro parcial nos materiais */}
          {materialError && (
            <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg flex gap-3 text-yellow-800 mb-4">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <p>{materialError} (Erro 500 no servidor)</p>
            </div>
          )}

          {materiaisDisponiveis.length === 0 && !materialError ? (
            <div className="text-center py-12 bg-gray-50 rounded-xl border border-dashed border-gray-300">
              <Package className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-500 font-medium">Nenhum material compatível encontrado</p>
              <p className="text-gray-400 text-sm mt-1">
                Verifique se você cadastrou materiais que este ponto aceita.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {materiaisDisponiveis.map((material) => (
                <button
                  key={material.id}
                  onClick={() => handleMaterialClick(material)}
                  className="bg-white border-2 border-gray-200 rounded-xl p-5 hover:border-green-500 hover:shadow-md transition-all text-left group"
                >
                  <div className="flex items-start gap-3">
                    <div className="bg-green-100 p-2 rounded-lg group-hover:bg-green-200 transition-colors">
                      <Package className="w-6 h-6 text-green-700" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">{material.nome}</h3>
                      <span className="text-xs font-medium bg-gray-100 text-gray-600 px-2 py-0.5 rounded mt-1 inline-block">
                        {material.categoria}
                      </span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      ) : (
        /* Formulário de Detalhes */
        <div className="animate-fade-in">
          <div className="mb-6">
            <button
              onClick={() => setMaterialSelecionado(null)}
              className="text-gray-500 hover:text-gray-900 text-sm flex items-center gap-1 font-medium"
            >
              ← Escolher outro material
            </button>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex items-center gap-3">
              <div className="bg-green-100 p-2 rounded-lg">
                <Package className="w-6 h-6 text-green-700" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">{materialSelecionado.nome}</h3>
                <p className="text-sm text-gray-500">{materialSelecionado.categoria}</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Alerta de erro no envio */}
              {error && (
                <div className="bg-red-50 text-red-700 p-3 rounded-lg text-sm flex gap-2">
                  <AlertCircle className="w-5 h-5" /> {error}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quantidade *
                </label>
                <div className="flex gap-3">
                  <input
                    type="number"
                    name="quantidade"
                    value={formData.quantidade}
                    onChange={handleChange}
                    required
                    min="0.1"
                    step="0.1"
                    placeholder="0.0"
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
                  />
                  <div className="flex items-center px-4 bg-gray-100 border border-gray-300 rounded-lg text-gray-600 font-medium min-w-[100px] justify-center">
                    {materialSelecionado.unidadePadrao || 'Unidade'}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Observações (Opcional)
                </label>
                <textarea
                  name="descricao"
                  value={formData.descricao}
                  onChange={handleChange}
                  rows="3"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition resize-none"
                  placeholder="Detalhes sobre o estado do material..."
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md"
                >
                  {submitting ? 'Enviando...' : 'Confirmar Descarte'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}