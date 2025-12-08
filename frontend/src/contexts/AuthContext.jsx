import { createContext, useState, useContext } from 'react';
import { authService } from '../services/api';

const AuthContext = createContext({});

export function AuthProvider({ children }) {

  const [user, setUser] = useState(() => {
    const storedToken = localStorage.getItem('token');
    return storedToken ? { token: storedToken } : null;
  });

  const [loading] = useState(false);

  const login = async (email, senha) => {
    try {
      const data = await authService.login({ email, senha });
      const { token } = data;
      
      localStorage.setItem('token', token);
      setUser({ token });
      return { success: true };
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