// src/pages/Profile.jsx
import React from 'react';
import { Container, Row, Col, Form, Button, Image, Nav } from 'react-bootstrap';
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

// Importa o CSS customizado
import './Profile.css';

// Importa uma imagem de avatar (substitua pelo caminho do seu avatar)
import userAvatar from '../assets/Logo.jpg'; 
import userAvatarLarge from '../assets/Logo.jpg'; 

function Profile() {
    // Simula dados do usuário
    const user = {
        fullName: "Alexa Rawles",
        nickName: "Alexa",
        email: "alexarawles@gmail.com",
        gender: "Female",
        country: "Brazil",
        language: "Portuguese (BR)",
        timeZone: "(GMT-03:00) Brasilia"
    };

    // Para o link ativo da sidebar
    const location = useLocation();

    return (
        <div className="profile-layout">
            
            {/* 1. BARRA LATERAL (SIDEBAR) */}
            <nav className="profile-sidebar">
                <Nav className="flex-column sidebar-nav">
                    {/* Use 'as={Link}' para navegação com React Router */}
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
                        className={`sidebar-link ${location.pathname.includes('/ajuda') ? 'active' : ''} mt-auto`} // mt-auto empurra para baixo
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

                {/* 3. CABEÇALHO (TOPO) */}
                <header className="profile-header">
                    <div className="header-welcome">
                        <h1>Welcome, {user.nickName}</h1>
                        <p>Tue, 13 November 2025</p>
                    </div>

                    <div className="d-flex align-items-center gap-3">
                        <div className="search-bar-container">
                            <Search className="search-icon" />
                            <Form.Control type="search" placeholder="Search" className="search-bar" />
                        </div>
                        <Image src={userAvatar} alt="User Avatar" className="header-avatar" roundedCircle />
                    </div>
                </header>

                {/* 4. ÁREA DE CONTEÚDO DO PERFIL (CARD BRANCO) */}
                <div className="profile-content-area">
                    {/* Banner com Gradiente */}
                    <div className="profile-banner"></div>

                    {/* Seção do Avatar e Botão Editar */}
                    <div className="profile-avatar-section">
                        <Image src={userAvatarLarge} alt="Alexa Rawles" className="profile-avatar" />
                        <div className="profile-avatar-info">
                            <h2>{user.fullName}</h2>
                            <p>{user.email}</p>
                        </div>
                        <Button className="btn-edit-profile">Edit</Button>
                    </div>

                    {/* Formulário de Perfil */}
                    <div className="profile-form-container">
                        <Form>
                            <Row className="form-grid">
                                <Col md={6} className="form-section">
                                    <Form.Label htmlFor="fullName">Full Name</Form.Label>
                                    <Form.Control type="text" id="fullName" defaultValue={user.fullName} />
                                </Col>
                                <Col md={6} className="form-section">
                                    <Form.Label htmlFor="nickName">Nick Name</Form.Label>
                                    <Form.Control type="text" id="nickName" defaultValue={user.nickName} />
                                </Col>
                                <Col md={6} className="form-section">
                                    <Form.Label htmlFor="gender">Gender</Form.Label>
                                    <Form.Select id="gender" defaultValue={user.gender}>
                                        <option>Female</option>
                                        <option>Male</option>
                                        <option>Other</option>
                                    </Form.Select>
                                </Col>
                                <Col md={6} className="form-section">
                                    <Form.Label htmlFor="country">Country</Form.Label>
                                    <Form.Select id="country" defaultValue={user.country}>
                                        <option>Brazil</option>
                                        <option>United States</option>
                                        <option>Portugal</option>
                                    </Form.Select>
                                </Col>
                                <Col md={6} className="form-section">
                                    <Form.Label htmlFor="language">Language</Form.Label>
                                    <Form.Select id="language" defaultValue={user.language}>
                                        <option>Portuguese (BR)</option>
                                        <option>English (US)</option>
                                    </Form.Select>
                                </Col>
                                <Col md={6} className="form-section">
                                    <Form.Label htmlFor="timeZone">Time Zone</Form.Label>
                                    <Form.Select id="timeZone" defaultValue={user.timeZone}>
                                        <option>(GMT-03:00) Brasilia</option>
                                        <option>(GMT-05:00) Eastern Time</option>
                                    </Form.Select>
                                </Col>
                            </Row>
                        </Form>

                        <hr className="my-4" />

                        {/* Seção de Email */}
                        <div className="email-section">
                            <h3 className="email-section-title">My email Address</h3>
                            <div className="email-item">
                                <EnvelopeFill className="email-icon" />
                                <div className="email-info">
                                    <p>{user.email}</p>
                                    <span>1 month ago</span>
                                </div>
                            </div>
                            <Button className="btn-add-email">+ Add Email Address</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;