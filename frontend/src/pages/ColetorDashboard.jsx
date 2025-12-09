import { useState, useEffect } from 'react';
import { Plus, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { pontoService } from '../services/pontoService';
import Button from '../components/ui/Button';
import PontoCard from '../components/collector/PontoCard';
import PontoModal from '../components/collector/PontoModal';
import { useNavigate } from 'react-router-dom';

export default function ColetorDashboard() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const [pontos, setPontos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPonto, setEditingPonto] = useState(null);

  useEffect(() => {
    loadPontos();
  }, []);

  const loadPontos = async () => {
    try {
      setLoading(true);
      const data = await pontoService.getMeusPontos();
      console.log('Pontos carregados do backend:', data);
      if (data.length > 0) {
        console.log('Estrutura do primeiro ponto:', data[0]);
      }
      setPontos(data);
    } catch (error) {
      console.error('Erro ao carregar pontos:', error);
      if (error.response?.status === 401) {
        logout();
        navigate('/');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePonto = async (pontoData) => {
    try {
      if (editingPonto) {
        await pontoService.updatePonto(editingPonto.id, pontoData);
      } else {
        await pontoService.createPonto(pontoData);
      }
      await loadPontos();
      setIsModalOpen(false);
      setEditingPonto(null);
    } catch (error) {
      console.error('Erro ao salvar ponto:', error);
      throw error;
    }
  };

  const handleEditPonto = (ponto) => {
    setEditingPonto(ponto);
    setIsModalOpen(true);
  };

  const handleDeletePonto = async (pontoId) => {
    if (!confirm('Tem certeza que deseja remover este ponto de coleta?')) {
      return;
    }

    try {
      await pontoService.deletePonto(pontoId);
      await loadPontos();
    } catch (error) {
      console.error('Erro ao deletar ponto:', error);
      alert('Erro ao remover ponto. Tente novamente.');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleOpenNewModal = () => {
    setEditingPonto(null);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      {/* Header/Navbar */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#2E7D32] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">♻</span>
              </div>
              <h1 className="text-2xl font-bold text-[#212121]">EcoResíduos</h1>
            </div>

            <nav className="flex items-center gap-6">
              <a href="#" className="text-gray-600 hover:text-[#2E7D32] font-medium transition-colors">
                Meus Pontos
              </a>
              <a href="#" className="text-gray-600 hover:text-[#2E7D32] font-medium transition-colors">
                Entregas
              </a>
              <a href="#" className="text-gray-600 hover:text-[#2E7D32] font-medium transition-colors">
                Perfil
              </a>
              <Button
                variant="ghost"
                onClick={handleLogout}
                className="flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Sair
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-[#212121] mb-2">
            Gerenciador de Coleta
          </h2>
          <p className="text-gray-600">
            Gerencie seus pontos de coleta e entregas de resíduos
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <p className="text-gray-600 text-sm font-medium mb-2">Pontos Ativos</p>
            <p className="text-4xl font-bold text-[#2E7D32]">{pontos.length}</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <p className="text-gray-600 text-sm font-medium mb-2">Entregas Pendentes</p>
            <p className="text-4xl font-bold text-[#FF9800]">-</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <p className="text-gray-600 text-sm font-medium mb-2">Total de Entregas</p>
            <p className="text-4xl font-bold text-[#1565C0]">-</p>
          </div>
        </div>

        {/* Meus Pontos Section */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-[#212121]">Meus Pontos de Coleta</h3>
            <Button
              variant="primary"
              onClick={handleOpenNewModal}
              className="flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Novo Ponto
            </Button>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2E7D32]"></div>
            </div>
          ) : pontos.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-gray-100">
              <div className="w-20 h-20 bg-[#2E7D32]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Plus className="w-10 h-10 text-[#2E7D32]" />
              </div>
              <h3 className="text-xl font-semibold text-[#212121] mb-2">
                Nenhum ponto cadastrado
              </h3>
              <p className="text-gray-600 mb-6">
                Comece cadastrando seu primeiro ponto de coleta
              </p>
              <Button variant="primary" onClick={handleOpenNewModal}>
                Cadastrar Primeiro Ponto
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pontos.map((ponto) => (
                <PontoCard
                  key={ponto.id}
                  ponto={ponto}
                  onEdit={handleEditPonto}
                  onDelete={handleDeletePonto}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Modal */}
      <PontoModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingPonto(null);
        }}
        onSubmit={handleCreatePonto}
        editingPonto={editingPonto}
      />
    </div>
  );
}
