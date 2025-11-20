// src/pages/Login.jsx
import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom'; // Precisa do useNavigate
import { Google, Github } from 'react-bootstrap-icons';

// Importa o CSS
import './Login.css';

// Recebe a prop 'onLoginSuccess' do App.jsx
function Login({ onLoginSuccess }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [erro, setErro] = useState(null); // Estado para mensagens de erro
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        setErro(null); // Limpa erros anteriores

        // Lógica de autenticação com os dados fornecidos
        if (email === 'admin@admin.com.br' && password === 'admin1234') {
            // Sucesso
            onLoginSuccess(); // Chama a função do App.jsx para mudar o estado
            navigate('/dashboard'); // Redireciona para o dashboard
        } else {
            // Falha
            setErro("Email ou senha inválidos. Tente novamente.");
        }
    };

    return (
        <div className="login-layout">
            
            <div className="login-art-column">
                <div className="blob blob-orange"></div>
                <div className="blob blob-blue"></div>
                {/* <img src={balaoImg} alt="Balão de ar quente" className="login-art-image" /> */}
            </div>

            {/* 2. COLUNA DO FORMULÁRIO (DIREITA) */}
            <div className="login-form-column">
                <div className="login-form-container">
                    
                    <h2 className="login-title">Login to your Account</h2>
                    
                    {/* Exibe o Alert de erro, se existir */}
                    {erro && <Alert variant="danger" className="mb-3">{erro}</Alert>}
                    
                    <Form onSubmit={handleLogin}>
                        <Form.Group className="login-form-group" controlId="formLoginEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter your Email here"
                                className="login-input"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="login-form-group" controlId="formLoginPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Enter your Password here"
                                className="login-input"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Button className="btn-login-primary" type="submit">
                            Login
                        </Button>
                    </Form>

                    <p className="login-secondary-link">
                        Don't have an account? <Link to="/criar-conta">Sign Up</Link>
                    </p>
                    
                    <div className="login-divider">- OR -</div>

                    <Button className="btn-social-login">
                        <Google size={20} />
                        Sign in with Google
                    </Button>

                    <Button className="btn-social-login">
                        <Github size={20} />
                        Sign in with GitHub
                    </Button>

                </div>
            </div>
        </div>
    );
}

export default Login;