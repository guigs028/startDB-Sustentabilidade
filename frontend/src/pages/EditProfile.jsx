import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { userService } from '../services/userService';
import EditHeader from '../components/profile/EditHeader';
import StatusAlerts from '../components/profile/StatusAlerts';
import EditForm from '../components/profile/EditForm';

export default function EditProfile() {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    nome: '',
    telefone: '',
    endereco: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const data = await userService.getProfile();
      setFormData({
        nome: data.nome || '',
        telefone: data.telefone || '',
        endereco: data.endereco || ''
      });
    } catch (err) {
      setError('Erro ao carregar perfil');
      console.error(err);
    }
  };

  // lógica de Interacao
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handleCancel = () => {
    navigate('/profile');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    // Validações
    if (formData.telefone && (formData.telefone.length < 10 || formData.telefone.length > 15)) {
      setError('O telefone deve ter entre 10 e 15 caracteres');
      setLoading(false);
      return;
    }

    if (formData.endereco && formData.endereco.length > 200) {
      setError('O endereço deve ter no máximo 200 caracteres');
      setLoading(false);
      return;
    }

    if (formData.nome && formData.nome.length > 100) {
      setError('O nome deve ter no máximo 100 caracteres');
      setLoading(false);
      return;
    }

    // Envio para API
    try {
      await userService.updateProfile(formData);
      setSuccess(true);
      setTimeout(() => {
        navigate('/profile');
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.message || 'Erro ao atualizar perfil');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow p-8">
        
        {/* Cabeçalho com botão cancelar */}
        <EditHeader onCancel={handleCancel} />

        {/* Alertas de Erro/Sucesso */}
        <StatusAlerts error={error} success={success} />

        {/* Formulário */}
        <EditForm 
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          loading={loading}
          onCancel={handleCancel}
        />

      </div>
    </div>
  );
}