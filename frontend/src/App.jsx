import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Home from './pages/Home';
import ColetorDashboard from './pages/ColetorDashboard';

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
                <ColetorDashboard />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/coletor/dashboard" 
            element={
              <PrivateRoute>
                <ColetorDashboard />
              </PrivateRoute>
            } 
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;