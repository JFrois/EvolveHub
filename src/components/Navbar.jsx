// src/components/AppNavbar.jsx
import { Navbar, Container, Nav, Button } from 'react-bootstrap'; // 1. Adicionar Button
import { Link, useNavigate } from 'react-router-dom'; // 2. Adicionar useNavigate
import { PersonFill } from 'react-bootstrap-icons';
import logo from '../assets/Logo.jpg'; 
import './Navbar.css'; 

// 3. Receber a prop { onLogout }
function AppNavbar({ onLogout }) {
    const navigate = useNavigate();

    const handleLogoutClick = () => {
        onLogout(); // Chama a função do App.jsx para setar isLoggedIn(false)
        navigate('/login'); // Redireciona para a tela de login
    };

    return (
        <Navbar bg="white" variant="light" expand="lg" sticky="top" className="main-navbar shadow-sm">
            <Container>
                {/* 4. Mudar link do logo para /dashboard */}
                <Navbar.Brand as={Link} to="/dashboard" className="navbar-logo-brand">
                    <img
                        src={logo}
                        width="30"
                        height="30"
                        className="d-inline-block align-top me-2"
                        alt="EvolveHub Logo"
                    />
                    Evolve<span style={{ color: '#FD7E14' }}>Hub</span>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    
                    <Nav className="me-auto">
                        {/* 5. Mudar link de "Inicio" para /dashboard */}
                        <Nav.Link as={Link} to="/dashboard" className="nav-link-custom">Inicio</Nav.Link>
                        <Nav.Link as={Link} to="/trilha" className="nav-link-custom">Trilha</Nav.Link>
                        <Nav.Link as={Link} to="/lab-ia" className="nav-link-custom">IA</Nav.Link>
                        <Nav.Link as={Link} to="/admin" className="nav-link-custom">Saude</Nav.Link>
                    </Nav>

                    <Nav className="ms-auto d-flex align-items-center">
                        <Nav.Link 
                            as={Link} 
                            to="/profile" 
                            className="navbar-profile-icon" 
                            aria-label="Ver Perfil"
                        >
                            <PersonFill size={22} />
                        </Nav.Link>
                        {/* 6. Adicionar botão de Logout */}
                        <Button variant="outline-danger" size="sm" onClick={handleLogoutClick} className="ms-3 d-none d-lg-block">
                            Sair
                        </Button>
                        {/* Link de Sair para a versão mobile (dentro do menu hamburguer) */}
                        <Nav.Link onClick={handleLogoutClick} className="d-lg-none nav-link-custom">
                            Sair
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default AppNavbar;