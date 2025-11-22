// src/pages/Login.jsx
import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight } from 'react-bootstrap-icons';

import './Login.css';

function Login({ onLoginSuccess }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [erro, setErro] = useState(null);
    const navigate = useNavigate();

    // 1. Lógica de Login (Admin)
    const handleLogin = (e) => {
        e.preventDefault();
        setErro(null);

        if (email === 'admin@admin.com.br' && password === 'admin1234') {
            // Salva perfil de ADMIN
            localStorage.setItem('evolvehub_user', JSON.stringify({
                nickName: 'Alexa',
                fullName: 'Alexa Rawles',
                email: 'alexarawles@gmail.com',
                role: 'admin'
            }));
            onLoginSuccess();
            navigate('/dashboard');
        } else {
            setErro("Email ou senha inválidos. Tente novamente.");
        }
    };

    // 2. Lógica de Login (Convidado)
    const handleGuestLogin = () => {
        // Salva perfil de CONVIDADO
        localStorage.setItem('evolvehub_user', JSON.stringify({
            nickName: 'Visitante',
            fullName: 'Usuário Convidado',
            email: '',
            role: 'guest'
        }));
        onLoginSuccess(); // Libera o acesso
        navigate('/dashboard');
    };

    return (
        <div className="login-layout">
            <div className="login-art-column">
                <div className="blob blob-orange"></div>
                <div className="blob blob-blue"></div>
            </div>

            <div className="login-form-column">
                <div className="login-form-container">

                    <h2 className="login-title">LOGIN</h2>

                    {erro && <Alert variant="danger" className="mb-3">{erro}</Alert>}

                    <Form onSubmit={handleLogin}>
                        <Form.Group className="login-form-group" controlId="formLoginEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Digite seu email aqui"
                                className="login-input"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="login-form-group" controlId="formLoginPassword">
                            <Form.Label>Senha</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Digite sua senha aqui"
                                className="login-input"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Button className="btn-login-primary mb-3" type="submit">
                            Entrar
                        </Button>
                    </Form>

                    {/* Botão de Convidado */}
                    <Button
                        variant="outline-secondary"
                        className="w-100 mb-4 d-flex align-items-center justify-content-center gap-2"
                        style={{ borderRadius: '12px', padding: '0.75rem', fontWeight: 500 }}
                        onClick={handleGuestLogin}
                    >
                        Continuar sem login <ArrowRight />
                    </Button>

                    <div className="login-divider border-top pt-3">
                        <p className="login-secondary-link mb-0">
                            Não tem cadastro? <Link to="/criar-conta">Crie seu cadastro</Link>
                        </p>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Login;