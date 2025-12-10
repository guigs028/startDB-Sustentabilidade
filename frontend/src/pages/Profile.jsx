import { useState, useEffect } from 'react';
import { userService } from '../services/userService';
import api from '../services/api';

import ProfileHeader from '../components/profile/ProfileHeader';
import StatsOverview from '../components/profile/StatsOverview';
import RecentActivity from '../components/profile/RecentActivity';

export default function Profile() {
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
      setDescartes(descartesData.data || []);
    } catch (err) {
      setError('Erro ao carregar perfil');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const countTotal = descartes.length;
  const countAprovados = descartes.filter(
    d => d.status === 'APROVADO' || d.status === 'CONCLUIDO'
  ).length;

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
      />
      <RecentActivity descartes={descartes} />
    </div>
  );
}