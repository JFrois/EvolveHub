// src/pages/CriarConta.jsx
import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import './CriarConta.css';

function CriarConta({ onLoginSuccess }) {
    const [name, setName] = useState(''); // Novo campo Nome
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

        const newUser = {
            fullName: name,       
            nickName: name.split(' ')[0], 
            email: email,
            role: 'user',
            gender: 'Prefer not to say',
            country: 'Brazil'
        };

        // Salva no navegador (Simulando um Banco de Dados)
        localStorage.setItem('evolvehub_user', JSON.stringify(newUser));

        console.log('Conta criada com sucesso:', newUser);

        // Atualiza o estado global de login e redireciona
        onLoginSuccess();
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

                    <h2 className="login-title">Crie sua conta</h2>

                    {erro && <Alert variant="danger" className="mb-3">{erro}</Alert>}

                    <Form onSubmit={handleSignUp}>
                        <Form.Group className="login-form-group" controlId="formSignUpName">
                            <Form.Label>Nome Completo</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Seu nome"
                                className="login-input"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="login-form-group" controlId="formSignUpEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="seu@email.com"
                                className="login-input"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="login-form-group" controlId="formSignUpPassword">
                            <Form.Label>Senha</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Mínimo 6 caracteres"
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
                                placeholder="Repita a senha"
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
                        Já possui conta? <Link to="/login">Fazer Login</Link>
                    </p>

                </div>
            </div>
        </div>
    );
}

export default CriarConta;