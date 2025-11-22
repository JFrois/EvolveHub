// src/pages/Profile.jsx
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Image, Nav, Alert } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import {
    HouseDoorFill, ClockFill, PersonFill, QuestionCircleFill, Search, EnvelopeFill, PencilSquare, CheckLg, XLg
} from 'react-bootstrap-icons';
import './Profile.css';
import userAvatar from '../assets/Logo.jpg';

function Profile() {
    // Estado inicial
    const [user, setUser] = useState({
        fullName: "",
        nickName: "",
        email: "",
        gender: "Prefer not to say",
        country: "Brazil",
        role: ""
    });

    const [isEditing, setIsEditing] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const location = useLocation();

    useEffect(() => {
        // Carrega dados de quem fez login
        const storedUser = localStorage.getItem('evolvehub_user');
        if (storedUser) {
            try {
                const parsed = JSON.parse(storedUser);
                setUser(prev => ({ ...prev, ...parsed }));
            } catch (e) {
                console.error("Erro ao carregar perfil", e);
            }
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        // Salva no localStorage
        localStorage.setItem('evolvehub_user', JSON.stringify(user));
        setIsEditing(false);
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
    };

    const handleCancel = () => {
        // Recarrega do storage para desfazer alterações
        const storedUser = localStorage.getItem('evolvehub_user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setIsEditing(false);
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
                        <h1>Olá, {user.nickName || 'Usuário'}</h1>
                        <p>{new Date().toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                    </div>
                    <div className="d-flex align-items-center gap-3">
                        <div className="search-bar-container">
                            <Search className="search-icon" />
                            <Form.Control type="search" placeholder="Pesquisar" className="search-bar" />
                        </div>
                        <Image src={userAvatar} alt="Avatar" className="header-avatar" roundedCircle />
                    </div>
                </header>

                <div className="profile-content-area">
                    <div className="profile-banner"></div>
                    <div className="profile-avatar-section">
                        <Image src={userAvatar} alt="Profile" className="profile-avatar" />
                        <div className="profile-avatar-info">
                            <h2>{user.fullName || 'Seu Nome'}</h2>
                            <p>{user.email || 'Sem email cadastrado'}</p>
                        </div>

                        <div className="d-flex gap-2">
                            {!isEditing ? (
                                <Button className="btn-edit-profile" onClick={() => setIsEditing(true)}>
                                    <PencilSquare className="me-2" /> Editar Perfil
                                </Button>
                            ) : (
                                <>
                                    <Button variant="success" className="d-flex align-items-center" onClick={handleSave}>
                                        <CheckLg className="me-1" /> Salvar
                                    </Button>
                                    <Button variant="outline-secondary" className="d-flex align-items-center" onClick={handleCancel}>
                                        <XLg className="me-1" /> Cancelar
                                    </Button>
                                </>
                            )}
                        </div>
                    </div>

                    <div className="profile-form-container">
                        {showSuccess && <Alert variant="success">Perfil atualizado com sucesso!</Alert>}

                        <Form>
                            <Row className="form-grid">
                                <Col md={6} className="form-section">
                                    <Form.Label>Nome completo</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="fullName"
                                        value={user.fullName}
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                    />
                                </Col>
                                <Col md={6} className="form-section">
                                    <Form.Label>Apelido (Como quer ser chamado)</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="nickName"
                                        value={user.nickName}
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                    />
                                </Col>
                                <Col md={6} className="form-section">
                                    <Form.Label>Gênero</Form.Label>
                                    <Form.Select
                                        name="gender"
                                        value={user.gender}
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                    >
                                        <option>Feminino</option>
                                        <option>Masculino</option>
                                        <option>Outro</option>
                                        <option>Prefiro não dizer</option>
                                    </Form.Select>
                                </Col>
                                <Col md={6} className="form-section">
                                    <Form.Label>País</Form.Label>
                                    <Form.Select
                                        name="country"
                                        value={user.country}
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                    >
                                        <option>Brazil</option>
                                        <option>Portugal</option>
                                        <option>USA</option>
                                        <option>Outro</option>
                                    </Form.Select>
                                </Col>
                            </Row>
                        </Form>

                        <hr className="my-4" />

                        <div className="email-section">
                            <h3 className="email-section-title">Email</h3>
                            {user.email ? (
                                <div className="email-item">
                                    <EnvelopeFill className="email-icon" />
                                    <div className="email-info">
                                        <p>{user.email}</p>
                                        <span>Principal</span>
                                    </div>
                                </div>
                            ) : (
                                <div className="text-muted mb-3">
                                    <p>Você está em modo convidado e não possui e-mail vinculado.</p>
                                    {isEditing && (
                                        <Form.Control
                                            type="email"
                                            placeholder="Adicionar e-mail"
                                            name="email"
                                            value={user.email}
                                            onChange={handleChange}
                                        />
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;