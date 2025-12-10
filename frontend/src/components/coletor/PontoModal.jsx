import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { pontoService } from '../../services/pontoService';

export default function PontoModal({ isOpen, onClose, onSubmit, editingPonto = null }) {
  const [formData, setFormData] = useState({
    nome: '',
    endereco: '',
    contato: '',
    horarios: '',
    materiaisIds: []
  });
  const [materiais, setMateriais] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [fieldErrors, setFieldErrors] = useState({});

  useEffect(() => {
    setFieldErrors({});
    if (isOpen) {
       loadMateriais();
    }
  }, [isOpen]);

  useEffect(() => {
    if (editingPonto) {
      const materiaisIds = editingPonto.materiais?.map(m => m.id) || [];
      setFormData({
        nome: editingPonto.nome || '',
        endereco: editingPonto.endereco || '',
        contato: editingPonto.contato || '',
        horarios: editingPonto.horarios || '',
        materiaisIds: materiaisIds
      });
    } else {
      setFormData({
        nome: '',
        endereco: '',
        contato: '',
        horarios: '',
        materiaisIds: []
      });
    }
  }, [editingPonto, isOpen]);

  const loadMateriais = async () => {
    try {
      setLoading(true);
      const data = await pontoService.getMateriais();
      setMateriais(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Erro ao carregar materiais:', error);
      setMateriais([]);
    } finally {
      setLoading(false);
    }
  };

  const handleMaterialToggle = (materialId) => {
    setFormData(prev => ({
      ...prev,
      materiaisIds: prev.materiaisIds.includes(materialId)
        ? prev.materiaisIds.filter(id => id !== materialId)
        : [...prev.materiaisIds, materialId]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFieldErrors({});

    if (!formData.nome || !formData.endereco || !formData.contato || !formData.horarios) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    if (formData.materiaisIds.length === 0) {
      alert('Selecione pelo menos um material.');
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(formData);
      onClose();
    } catch (error) {
      console.error('Erro ao salvar ponto:', error);
      
      if (error.response?.data?.errors) {
        setFieldErrors(error.response.data.errors);
      } else {
        const errorMessage = error.response?.data?.message || 'Erro ao salvar.';
        alert(`Erro: ${errorMessage}`);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">
            {editingPonto ? 'Editar Ponto de Coleta' : 'Cadastrar Ponto de Coleta'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            type="button"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nome do Local <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Ex: Ecoponto Centro"
              value={formData.nome}
              onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Endereço <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Ex: Rua das Flores, 123 (Mínimo 10 caracteres)"
              value={formData.endereco}
              minLength={10}
              onChange={(e) => {
                setFormData({ ...formData, endereco: e.target.value });
                if (fieldErrors.endereco) {
                    setFieldErrors({...fieldErrors, endereco: null});
                }
              }}
              className={`w-full px-4 py-3 bg-gray-50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent 
                ${fieldErrors.endereco ? 'border-red-500' : 'border-gray-300'}`} // Borda vermelha se tiver erro
              required
            />
            {fieldErrors.endereco && (
              <p className="mt-1 text-sm text-red-500">
                {fieldErrors.endereco}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Contato <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Ex: (11) 98765-4321"
              value={formData.contato}
              onChange={(e) => setFormData({ ...formData, contato: e.target.value })}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Horários de Funcionamento <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Ex: Seg-Sex 08h-18h"
              value={formData.horarios}
              onChange={(e) => setFormData({ ...formData, horarios: e.target.value })}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Materiais Aceitos <span className="text-red-500">*</span>
            </label>
            {loading ? (
              <p className="text-sm text-gray-500">Carregando materiais...</p>
            ) : materiais.length === 0 ? (
              <p className="text-sm text-gray-500">Nenhum material disponível</p>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                {materiais.map((material) => (
                  <label
                    key={material.id}
                    className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition"
                  >
                    <input
                      type="checkbox"
                      checked={formData.materiaisIds.includes(material.id)}
                      onChange={() => handleMaterialToggle(material.id)}
                      className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                    />
                    <span className="text-sm font-medium text-gray-700">{material.nome}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition"
              disabled={isSubmitting}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition disabled:opacity-50"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Salvando...' : (editingPonto ? 'Atualizar' : 'Cadastrar')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
