import { useState, useEffect } from 'react';
import { userService } from '../services/userService';
import { useAuth } from '../contexts/AuthContext';
import { pontoService } from '../services/pontoService';
import api from '../services/api';

import ProfileHeader from '../components/profile/ProfileHeader';
import StatsOverview from '../components/profile/StatsOverview';
import RecentActivity from '../components/profile/RecentActivity';

export default function Profile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [descartes, setDescartes] = useState([]);
  const [pontos, setPontos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const profileData = await userService.getProfile();
      setProfile(profileData);

      // Usar o tipo do perfil retornado pelo backend
      const userType = profileData?.tipo || profileData?.tipoUsuario;

      // Carregar dados específicos do tipo de usuário
      if (userType === 'COLETOR') {
        try {
          const pontosData = await pontoService.getMeusPontos();
          setPontos(Array.isArray(pontosData) ? pontosData : []);
        } catch (err) {
          console.error('Erro ao carregar pontos:', err);
          setPontos([]);
        }
      } else {
        try {
          const descartesData = await api.get('/descartes/historico');
          setDescartes(descartesData.data || []);
        } catch (err) {
          console.error('Erro ao carregar descartes:', err);
          setDescartes([]);
        }
      }
    } catch (err) {
      setError('Erro ao carregar perfil');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const userType = profile?.tipo || profile?.tipoUsuario;
  const countTotal = userType === 'COLETOR' ? pontos.length : descartes.length;
  const countAprovados = userType === 'COLETOR' 
    ? pontos.filter(p => p.ativo !== false).length
    : descartes.filter(d => d.status === 'APROVADO' || d.status === 'CONCLUIDO').length;

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
      <ProfileHeader profile={profile} />
      <StatsOverview 
        total={countTotal} 
        approved={countAprovados}
        userType={userType}
      />
      {userType === 'COLETOR' ? (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mt-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Meus Pontos de Coleta</h3>
          {pontos.length === 0 ? (
            <p className="text-gray-500 text-center py-8">Nenhum ponto cadastrado</p>
          ) : (
            <div className="space-y-3">
              {pontos.map((ponto) => (
                <div key={ponto.id} className="border-b border-gray-100 pb-3 last:border-0">
                  <p className="font-medium text-gray-900">{ponto.nome}</p>
                  <p className="text-sm text-gray-500">{ponto.endereco}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <RecentActivity descartes={descartes} />
      )}
    </div>
  );
}