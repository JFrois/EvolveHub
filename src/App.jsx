// src/App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Importar componentes e páginas
import AppNavbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Trilha from './pages/Trilha';
import LabIA from './pages/LabIA';
import Profile from './pages/Profile';
import Admin from './pages/Admin';
import Login from './pages/Login';
import CriarConta from './pages/CriarConta';
import Ajuda from './pages/Ajuda';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Novo estado para evitar "piscada" do login

  // EFEITO: Verifica se já existe um usuário salvo ao abrir o site
  useEffect(() => {
    const user = localStorage.getItem('evolvehub_user');
    if (user) {
      setIsLoggedIn(true);
    }
    setIsLoading(false);
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    // Remove o usuário da memória ao sair
    localStorage.removeItem('evolvehub_user');
    setIsLoggedIn(false);
  };

  // Enquanto verifica o login, mostra nada (ou poderia ser um Loading...)
  if (isLoading) return null;

  return (
    <BrowserRouter>

      {/* Navbar aparece APENAS quando logado */}
      {isLoggedIn && <AppNavbar onLogout={handleLogout} />}

      <Routes>
        {/* === ROTAS PÚBLICAS === */}
        <Route
          path="/login"
          element={
            isLoggedIn
              ? <Navigate to="/dashboard" />
              : <Login onLoginSuccess={handleLogin} />
          }
        />

        <Route
          path="/criar-conta"
          element={
            isLoggedIn
              ? <Navigate to="/dashboard" />
              : <CriarConta onLoginSuccess={handleLogin} />
          }
        />

        {/* Rota Raiz (/) */}
        <Route
          path="/"
          element={
            isLoggedIn
              ? <Navigate to="/dashboard" />
              : <Navigate to="/login" />
          }
        />

        {/* === ROTAS PROTEGIDAS === */}
        <Route
          path="/dashboard"
          element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/trilha"
          element={isLoggedIn ? <Trilha /> : <Navigate to="/login" />}
        />
        <Route
          path="/lab-ia"
          element={isLoggedIn ? <LabIA /> : <Navigate to="/login" />}
        />
        <Route
          path="/profile"
          element={isLoggedIn ? <Profile /> : <Navigate to="/login" />}
        />
        <Route
          path="/admin"
          element={isLoggedIn ? <Admin /> : <Navigate to="/login" />}
        />
        <Route
          path="/settings"
          element={isLoggedIn ? <div>Página de Configurações</div> : <Navigate to="/login" />}
        />
        <Route
          path="/ajuda"
          element={isLoggedIn ? <Ajuda /> : <Navigate to="/login" />}
        />

        {/* === CATCH-ALL (Sempre por último) === */}
        <Route path="*" element={<Navigate to={isLoggedIn ? "/dashboard" : "/login"} />} />

      </Routes>

    </BrowserRouter>
  );
}

export default App;