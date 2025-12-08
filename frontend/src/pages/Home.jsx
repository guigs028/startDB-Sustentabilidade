import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Recycle, Truck, Leaf, CheckCircle } from 'lucide-react';

export default function Home() {
  const [isLogin, setIsLogin] = useState(true); // login ou cadastro
  const { login, register } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    email: '', 
    senha: '', 
    nome: '', 
    telefone: '', 
    endereco: '', 
    tipo: 'GERADOR'
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (isLogin) {
      const result = await login(formData.email, formData.senha);
      if (result.success) {
        navigate('/dashboard'); // redireciona apos o login
      } else {
        setError('Credenciais inválidas.');
      }
    } else {
      const result = await register({
        nome: formData.nome,
        email: formData.email,
        senha: formData.senha,
        telefone: formData.telefone,
        endereco: formData.endereco,
        tipo: formData.tipo 
      });

      if (result.success) {
        alert("Cadastro realizado! Faça login.");
        setIsLogin(true); // Volta para aba de login -> ver isso aq dps
      } else {
        setError(result.error);
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-surface font-sans text-gray-800">
      
      {/* Navbar Simples */}
      <nav className="w-full py-4 px-8 flex justify-between items-center bg-white shadow-sm">
        <div className="text-2xl font-bold text-brand-500 flex items-center gap-2">
          <Leaf className="w-6 h-6" /> EcoPoints
        </div>
        <div className="hidden md:flex gap-6 text-sm font-medium text-gray-600">
          <a href="#inicio" className="hover:text-brand-500">Início</a>
          <a href="#como-funciona" className="hover:text-brand-500">Como funciona</a>
          <button 
            onClick={() => document.getElementById('auth-section').scrollIntoView({ behavior: 'smooth'})}
            className="text-brand-500 hover:underline"
          >
            Entrar
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="inicio" className="px-6 py-16 md:py-24 max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
            Descarte Consciente, <br />
            <span className="text-brand-500">Impacto Real.</span>
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Conectamos geradores de resíduos a pontos de coleta certificados. 
            Encontre o melhor ponto de coleta para seus materiais e contribua para a sustentabilidade.
          </p>
          <button 
            onClick={() => document.getElementById('auth-section').scrollIntoView({ behavior: 'smooth'})}
            className="bg-brand-500 hover:bg-brand-600 text-white px-8 py-3 rounded-lg font-semibold transition-all shadow-lg shadow-brand-500/30"
          >
            Começar Agora
          </button>
        </div>
        <div className="bg-brand-100 rounded-2xl h-80 w-full flex items-center justify-center text-brand-300">
           {/* Placeholder para imagem do Hero */}
           <div className="w-full h-full bg-gray-200 rounded-2xl animate-pulse"></div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Por que usar nossa plataforma?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Recycle className="w-8 h-8 text-brand-500"/>}
              title="Reciclagem Facilitada"
              desc="Encontre pontos de coleta próximos para diversos materiais."
            />
            <FeatureCard 
              icon={<Truck className="w-8 h-8 text-brand-500"/>}
              title="Coleta Agilizada"
              desc="Conectamos geradores diretamente com coletores."
            />
            <FeatureCard 
              icon={<Leaf className="w-8 h-8 text-brand-500"/>}
              title="Impacto Ambiental"
              desc="Acompanhe suas contribuições para um mundo melhor."
            />
          </div>
        </div>
      </section>

      {/* Auth Section (Login/Register) */}
      <section id="auth-section" className="py-20 bg-gray-50 flex justify-center">
        <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-100">
          <div className="flex mb-6 border-b">
            <button 
              className={`flex-1 py-2 text-center font-medium ${isLogin ? 'text-brand-500 border-b-2 border-brand-500' : 'text-gray-400'}`}
              onClick={() => setIsLogin(true)}
            >
              Login
            </button>
            <button 
              className={`flex-1 py-2 text-center font-medium ${!isLogin ? 'text-brand-500 border-b-2 border-brand-500' : 'text-gray-400'}`}
              onClick={() => setIsLogin(false)}
            >
              Cadastrar
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <>
                <Input name="nome" placeholder="Nome Completo" onChange={handleChange} required />
                <Input name="telefone" placeholder="Telefone" onChange={handleChange} required />
                <Input name="endereco" placeholder="Endereço" onChange={handleChange} required />
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Eu sou:</label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="tipo" value="GERADOR" checked={formData.tipo === 'GERADOR'} onChange={handleChange} className="accent-brand-500"/>
                      <span className="text-sm">Gerador</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="tipo" value="COLETOR" checked={formData.tipo === 'COLETOR'} onChange={handleChange} className="accent-brand-500"/>
                      <span className="text-sm">Coletor</span>
                    </label>
                  </div>
                </div>
              </>
            )}

            <Input type="email" name="email" placeholder="Seu E-mail" onChange={handleChange} required />
            <Input type="password" name="senha" placeholder="Sua Senha" onChange={handleChange} required />

            {error && <p className="text-red-500 text-sm text-center">{error}</p>}

            <button type="submit" className="w-full bg-brand-500 hover:bg-brand-600 text-white py-3 rounded-lg font-bold transition-colors">
              {isLogin ? 'Entrar na Plataforma' : 'Criar Conta'}
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8 text-center text-sm">
        <p> 2025 EcoPoints. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}

// Componentes Auxiliares Locais
function FeatureCard({ icon, title, desc }) {
  return (
    <div className="p-6 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-shadow text-center flex flex-col items-center">
      <div className="mb-4 bg-brand-50 p-3 rounded-full">{icon}</div>
      <h3 className="font-bold text-lg mb-2 text-gray-800">{title}</h3>
      <p className="text-gray-500 text-sm">{desc}</p>
    </div>
  );
}

function Input({ ...props }) {
  return (
    <input 
      {...props} 
      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white transition-all text-sm"
    />
  );
}