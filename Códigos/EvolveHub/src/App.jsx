// src/App.jsx
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Importar o Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css'; 

// Importar seu componente Navbar
import AppNavbar from './components/Navbar'; // (ou Navbrar.jsx se você manteve o nome com erro de digitação)

// Importar suas páginas
import Dashboard from './pages/Dashboard';
import Trilha from './pages/Trilha';
import LabIA from './pages/LabIA';
import Profile from './pages/Profile';
import Admin from './pages/Admin';
import Login from './pages/Login'; // Importar a página de Login

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <BrowserRouter>
      
      {isLoggedIn && <AppNavbar onLogout={handleLogout} />}
      
      <Routes>
        {/* Rota de Login */}
        <Route 
          path="/login" 
          element={
            isLoggedIn 
              ? <Navigate to="/dashboard" />
              : <Login onLoginSuccess={handleLogin} />
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

        {/* Rotas Protegidas */}
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
        
        {/* Rotas da sidebar do Perfil */}
        <Route 
          path="/ajuda" 
          element={isLoggedIn ? <div>Página de Ajuda</div> : <Navigate to="/login" />} 
        />
        <Route 
          path="/settings" 
          element={isLoggedIn ? <div>Página de Configurações</div> : <Navigate to="/login" />} 
        />

        {/* Rota "catch-all" */}
        <Route path="*" element={<Navigate to={isLoggedIn ? "/dashboard" : "/login"} />} />
      </Routes>
      
    </BrowserRouter>
  );
}

export default App;