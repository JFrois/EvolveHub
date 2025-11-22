// src/pages/Ajuda.jsx
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Image, Nav, Alert } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import {
    HouseDoorFill, ClockFill, PersonFill, QuestionCircleFill, GearFill, Search, EnvelopeFill
} from 'react-bootstrap-icons';
import './Ajuda.css';
import userAvatar from '../assets/Logo.jpg';

function Ajuda() {
    // Estados do formulário
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [mensagem, setMensagem] = useState('');
    const [enviado, setEnviado] = useState(false);
    const [erro, setErro] = useState('');

    const location = useLocation();

    // Carregar dados do usuário ao abrir a página
    useEffect(() => {
        const storedUser = localStorage.getItem('evolvehub_user');
        if (storedUser) {
            const user = JSON.parse(storedUser);
            if (user.fullName) setNome(user.fullName);
            if (user.email) setEmail(user.email);
        }
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        setErro('');

        if (!nome.trim() || !email.trim() || !mensagem.trim()) {
            setErro('Por favor, preencha todos os campos.');
            return;
        }

        setEnviado(true);
        setTimeout(() => {
            setMensagem('');
            setEnviado(false);
        }, 3000);
    };

    return (
        <div className="profile-layout">
            <nav className="profile-sidebar">
                <Nav className="flex-column sidebar-nav">
                    <Nav.Link as={Link} to="/dashboard" className={`sidebar-link ${location.pathname.includes('/dashboard') ? 'active' : ''}`}>
                        <HouseDoorFill />
                    </Nav.Link>
                    <Nav.Link as={Link} to="/trilha" className={`sidebar-link ${location.pathname.includes('/trilha') ? 'active' : ''}`}>
                        <ClockFill />
                    </Nav.Link>
                    <Nav.Link as={Link} to="/profile" className={`sidebar-link ${location.pathname.includes('/profile') ? 'active' : ''}`}>
                        <PersonFill />
                    </Nav.Link>
                    <Nav.Link as={Link} to="/ajuda" className={`sidebar-link ${location.pathname.includes('/ajuda') ? 'active' : ''} mt-auto`}>
                        <QuestionCircleFill />
                    </Nav.Link>
                </Nav>
            </nav>

            <div className="profile-main-content">
                <header className="profile-header">
                    <div className="header-welcome">
                        <h1>Central de Ajuda</h1>
                        <p>Estamos aqui para ajudar você!</p>
                    </div>
                    <div className="d-flex align-items-center gap-3">
                        <div className="search-bar-container">
                            <Search className="search-icon" />
                            <Form.Control type="search" placeholder="Search" className="search-bar" />
                        </div>
                        <Image src={userAvatar} alt="User Avatar" className="header-avatar" roundedCircle />
                    </div>
                </header>

                <div className="profile-content-area">
                    <div className="profile-banner"></div>
                    <div className="help-title-section">
                        <div className="help-title-content">
                            <h2>Precisa de Ajuda?</h2>
                            <p>Entre em contato conosco através do formulário abaixo</p>
                        </div>
                    </div>

                    <div className="help-form-container">
                        {enviado && (
                            <Alert variant="success" className="mb-4">✅ Mensagem enviada com sucesso!</Alert>
                        )}
                        {erro && <Alert variant="danger" className="mb-4">❌ {erro}</Alert>}

                        <Form onSubmit={handleSubmit}>
                            <Row className="form-grid">
                                <Col md={6} className="form-section">
                                    <Form.Label><strong>Nome *</strong></Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={nome}
                                        onChange={(e) => setNome(e.target.value)}
                                        required
                                    />
                                </Col>
                                <Col md={6} className="form-section">
                                    <Form.Label><strong>Email *</strong></Form.Label>
                                    <Form.Control
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </Col>
                                <Col xs={12} className="form-section">
                                    <Form.Label><strong>Mensagem *</strong></Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={6}
                                        value={mensagem}
                                        onChange={(e) => setMensagem(e.target.value)}
                                        required
                                    />
                                </Col>
                            </Row>
                            <div className="text-center mt-4">
                                <Button type="submit" className="btn-edit-profile" size="lg">Enviar Mensagem</Button>
                            </div>
                        </Form>

                        <hr className="my-4" />

                        <div className="email-section">
                            <h3 className="email-section-title">Outras formas de contato</h3>
                            <div className="email-item">
                                <EnvelopeFill className="email-icon" />
                                <div className="email-info">
                                    <p>suporte@evolvehub.com</p>
                                    <span>Respondemos em até 24h</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Ajuda;