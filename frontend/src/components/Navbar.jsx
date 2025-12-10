import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Leaf, LogOut } from 'lucide-react';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout, user } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  // Renderizar menu diferente para Coletor
  if (user?.tipo === 'COLETOR') {
    return (
      <nav className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <Leaf className="w-6 h-6 text-green-600" />
              <span className="text-xl font-bold text-gray-900">EcoResiduos</span>
            </div>
            
            <div className="flex items-center gap-6">
              <button
                onClick={() => navigate('/coletor')}
                className={`font-medium ${
                  isActive('/coletor') 
                    ? 'text-green-600' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Meus Pontos
              </button>
              <button
                onClick={() => navigate('/profile')}
                className={`font-medium ${
                  isActive('/profile') || isActive('/profile/edit')
                    ? 'text-green-600' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Perfil
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-red-600 hover:text-red-700"
              >
                <LogOut className="w-4 h-4" />
                Sair
              </button>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  // Menu padrão para Gerador
  return (
    <nav className="bg-white shadow-sm sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <Leaf className="w-6 h-6 text-green-600" />
            <span className="text-xl font-bold text-gray-900">EcoResiduos</span>
          </div>
          
          <div className="flex items-center gap-6">
            <button
              onClick={() => navigate('/gerador')}
              className={`font-medium ${
                isActive('/gerador') 
                  ? 'text-green-600' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Buscar Pontos
            </button>
            <button
              onClick={() => navigate('/descartes')}
              className={`font-medium ${
                isActive('/descartes')
                  ? 'text-green-600' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Meus Descartes
            </button>
            <button
              onClick={() => navigate('/profile')}
              className={`font-medium ${
                isActive('/profile') || isActive('/profile/edit')
                  ? 'text-green-600' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Perfil
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-red-600 hover:text-red-700"
            >
              <LogOut className="w-4 h-4" />
              Sair
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
