import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import Input from "../ui/Input";
import { getUserRole, getRedirectPathByRole } from "../../utils/jwtUtils";

export default function AuthSection() {
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
        // Usar utilitários de token adicionados pela main para decidir o redirecionamento
        const token = localStorage.getItem('token');
        const role = getUserRole(token);
        const redirectPath = getRedirectPathByRole(role);
        navigate(redirectPath);
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
        setFormData({ ...formData, nome: "", telefone: "", endereco: "" });
      } else {
        setError(result.error || "Erro ao cadastrar.");
      }
    }
  };

  return (
    <section id="auth-section" className="py-20 bg-white flex justify-center">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md border border-gray-200">
        <div className="flex mb-6 border-b">
          <button
            className={`flex-1 py-3 text-center font-semibold text-lg ${isLogin ? "text-brand-500 border-b-4 border-brand-500" : "text-gray-400"}`}
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>
          <button
            className={`flex-1 py-3 text-center font-semibold text-lg ${!isLogin ? "text-brand-500 border-b-4 border-brand-500" : "text-gray-400"}`}
            onClick={() => setIsLogin(false)}
          >
            Cadastrar
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {!isLogin && (
            <>
              <Input name="nome" placeholder="Nome Completo" onChange={handleChange} required />
              <Input name="telefone" placeholder="Telefone" onChange={handleChange} required />
              <Input name="endereco" placeholder="Endereço" onChange={handleChange} required />

              <div className="space-y-3">
                <label className="text-sm font-medium text-gray-700">Eu sou:</label>
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

          <Input type="email" name="email" placeholder="Seu E-mail" onChange={handleChange} required />
          <Input type="password" name="senha" placeholder="Sua Senha" onChange={handleChange} required />

          {error && <p className="text-red-500 text-center font-medium">{error}</p>}

          <button
            type="submit"
            className="w-full bg-green-700 hover:bg-green-800 text-white py-3 rounded-lg font-bold transition-colors shadow-md"
          >
            {isLogin ? "Entrar na Plataforma" : "Criar Conta"}
          </button>
        </form>
      </div>
    </section>
  );
}