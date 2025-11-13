// src/pages/Dashboard.jsx
import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

// Importa os teus componentes de Card
import CardBemEstar from '../components/CardBemEstar';
import CardStatus from '../components/CardStatus';
import CardSkill from '../components/CardSkill';

// Importa o CSS
import './Dashboard.css';

function Dashboard() {
    return (
        <div className="dashboard-page">
            
            <header className="header-section">
                <Container> 
                    

                    {/* Título e Subtítulo Centralizados */}
                    <Row className="justify-content-center">
                        <Col xs={12} md={10} lg={8}>
                            <h2 className="header-title">Bem-vindo ao Evolve<span style={{ color: '#FD7E14' }}>Hub</span>!</h2>
                            <p className="header-subtitle">O teu portal para o futuro do trabalho.</p>
                        </Col>
                    </Row>
                </Container>
            </header>

            <Container as="main">
                
                {/* Seção 01: Bem-Estar (Seu CardBemEstar) */}
                <Row as="section" className="content-section justify-content-center">
                    <Col md={10} lg={8}>
                        <span className="section-number">01</span>
                        <h2 className="section-title">Como esta se sentindo?</h2>
                        <CardBemEstar />
                    </Col>
                </Row>

                {/* Seção 02: Aprendizado Constante (Seus Cards) */}
                <Row as="section" className="content-section justify-content-center">
                    <Col md={10} lg={8}>
                        <span className="section-number">02</span>
                        <h2 className="section-title">Aprendizado Constante</h2>
                        <p className="section-text">
                            Acompanhe seu progresso e veja o status das suas tarefas.
                        </p>
                        <CardStatus />
                        <CardSkill />
                    </Col>
                </Row>

                {/* Seção 03: Co-Piloto (Seu Widget) */}
                <Row as="section" className="copilot-section justify-content-center">
                    <Col md={10} lg={8}>
                        <span className="section-number">03</span>
                        <h2 className="section-title text-center">Pesquise com IA</h2>
                        
                        <Card className="copilot-card">
                            <Card.Body>
                                <Card.Title className="h5">Co-Piloto Evolve</Card.Title>
                                <Card.Text>
                                    O teu assistente de IA está pronto para te ajudar.
                                </Card.Text>
                                <Button variant="primary" as={Link} to="/lab-ia">Ir para o Laboratório ➔</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

            </Container>

            {/* 3. FOOTER */}
            <footer className="dashboard-footer">
                <Container>
                    <Row>
                        <Col>
                            <div className="footer-logo">FIAP</div>
                        </Col>
                    </Row>
                </Container>
            </footer>

        </div>
    );
}

export default Dashboard;