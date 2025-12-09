import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Home from './pages/Home';
import HomeGerador from './pages/HomeGerador';

// exemplo pra proxima tela apos login/cadastro
const Dashboard = () => <div className="p-10 text-2xl">Bem-vindo ao Dashboard (area do Coletor/Gerador)</div>;

// Rota Privada Wrapper
function PrivateRoute({ children }) {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/" />;
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route 
            path="/dashboard" 
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/gerador" 
            element={
              <PrivateRoute>
                <HomeGerador />
              </PrivateRoute>
            } 
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;