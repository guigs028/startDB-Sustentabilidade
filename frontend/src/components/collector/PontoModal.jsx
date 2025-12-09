import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import Button from '../ui/Button';
import Input from '../ui/Input';

const MATERIAIS_DISPONIVEIS = [
  { id: 1, nome: 'Plástico' },
  { id: 2, nome: 'Vidro' },
  { id: 3, nome: 'Papel' },
  { id: 4, nome: 'Metal' },
  { id: 5, nome: 'Eletrônicos' },
  { id: 6, nome: 'Óleo de Cozinha' },
  { id: 7, nome: 'Roupas' },
  { id: 8, nome: 'Móveis' }
];

export default function PontoModal({ isOpen, onClose, onSubmit, editingPonto = null }) {
  const [formData, setFormData] = useState({
    nome: '',
    endereco: '',
    contato: '',
    horarios: '',
    materiaisIds: []
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (editingPonto) {
      // Extrair IDs dos materiais do ponto sendo editado
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
    
    if (!formData.nome || !formData.endereco || !formData.contato || !formData.horarios || formData.materiaisIds.length === 0) {
      alert('Por favor, preencha todos os campos e selecione pelo menos um material.');
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(formData);
      onClose();
    } catch (error) {
      console.error('Erro ao salvar ponto:', error);
      console.error('Detalhes do erro:', error.response?.data);
      const errorMessage = error.response?.data?.message || error.response?.data || 'Erro ao salvar ponto. Tente novamente.';
      alert(`Erro ao salvar ponto: ${errorMessage}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-[#212121]">
            {editingPonto ? 'Editar Ponto de Coleta' : 'Cadastrar Ponto de Coleta'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-[#212121] mb-2">
              Nome do Local <span className="text-[#D32F2F]">*</span>
            </label>
            <Input
              type="text"
              placeholder="Ex: Ecoponto Bairro X"
              value={formData.nome}
              onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#212121] mb-2">
              Endereço <span className="text-[#D32F2F]">*</span>
            </label>
            <Input
              type="text"
              placeholder="Ex: Rua A, 123"
              value={formData.endereco}
              onChange={(e) => setFormData({ ...formData, endereco: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#212121] mb-2">
              Contato <span className="text-[#D32F2F]">*</span>
            </label>
            <Input
              type="text"
              placeholder="Ex: (11) 99999-9999"
              value={formData.contato}
              onChange={(e) => setFormData({ ...formData, contato: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#212121] mb-2">
              Horários de Funcionamento <span className="text-[#D32F2F]">*</span>
            </label>
            <Input
              type="text"
              placeholder="Ex: Seg-Sex 08h-18h"
              value={formData.horarios}
              onChange={(e) => setFormData({ ...formData, horarios: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#212121] mb-3">
              Materiais Aceitos <span className="text-[#D32F2F]">*</span>
            </label>
            <p className="text-sm text-gray-500 mb-3">
              Selecione os tipos de materiais que seu ponto de coleta aceita
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {MATERIAIS_DISPONIVEIS.map((material) => (
                <label
                  key={material.id}
                  className={`
                    flex items-center gap-2 p-3 rounded-xl border-2 cursor-pointer transition-all
                    ${formData.materiaisIds.includes(material.id)
                      ? 'border-[#2E7D32] bg-[#2E7D32]/5'
                      : 'border-gray-200 hover:border-gray-300'
                    }
                  `}
                >
                  <input
                    type="checkbox"
                    checked={formData.materiaisIds.includes(material.id)}
                    onChange={() => handleMaterialToggle(material.id)}
                    className="w-4 h-4 text-[#2E7D32] rounded focus:ring-[#2E7D32]"
                  />
                  <span className="text-sm font-medium text-[#212121]">{material.nome}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="ghost"
              className="flex-1"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              variant="primary"
              className="flex-1"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Salvando...' : (editingPonto ? 'Salvar Alterações' : 'Cadastrar')}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
