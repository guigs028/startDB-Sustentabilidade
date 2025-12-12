import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { pontoService } from '../../services/pontoService';
import PhoneInput from '../ui/PhoneInput';
import LocationPicker from '../ui/LocationPicker'; 

export default function PontoModal({ isOpen, onClose, onSubmit, editingPonto = null }) {
  const [formData, setFormData] = useState({
    nome: '',
    endereco: '',
    contato: '',
    horarios: '',
    materiaisIds: [],
    latitude: null,
    longitude: null
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
        materiaisIds: materiaisIds,
        latitude: editingPonto.latitude || null, 
        longitude: editingPonto.longitude || null
      });
    } else {
      setFormData({
        nome: '',
        endereco: '',
        contato: '',
        horarios: '',
        materiaisIds: [],
        latitude: null,
        longitude: null
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
      alert('Por favor, preencha todos os campos de texto.');
      return;
    }

    if (!formData.latitude || !formData.longitude) {
        alert('Por favor, clique no mapa para definir a localização exata.');
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
        
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center z-10">
          <h2 className="text-2xl font-bold text-gray-900">
            {editingPonto ? 'Editar Ponto de Coleta' : 'Cadastrar Ponto de Coleta'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors" type="button">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nome do Local <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.nome}
                  onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Endereço (Texto) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.endereco}
                  onChange={(e) => setFormData({ ...formData, endereco: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contato <span className="text-red-500">*</span>
                </label>
                <PhoneInput
                  name="contato"
                  value={formData.contato}
                  onChange={e => setFormData({ ...formData, contato: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Horários <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.horarios}
                  onChange={(e) => setFormData({ ...formData, horarios: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>
          </div>

          <div className="pt-2 border-t border-gray-100">
             <LocationPicker 
                initialPosition={
                    (formData.latitude && formData.longitude) 
                    ? [formData.latitude, formData.longitude] 
                    : null
                }
                onPositionChange={(coords) => {
                    console.log("Coordenadas recebidas do mapa:", coords); // Debug
                    setFormData(prev => ({
                        ...prev,
                        latitude: coords[0],
                        longitude: coords[1]
                    }));
                }}
             />
          </div>
          {/* ----------------------------- */}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Materiais Aceitos <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-2 gap-3 max-h-40 overflow-y-auto pr-2">
                {materiais.map((material) => (
                  <label key={material.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition">
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
          </div>

          <div className="flex gap-3 pt-4 border-t border-gray-100">
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