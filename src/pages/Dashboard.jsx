// src/pages/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, ProgressBar, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { LightningFill, MortarboardFill, ChatDotsFill, PlayFill } from 'react-bootstrap-icons';

import './Dashboard.css';
import MoodPopup from '../components/MoodPopup';
import WorkMoodPopup from '../components/WorkMoodPopup';
import WorkModePopup from '../components/WorkModePopup';
import Footer from '../components/Footer';

function Dashboard() {
  const [showMood, setShowMood] = useState(false);
  const [showWorkMood, setShowWorkMood] = useState(false);
  const [showWorkMode, setShowWorkMode] = useState(false);
  const [courses, setCourses] = useState([]);
  const [greeting, setGreeting] = useState('');
  const [userName, setUserName] = useState('Visitante'); // Estado para o nome

  const getTodayKey = () => {
    const d = new Date();
    return `evolvehub_checkin_${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
  };

  useEffect(() => {
    // 1. Carregar Nome do Usuário
    const storedUser = localStorage.getItem('evolvehub_user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUserName(parsedUser.nickName || 'Visitante');
    }

    // 2. Saudação Dinâmica
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Bom dia');
    else if (hour < 18) setGreeting('Boa tarde');
    else setGreeting('Boa noite');

    // 3. Carregar Cursos
    const stored = localStorage.getItem('evolvehub_courses_v1');
    if (stored) {
      setCourses(JSON.parse(stored));
    }

    // 4. Popups
    const todayKey = getTodayKey();
    const hasCheckinToday = localStorage.getItem(todayKey);
    if (!hasCheckinToday) {
      const timer = setTimeout(() => setShowMood(true), 500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleMood = (val) => {
    localStorage.setItem('temp_mood', val);
    setShowMood(false);
    setShowWorkMood(true);
  };
  const handleWorkMood = (val) => {
    localStorage.setItem('temp_workMood', val);
    setShowWorkMood(false);
    setShowWorkMode(true);
  };
  const handleWorkMode = (val) => {
    const mood = localStorage.getItem('temp_mood');
    const workMood = localStorage.getItem('temp_workMood');
    const checkinData = {
      mood,
      workMood,
      workMode: val,
      timestamp: new Date().toISOString()
    };
    localStorage.setItem(getTodayKey(), JSON.stringify(checkinData));
    setShowWorkMode(false);
  };

  const inProgressCourses = courses.filter(c => c.status === 'inprogress');

  return (
    <div className="dashboard-page">
      {/* Popups */}
      {showMood && <MoodPopup onSelect={handleMood} onClose={() => setShowMood(false)} />}
      {showWorkMood && <WorkMoodPopup onSelect={handleWorkMood} onClose={() => setShowWorkMood(false)} />}
      {showWorkMode && <WorkModePopup onSelect={handleWorkMode} onClose={() => setShowWorkMode(false)} />}

      {/* HEADER DE BOAS VINDAS */}
      <div className="dashboard-header-bg">
        <Container className="py-5">
          <Row className="align-items-center">
            <Col md={8}>
              <h1 className="fw-bold text-dark mb-1">
                {greeting}, <span style={{ color: '#FD7E14' }}>{userName}</span>! 👋
              </h1>
              <p className="text-muted lead mb-0">Vamos evoluir suas skills hoje?</p>
            </Col>
            <Col md={4} className="text-md-end mt-3 mt-md-0">
              <Link to="/trilha">
                <Button variant="dark" className="rounded-pill px-4 py-2 shadow-sm">
                  <PlayFill className="me-2" /> Continuar Estudo
                </Button>
              </Link>
            </Col>
          </Row>
        </Container>
      </div>

      <Container className="mt-n5" style={{ zIndex: 10, position: 'relative' }}>
        {/* WIDGETS DE AÇÃO RÁPIDA */}
        <Row className="g-4 mb-5">
          <Col md={6} lg={6}>
            <Card className="border-0 shadow-sm h-100 overflow-hidden card-hover">
              <Card.Body className="d-flex align-items-center p-4">
                <div className="bg-primary bg-opacity-10 p-3 rounded-circle me-3">
                  <ChatDotsFill size={28} className="text-primary" />
                </div>
                <div>
                  <h5 className="fw-bold mb-1">Dúvidas?</h5>
                  <p className="text-muted small mb-2">Acesse o LabIA e pergunte ao seu co-piloto.</p>
                  <Link to="/lab-ia" className="text-decoration-none fw-bold" style={{ fontSize: '0.9rem' }}>
                    Acessar LabIA &rarr;
                  </Link>
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col md={6} lg={6}>
            <Card className="border-0 shadow-sm h-100 overflow-hidden card-hover">
              <Card.Body className="d-flex align-items-center p-4">
                <div className="bg-warning bg-opacity-10 p-3 rounded-circle me-3">
                  <LightningFill size={28} className="text-warning" />
                </div>
                <div>
                  <h5 className="fw-bold mb-1">Mantenha o Foco</h5>
                  <p className="text-muted small mb-2">Veja seus analytics de saúde e produtividade.</p>
                  <Link to="/admin" className="text-decoration-none fw-bold text-warning" style={{ fontSize: '0.9rem' }}>
                    Ver Relatórios &rarr;
                  </Link>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* SEÇÃO MEUS CURSOS */}
        <div className="mb-4">
          <h4 className="fw-bold mb-3 d-flex align-items-center">
            <MortarboardFill className="me-2 text-secondary" /> Em Progresso
          </h4>

          <Row className="g-4">
            {inProgressCourses.length > 0 ? (
              inProgressCourses.map(course => {
                const total = (course.substeps?.length) || 0;
                const done = course.substeps ? course.substeps.filter(s => s.done).length : 0;
                const percent = total === 0 ? 0 : Math.round((done / total) * 100);

                return (
                  <Col md={6} xl={4} key={course.id}>
                    <Card className="border-0 shadow-sm h-100 course-card-dash">
                      <div className="h-100 p-4 d-flex flex-column">
                        <div className="d-flex justify-content-between mb-3">
                          <Badge bg="warning" text="dark" className="align-self-start">EM ANDAMENTO</Badge>
                          <small className="text-muted fw-bold">{course.horas}h</small>
                        </div>
                        <h5 className="fw-bold mb-1 text-truncate" title={course.nome}>{course.nome}</h5>
                        <p className="text-muted small mb-4">{course.instituicao}</p>

                        <div className="mt-auto">
                          <div className="d-flex justify-content-between small mb-1">
                            <span>Progresso</span>
                            <span className="fw-bold">{percent}%</span>
                          </div>
                          <ProgressBar now={percent} variant="warning" style={{ height: '6px', borderRadius: '10px' }} />
                        </div>
                      </div>
                    </Card>
                  </Col>
                )
              })
            ) : (
              <Col xs={12}>
                <Card className="border-0 shadow-sm p-5 text-center">
                  <h5 className="text-muted">Nenhum curso iniciado ainda.</h5>
                  <p className="mb-4">Vá para a trilha e mova um curso para "Em Progresso" para vê-lo aqui.</p>
                  <div>
                    <Link to="/trilha">
                      <Button variant="outline-primary">Ir para Minha Trilha</Button>
                    </Link>
                  </div>
                </Card>
              </Col>
            )}
          </Row>
        </div>
      </Container>
      <Footer />
    </div>
  );
}

export default Dashboard;