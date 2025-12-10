import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { userService } from '../services/userService';
import { Mail, Phone, MapPin, Edit } from 'lucide-react';
import api from '../services/api';

export default function Profile() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [descartes, setDescartes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [profileData, descartesData] = await Promise.all([
        userService.getProfile(),
        api.get('/descartes/historico')
      ]);
      setProfile(profileData);
      // Garante que descartes seja sempre um array
      setDescartes(descartesData.data || []);
    } catch (err) {
      setError('Erro ao carregar perfil');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // --- ESTATÍSTICAS ---

  const listaAprovados = descartes.filter(d => d.status === 'APROVADO' || d.status === 'CONCLUIDO');

  const countAprovados = listaAprovados.length;
  const countTotal = descartes.length;

  const getInitial = (nome) => {
    return nome ? nome.charAt(0).toUpperCase() : 'U';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl text-gray-600">Carregando...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Card do Perfil */}
        <div className="bg-white rounded-lg shadow p-8 mb-6">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4">
              {/* Avatar com Inicial */}
              <div className="w-16 h-16 rounded-full bg-green-600 flex items-center justify-center text-white text-2xl font-bold">
                {getInitial(profile?.nome)}
              </div>
              
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{profile?.nome}</h1>
                <div className="flex items-center gap-2 mt-1">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {profile?.tipo}
                  </span>
                </div>
                <p className="text-sm text-gray-500 mt-2">Contribuindo para um planeta mais sustentável</p>
                
                {/* Informações de Contato */}
                <div className="mt-4 space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Mail className="w-4 h-4" />
                    <span>{profile?.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Phone className="w-4 h-4" />
                    <span>{profile?.telefone || 'Não informado'}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>{profile?.endereco || 'Não informado'}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Botão Editar */}
            <button
              onClick={() => navigate('/profile/edit')}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
              <Edit className="w-4 h-4" />
              Editar
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <p className="text-sm text-gray-500 mb-2">Descartes Registrados</p>
            <p className="text-3xl font-bold text-green-600">{countTotal}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <p className="text-sm text-gray-500 mb-2">Descartes Aprovados</p>
            <p className="text-3xl font-bold text-green-600">{countAprovados}</p>
          </div>
        </div>

        {/* Meus Recentes Descartes */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Meus Descartes Recentes</h2>
          
          {descartes.length === 0 ? (
            <p className="text-gray-500 text-center py-4">Nenhum descarte registrado ainda</p>
          ) : (
            <div className="space-y-3">
              {descartes.slice(0, 5).map((descarte) => (
                <div key={descarte.id || Math.random()} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">
                        {descarte.materialNome || descarte.material?.nome || 'Material sem nome'}
                    </p> 
                    
                    <p className="text-sm text-gray-500">
                      {descarte.quantidade} {descarte.unidadeMedida?.toLowerCase()} - {descarte.pontoColetaNome || descarte.pontoColeta?.nome || 'Ponto de Coleta'}
                    </p>
                  </div>

                  <span className="text-sm text-green-600 font-medium">
                    {descarte.dataCriacao ? new Date(descarte.dataCriacao).toLocaleDateString('pt-BR') : '-'}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
  );
}