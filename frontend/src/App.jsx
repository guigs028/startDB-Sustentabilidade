import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Home from './pages/Home';
import ColetorDashboard from './pages/ColetorDashboard';
import HomeGerador from './pages/HomeGerador';
import Profile from './pages/Profile';
import EditProfile from './pages/EditProfile';
import MeusDescartes from './pages/MeusDescartes';
import NovoDescarte from './pages/NovoDescarte';
import Layout from './components/Layout';

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
          <Route 
            path="/gerador" 
            element={
              <PrivateRoute>
                <Layout>
                  <HomeGerador />
                </Layout>
              </PrivateRoute>
            } 
          />
          <Route 
            path="/profile" 
            element={
              <PrivateRoute>
                <Layout>
                  <Profile />
                </Layout>
              </PrivateRoute>
            } 
          />
          <Route 
            path="/profile/edit" 
            element={
              <PrivateRoute>
                <Layout>
                  <EditProfile />
                </Layout>
              </PrivateRoute>
            } 
          />
          <Route 
            path="/descartes" 
            element={
              <PrivateRoute>
                <Layout>
                  <MeusDescartes />
                </Layout>
              </PrivateRoute>
            } 
          />
          <Route 
            path="/descartes/novo" 
            element={
              <PrivateRoute>
                <Layout>
                  <NovoDescarte />
                </Layout>
              </PrivateRoute>
            } 
          />
          
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;