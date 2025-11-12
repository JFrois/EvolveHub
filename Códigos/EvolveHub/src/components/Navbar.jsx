// src/components/Navbar.jsx
import { Navbar, Container, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import logo from '../assets/Logo.jpg' 

function AppNavbar() {
    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
                <Navbar.Brand as={Link} to="/">
                    <img
                        src={logo} // USAR A VARIÁVEL LOGO
                        width="30"
                        height="30"
                        className="d-inline-block align-top me-2"
                        alt="EvolveHub Logo"
                    />
                    Evolve<span style={{ color: '#FD7E14' }}>Hub</span>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link as={Link} to="/">Dashboard</Nav.Link>
                        <Nav.Link as={Link} to="/trilha">Minha Trilha</Nav.Link>
                        <Nav.Link as={Link} to="/lab-ia">Lab IA</Nav.Link>
                        <Nav.Link as={Link} to="/admin">Admin</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default AppNavbar