// src/pages/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, ProgressBar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

// Componentes personalizados (se existirem já no seu repo, apenas garanta as props/exports)
import CardBemEstar from '../components/CardBemEstar';
import CardStatus from '../components/CardStatus';
import CardSkill from '../components/CardSkill';

// CSS específico da página
import './Dashboard.css';

function Dashboard() {
    const [skillProgress, setSkillProgress] = useState(0);
    const [nextSkill, setNextSkill] = useState(null);

    // Integração com trilha.json
    useEffect(() => {
        fetch('/trilha.json')
            .then((res) => {
                if (!res.ok) throw new Error('Não foi possível carregar trilha.json');
                return res.json();
            })
            .then((data) => {
                const skills = Array.isArray(data.trilha) ? data.trilha : [];
                if (skills.length === 0) {
                    setSkillProgress(0);
                    setNextSkill('Nenhuma skill encontrada');
                    return;
                }
                const completed = skills.filter((s) => s.completo).length;
                setSkillProgress((completed / skills.length) * 100);
                const next = skills.find((s) => !s.completo);
                setNextSkill(next ? next.nome : 'Todas concluídas! 🎉');
            })
            .catch((err) => {
                console.error(err);
                setNextSkill('Erro ao carregar trilha');
            });
    }, []);

    return (
        <div className="dashboard-page">
            {/* HEADER */}
            <header className="header-section">
                <Container>
                    <Row className="justify-content-center">
                        <Col xs={12} md={10} lg={8} className="text-center">
                            <h2 className="header-title">Bem-vindo ao Evolve<span className="accent">Hub</span>!</h2>
                            <p className="header-subtitle">O teu portal para o futuro do trabalho.</p>
                        </Col>
                    </Row>
                </Container>
            </header>

            {/* MAIN */}
            <Container as="main">
                {/* Seção 01 - Bem-estar */}
                <Row as="section" className="content-section justify-content-center">
                    <Col md={10} lg={8}>
                        <span className="section-number">01</span>
                        <h2 className="section-title">Como está se sentindo?</h2>
                        <CardBemEstar />
                    </Col>
                </Row>

                {/* Seção 02 - Aprendizado */}
                <Row as="section" className="content-section justify-content-center">
                    <Col md={10} lg={8}>
                        <span className="section-number">02</span>
                        <h2 className="section-title">Aprendizado Constante</h2>
                        <p className="section-text">Acompanhe seu progresso e veja o status das suas tarefas.</p>

                        {/* Linha de status + skill progress */}
                        <Row className="g-3 align-items-stretch">
                            <Col md={6}>
                                <CardStatus />
                            </Col>
                            <Col md={6}>
                                <Card className="p-3 shadow-sm progress-card">
                                    <h5 className="mb-2">Próxima Skill</h5>
                                    <p className="mb-2 lead">{nextSkill}</p>
                                    <ProgressBar now={skillProgress} label={`${Math.round(skillProgress)}%`} />
                                </Card>
                            </Col>
                        </Row>

                        {/* Lista detalhada de skills (componente separado) */}
                        <div className="mt-3">
                            <CardSkill />
                        </div>
                    </Col>
                </Row>

                {/* Seção 03 - Co-Piloto */}
                <Row as="section" className="copilot-section justify-content-center">
                    <Col md={10} lg={8}>
                        <span className="section-number">03</span>
                        <h2 className="section-title text-center">Pesquise com IA</h2>

                        <Card className="copilot-card shadow-sm">
                            <Card.Body>
                                <Card.Title className="h5">Co-Piloto Evolve</Card.Title>
                                <Card.Text>O teu assistente de IA está pronto para te ajudar.</Card.Text>
                                <Button variant="primary" as={Link} to="/lab-ia">Ir para o Laboratório ➔</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>

            {/* FOOTER */}
            <footer className="dashboard-footer">
                <Container>
                    <Row>
                        <Col className="text-center">
                            <div className="footer-logo">FIAP</div>
                        </Col>
                    </Row>
                </Container>
            </footer>
        </div>
    );
}

export default Dashboard;
