// src/pages/Dashboard.jsx
import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

// Importa os teus componentes de Card
import CardBemEstar from '../components/CardBemEstar';
import CardStatus from '../components/CardStatus';
import CardSkill from '../components/CardSkill'; // <-- PASSO 1: IMPORTAR

function Dashboard() {
    return (
        <Container>
            <Row className="mb-4">
                <Col>
                    <h2 className="text-center">Bem-vindo ao Evolve<span style={{ color: '#FD7E14' }}>Hub</span>!</h2>
                    <p className="lead text-center text-muted">O teu portal para o futuro do trabalho.</p>
                </Col>
            </Row>

            <Row>
                {/* Coluna dos Cards de Ação */}
                <Col md={8}>
                    <CardBemEstar />
                    <CardStatus />
                    <CardSkill /> {/* <-- PASSO 2: ADICIONAR */}
                </Col>

                {/* Coluna do Co-Piloto (Widget Fixo) */}
                <Col md={4}>
                    <Card className="mb-4">
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
    );
}

export default Dashboard;