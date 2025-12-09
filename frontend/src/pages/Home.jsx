import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  Recycle,
  Truck,
  Leaf,
  BookOpen,
  MapPin,
  CheckCircle,
  TrendingUp,
  Users,
  Search,
} from "lucide-react";
import { Carousel } from "flowbite-react";

export default function Home() {
  const [isLogin, setIsLogin] = useState(true);
  const { login, register } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    senha: "",
    nome: "",
    telefone: "",
    endereco: "",
    tipo: "GERADOR",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (isLogin) {
      const result = await login(formData.email, formData.senha);
      if (result.success) {
        navigate("/dashboard");
      } else {
        setError("Credenciais inválidas.");
      }
    } else {
      const result = await register({
        nome: formData.nome,
        email: formData.email,
        senha: formData.senha,
        telefone: formData.telefone,
        endereco: formData.endereco,
        tipo: formData.tipo,
      });
      if (result.success) {
        alert("Cadastro realizado! Faça login.");
        setIsLogin(true);
      } else {
        setError(result.error);
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-surface font-sans text-gray-800">
      {/* Navbar */}
      <nav className="w-full py-4 px-8 flex justify-between items-center bg-white shadow-sm">
        <div className="text-2xl font-bold text-brand-500 flex items-center gap-2">
          <Leaf className="w-6 h-6" /> EcoPoints
        </div>
        <div className="hidden md:flex gap-6 text-sm font-medium text-gray-600">
          <a href="#inicio" className="hover:text-brand-500">
            Início
          </a>
          <a href="#como-funciona" className="hover:text-brand-500">
            Como funciona
          </a>
          <a href="#impacto" className="hover:text-brand-500">
            Impacto
          </a>
          <button
            onClick={() =>
              document
                .getElementById("auth-section")
                .scrollIntoView({ behavior: "smooth" })
            }
            className="text-brand-500 hover:underline"
          >
            Entrar
          </button>
        </div>
      </nav>

      {/* Hero Section com Carrossel */}
      <section
        id="inicio"
        className="px-6 py-16 md:py-24 max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center"
      >
        <div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
            Descarte Consciente, <br />
            <span className="text-brand-500">Impacto Real.</span>
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Conectamos quem gera resíduos a pontos de coleta certificados e
            confiáveis. Encontre o destino correto para cada material, registre
            descartes e acompanhe o status em tempo real.
          </p>
          <button
            onClick={() =>
              document
                .getElementById("auth-section")
                .scrollIntoView({ behavior: "smooth" })
            }
            className="bg-brand-500 hover:bg-brand-600 text-white px-8 py-4 rounded-xl font-semibold transition-all shadow-lg shadow-brand-500/30 text-lg"
          >
            Começar Agora
          </button>
        </div>

        <div className="h-64 sm:h-80 md:h-[480px] w-full bg-gray-100 rounded-2xl overflow-hidden shadow-2xl">
          <Carousel slideInterval={5000} pauseOnHover>
            <div className="relative h-full w-full">
              <img
                src="https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?q=80&w=1170&auto=format&fit=crop"
                alt="Coleta Seletiva"
                className="absolute w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 bg-gradient-to-t from-black/70 to-transparent p-6 text-white w-full">
                <h3 className="text-2xl font-bold">Coleta Seletiva</h3>
                <p className="text-base">
                  Separe corretamente e faça a diferença.
                </p>
              </div>
            </div>
            <div className="relative h-full w-full">
              <img
                src="https://images.unsplash.com/photo-1614201991207-765637dd6183?q=80&w=688&auto=format&fit=crop"
                alt="Logística Reversa"
                className="absolute w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 bg-gradient-to-t from-black/70 to-transparent p-6 text-white w-full">
                <h3 className="text-2xl font-bold">Logística Reversa</h3>
                <p className="text-base">
                  Eletrônicos, óleo e muito mais no lugar certo.
                </p>
              </div>
            </div>
            <div className="relative h-full w-full">
              <img
                src="https://images.unsplash.com/photo-1591193686104-fddba4d0e4d8?q=80&w=1000&auto=format&fit=crop"
                alt="Futuro Sustentável"
                className="absolute w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 bg-gradient-to-t from-black/70 to-transparent p-6 text-white w-full">
                <h3 className="text-2xl font-bold">Futuro Sustentável</h3>
                <p className="text-base">
                  Pequenas atitudes geram grandes mudanças.
                </p>
              </div>
            </div>
          </Carousel>
        </div>
      </section>

      {/* Como Funciona - Fluxo Visual */}
      <section id="como-funciona" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
              Como funciona?
            </h2>
            <p className="text-xl text-gray-600">
              Em 4 passos simples você conecta geradores e coletores para um
              descarte responsável
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                icon: Users,
                title: "1. Cadastre-se",
                desc: "Crie sua conta como Gerador ou Coletor em menos de 1 minuto",
                color: "bg-blue-100 text-blue-600",
              },
              {
                icon: MapPin,
                title: "2. Busque ou Cadastre",
                desc: "Geradores encontram pontos por material. Coletores cadastram locais e materiais aceitos",
                color: "bg-purple-100 text-purple-600",
              },
              {
                icon: CheckCircle,
                title: "3. Registre o Descarte",
                desc: "Geradores registram o descarte. Coletores visualizam e avaliam (aceitar ou negar)",
                color: "bg-green-100 text-green-600",
              },
              {
                icon: TrendingUp,
                title: "4. Acompanhe o Status",
                desc: "Veja o progresso do descarte (Pendente, Concluído ou Negado)",
                color: "bg-orange-100 text-orange-600",
              },
            ].map((step, i) => (
              <div key={i} className="relative text-center">
                <div
                  className={`w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center text-3xl font-bold ${step.color}`}
                >
                  <step.icon className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600">{step.desc}</p>
                {i < 3 && (
                  <div className="hidden md:block absolute top-10 left-full w-full h-0.5 bg-gray-300 -translate-y-1/2">
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-brand-500 rounded-full"></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="impacto" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
              Impacto Real que Você Gera
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Nossa plataforma resolve o maior gargalo da reciclagem brasileira:{" "}
              <strong>a ponte entre quem gera e quem coleta</strong>. Com busca
              inteligente e gestão de descartes, transformamos intenção em ação
              sustentável.
            </p>
          </div>

          <div className="bg-brand-50 rounded-3xl p-10 md:p-16">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
              Uma solução completa para o ciclo da reciclagem
            </h3>

            <div className="grid md:grid-cols-3 gap-10 max-w-5xl mx-auto">
              {/* Busca Inteligente */}
              <div className="flex gap-6 items-start">
                <div className="flex-shrink-0 w-14 h-14 bg-brand-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <Search className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">
                    Busca Inteligente
                  </h4>
                  <p className="text-gray-600 leading-relaxed">
                    Filtre por material, endereço e horários de funcionamento
                  </p>
                </div>
              </div>

              {/* Educação Prática */}
              <div className="flex gap-6 items-start">
                <div className="flex-shrink-0 w-14 h-14 bg-brand-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <BookOpen className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">
                    Educação Prática
                  </h4>
                  <p className="text-gray-600 leading-relaxed">
                    Informações sobre como preparar cada resíduo para descarte
                  </p>
                </div>
              </div>

              {/* Gestão de Descarte */}
              <div className="flex gap-6 items-start">
                <div className="flex-shrink-0 w-14 h-14 bg-brand-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <Recycle className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">
                    Gestão de Descarte
                  </h4>
                  <p className="text-gray-600 leading-relaxed">
                    Registre, avalie e acompanhe o status dos descartes
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">
            Por que usar nossa plataforma?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Recycle className="w-10 h-10 text-brand-500" />}
              title="Reciclagem Facilitada"
              desc="Encontre pontos de coleta próximos para papel, plástico, vidro, metal, eletrônicos, óleo, roupas e muito mais."
            />
            <FeatureCard
              icon={<Truck className="w-10 h-10 text-brand-500" />}
              title="Conexão Direta"
              desc="Geradores e coletores se conectam sem intermediários. Mais eficiência, menos lixo no lugar errado."
            />
            <FeatureCard
              icon={<Leaf className="w-10 h-10 text-brand-500" />}
              title="Impacto Ambiental"
              desc="Registre descartes e acompanhe o status para garantir um descarte responsável."
            />
          </div>
        </div>
      </section>

      {/* Auth Section */}
      <section id="auth-section" className="py-20 bg-white flex justify-center">
        <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md border border-gray-200">
          <div className="flex mb-6 border-b">
            <button
              className={`flex-1 py-3 text-center font-semibold text-lg ${
                isLogin
                  ? "text-brand-500 border-b-4 border-brand-500"
                  : "text-gray-400"
              }`}
              onClick={() => setIsLogin(true)}
            >
              Login
            </button>
            <button
              className={`flex-1 py-3 text-center font-semibold text-lg ${
                !isLogin
                  ? "text-brand-500 border-b-4 border-brand-500"
                  : "text-gray-400"
              }`}
              onClick={() => setIsLogin(false)}
            >
              Cadastrar
            </button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && (
              <>
                <Input
                  name="nome"
                  placeholder="Nome Completo"
                  onChange={handleChange}
                  required
                />
                <Input
                  name="telefone"
                  placeholder="Telefone"
                  onChange={handleChange}
                  required
                />
                <Input
                  name="endereco"
                  placeholder="Endereço"
                  onChange={handleChange}
                  required
                />
                <div className="space-y-3">
                  <label className="text-sm font-medium text-gray-700">
                    Eu sou:
                  </label>
                  <div className="flex gap-6">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="tipo"
                        value="GERADOR"
                        checked={formData.tipo === "GERADOR"}
                        onChange={handleChange}
                        className="w-5 h-5 accent-brand-500"
                      />
                      <span>Gerador</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="tipo"
                        value="COLETOR"
                        checked={formData.tipo === "COLETOR"}
                        onChange={handleChange}
                        className="w-5 h-5 accent-brand-500"
                      />
                      <span>Coletor</span>
                    </label>
                  </div>
                </div>
              </>
            )}
            <Input
              type="email"
              name="email"
              placeholder="Seu E-mail"
              onChange={handleChange}
              required
            />
            <Input
              type="password"
              name="senha"
              placeholder="Sua Senha"
              onChange={handleChange}
              required
            />
            {error && (
              <p className="text-red-500 text-center font-medium">{error}</p>
            )}

            <button
              type="submit"
              className="w-full bg-green-700 hover:bg-green-800 text-white py-3 rounded-lg font-bold transition-colors shadow-md"
            >
              {isLogin ? "Entrar na Plataforma" : "Criar Conta"}
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-10 text-center">
        <p>© 2025 EcoPoints. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}

// Componentes auxiliares
function FeatureCard({ icon, title, desc }) {
  return (
    <div className="group p-8 bg-white border border-gray-100 rounded-2xl shadow-md hover:shadow-xl transition-all text-center flex flex-col items-center hover:-translate-y-2">
      <div className="mb-6 bg-brand-50 p-5 rounded-2xl group-hover:bg-brand-100 transition-colors">
        {icon}
      </div>
      <h3 className="font-bold text-xl mb-3 text-gray-800">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{desc}</p>
    </div>
  );
}

function Input({ ...props }) {
  return (
    <input
      {...props}
      className="w-full px-5 py-4 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
    />
  );
}
