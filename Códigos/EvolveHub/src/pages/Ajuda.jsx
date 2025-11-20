// src/pages/Ajuda.jsx
import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Image, Nav, Alert } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { 
    HouseDoorFill, 
    ClockFill, 
    PersonFill, 
    QuestionCircleFill, 
    GearFill,
    Search,
    EnvelopeFill
} from 'react-bootstrap-icons';

// Importa o CSS customizado (pode usar o mesmo do Profile)
import './Ajuda.css';

// Importa uma imagem de avatar (substitua pelo caminho do seu avatar)
import userAvatar from '../assets/Logo.jpg'; 

function Ajuda() {
    // Simula dados do usuário
    const user = {
        nickName: "Alexa",
        email: "alexarawles@gmail.com"
    };

    // Estados para o formulário de ajuda
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState(user.email);
    const [mensagem, setMensagem] = useState('');
    const [enviado, setEnviado] = useState(false);
    const [erro, setErro] = useState('');

    // Para o link ativo da sidebar
    const location = useLocation();

    const handleSubmit = (e) => {
        e.preventDefault();
        setErro('');

        // Validações básicas
        if (!nome.trim() || !email.trim() || !mensagem.trim()) {
            setErro('Por favor, preencha todos os campos.');
            return;
        }

        if (!email.includes('@')) {
            setErro('Por favor, insira um email válido.');
            return;
        }

        // Simulação de envio do formulário
        console.log('Dados do formulário de ajuda:', { nome, email, mensagem });
        
        // Simula envio bem-sucedido
        setEnviado(true);
        
        // Limpa o formulário após 3 segundos
        setTimeout(() => {
            setNome('');
            setEmail(user.email);
            setMensagem('');
            setEnviado(false);
        }, 3000);
    };

    return (
        <div className="profile-layout">
            
            {/* 1. BARRA LATERAL (SIDEBAR) - MESMA ESTRUTURA DO PROFILE */}
            <nav className="profile-sidebar">
                <Nav className="flex-column sidebar-nav">
                    <Nav.Link 
                        as={Link} to="/dashboard" 
                        className={`sidebar-link ${location.pathname.includes('/dashboard') ? 'active' : ''}`}
                    >
                        <HouseDoorFill />
                    </Nav.Link>
                    <Nav.Link 
                        as={Link} to="/trilha" 
                        className={`sidebar-link ${location.pathname.includes('/trilha') ? 'active' : ''}`}
                    >
                        <ClockFill />
                    </Nav.Link>
                    <Nav.Link 
                        as={Link} to="/profile" 
                        className={`sidebar-link ${location.pathname.includes('/profile') ? 'active' : ''}`}
                    >
                        <PersonFill />
                    </Nav.Link>
                    <Nav.Link 
                        as={Link} to="/ajuda" 
                        className={`sidebar-link ${location.pathname.includes('/ajuda') ? 'active' : ''} mt-auto`}
                    >
                        <QuestionCircleFill />
                    </Nav.Link>
                    <Nav.Link 
                        as={Link} to="/settings" 
                        className={`sidebar-link ${location.pathname.includes('/settings') ? 'active' : ''}`}
                    >
                        <GearFill />
                    </Nav.Link>
                </Nav>
            </nav>

            {/* 2. CONTEÚDO PRINCIPAL (DIREITA) */}
            <div className="profile-main-content">

                {/* 3. CABEÇALHO (TOPO) - MESMA ESTRUTURA DO PROFILE */}
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

                {/* 4. ÁREA DE CONTEÚDO DA AJUDA */}
                <div className="profile-content-area">
                    {/* Banner com Gradiente */}
                    <div className="profile-banner"></div>

                    {/* Título da Página de Ajuda */}
                    <div className="help-title-section">
                        <div className="help-title-content">
                            <h2>Precisa de Ajuda?</h2>
                            <p>Entre em contato conosco através do formulário abaixo</p>
                        </div>
                    </div>

                    {/* Formulário de Ajuda */}
                    <div className="help-form-container">
                        {enviado && (
                            <Alert variant="success" className="mb-4">
                                ✅ Mensagem enviada com sucesso! Entraremos em contato em breve.
                            </Alert>
                        )}

                        {erro && (
                            <Alert variant="danger" className="mb-4">
                                ❌ {erro}
                            </Alert>
                        )}

                        <Form onSubmit={handleSubmit}>
                            <Row className="form-grid">
                                <Col md={6} className="form-section">
                                    <Form.Label htmlFor="nome">
                                        <strong>Nome *</strong>
                                    </Form.Label>
                                    <Form.Control 
                                        type="text" 
                                        id="nome" 
                                        placeholder="Digite seu nome completo"
                                        value={nome}
                                        onChange={(e) => setNome(e.target.value)}
                                        required
                                    />
                                </Col>

                                <Col md={6} className="form-section">
                                    <Form.Label htmlFor="email">
                                        <strong>Email *</strong>
                                    </Form.Label>
                                    <Form.Control 
                                        type="email" 
                                        id="email" 
                                        placeholder="seu@email.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </Col>

                                <Col xs={12} className="form-section">
                                    <Form.Label htmlFor="mensagem">
                                        <strong>Escreva sua mensagem sobre o que podemos lhe ajudar *</strong>
                                    </Form.Label>
                                    <Form.Control 
                                        as="textarea" 
                                        id="mensagem" 
                                        rows={6}
                                        placeholder="Descreva em detalhes como podemos ajudá-lo..."
                                        value={mensagem}
                                        onChange={(e) => setMensagem(e.target.value)}
                                        required
                                    />
                                    <Form.Text className="text-muted">
                                        Quanto mais detalhes você fornecer, melhor poderemos ajudá-lo.
                                    </Form.Text>
                                </Col>
                            </Row>

                            <div className="text-center mt-4">
                                <Button 
                                    type="submit" 
                                    className="btn-edit-profile"
                                    size="lg"
                                >
                                    Enviar Mensagem
                                </Button>
                            </div>
                        </Form>

                        <hr className="my-4" />

                        {/* Informações de Contato Adicionais */}
                        <div className="email-section">
                            <h3 className="email-section-title">Outras formas de contato</h3>
                            <div className="email-item">
                                <EnvelopeFill className="email-icon" />
                                <div className="email-info">
                                    <p>suporte@evolvehub.com</p>
                                    <span>Respondemos em até 24h</span>
                                </div>
                            </div>
                            <div className="email-item mt-3">
                                <EnvelopeFill className="email-icon" />
                                <div className="email-info">
                                    <p>FAQ - Perguntas Frequentes</p>
                                    <span>Encontre respostas rápidas</span>
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