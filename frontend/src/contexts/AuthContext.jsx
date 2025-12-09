import { createContext, useState, useContext } from 'react';
import { authService } from '../services/api';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext({});

export function AuthProvider({ children }) {

  const [user, setUser] = useState(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      try {
        const decoded = jwtDecode(storedToken);
        return { token: storedToken, nome: decoded.nome, tipo: decoded.tipo, email: decoded.sub };
      } catch {
        return { token: storedToken };
      }
    }
    return null;
  });

  const [loading] = useState(false);

  const login = async (email, senha) => {
    try {
      const data = await authService.login({ email, senha });
      const { token } = data;
      
      localStorage.setItem('token', token);
      
      let userInfo = { token };
      try {
        const decoded = jwtDecode(token);
        userInfo = { token, nome: decoded.nome, tipo: decoded.tipo, email: decoded.sub };
        setUser(userInfo);
      } catch {
        setUser({ token });
      }
      
      return { success: true, user: userInfo };
    } catch (error) {
      return { success: false, error: error.response?.data?.message || "Falha no login" };
    }
  };

  const register = async (userData) => {
    try {
      await authService.register(userData);
      return { success: true };
    } catch (error) {
      console.error(error);
      return { success: false, error: "Erro ao cadastrar. Verifique os dados." };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ signed: !!user, user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);