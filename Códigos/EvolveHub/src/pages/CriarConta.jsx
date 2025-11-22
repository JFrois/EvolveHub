import './CriarConta.css';

// src/pages/SignUp.jsx
import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

// Importa o CSS (pode usar o mesmo CSS do Login)
import './CriarConta.css';

function SignUp({ onLoginSuccess }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [erro, setErro] = useState(null);
    const navigate = useNavigate();

    const handleSignUp = (e) => {
        e.preventDefault();
        setErro(null);

        // Validações
        if (password !== confirmPassword) {
            setErro("As senhas não coincidem. Tente novamente.");
            return;
        }

        if (password.length < 6) {
            setErro("A senha deve ter pelo menos 6 caracteres.");
            return;
        }

        // Lógica de cadastro (aqui você pode integrar com sua API)
        // Por enquanto, vamos simular um cadastro bem-sucedido
        console.log('Cadastro realizado:', { email, password });
        
        onLoginSuccess(); // Chama a função do App.jsx para mudar o estado
        navigate('/dashboard'); // Redireciona para o dashboard
    };

    return (
        <div className="login-layout">
            
            <div className="login-art-column">
                <div className="blob blob-orange"></div>
                <div className="blob blob-blue"></div>
                {/* <img src={balaoImg} alt="Balão de ar quente" className="login-art-image" /> */}
            </div>

            {/* COLUNA DO FORMULÁRIO (DIREITA) */}
            <div className="login-form-column">
                <div className="login-form-container">
                    
                    <h2 className="login-title">Crie sua conta</h2>
                    
                    {/* Exibe o Alert de erro, se existir */}
                    {erro && <Alert variant="danger" className="mb-3">{erro}</Alert>}
                    
                    <Form onSubmit={handleSignUp}>
                        <Form.Group className="login-form-group" controlId="formSignUpEmail">
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

                        <Form.Group className="login-form-group" controlId="formSignUpPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="Senha"
                                placeholder="Digite sua senha aqui"
                                className="login-input"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                minLength={6}
                            />
                        </Form.Group>

                        <Form.Group className="login-form-group" controlId="formConfirmPassword">
                            <Form.Label>Confirme sua senha</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Confirme sua senha aqui"
                                className="login-input"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                minLength={6}
                            />
                        </Form.Group>

                        <Button className="btn-login-primary" type="submit">
                            Criar conta
                        </Button>
                    </Form>

                    <p className="login-secondary-link">
                        Já possui conta? <Link to="/login">Login</Link>
                    </p>

                </div>
            </div>
        </div>
    );
}

export default SignUp;