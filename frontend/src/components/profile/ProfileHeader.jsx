import { useNavigate } from 'react-router-dom';
import { Mail, Phone, MapPin, Edit } from 'lucide-react';

export default function ProfileHeader({ profile }) {
  const navigate = useNavigate();

  // Função auxiliar visual fica aqui no componente visual
  const getInitial = (nome) => {
    return nome ? nome.charAt(0).toUpperCase() : 'U';
  };

  return (
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
  );
}