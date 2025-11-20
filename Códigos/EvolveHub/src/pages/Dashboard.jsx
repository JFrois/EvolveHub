// src/pages/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import StatusSelector from '../components/StatusSelector';
import { Container, Row, Col, Card, Button, ProgressBar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

// Outros componentes
import CardBemEstar from '../components/CardBemEstar';
import CardSkill from '../components/CardSkill';
import './Dashboard.css';

// Novos componentes 
import MoodPopup from '../components/MoodPopup';
import WorkMoodPopup from '../components/WorkMoodPopup';
import WorkModePopup from '../components/WorkModePopup';
import CoursesProgressWidget from '../components/CoursesProgressWidget';
import LabIAWidget from '../components/LabIAWidget';
import Footer from '../components/Footer';

function Dashboard() {
  const [selectedStatuses, setSelectedStatuses] = useState([]);
  const [showMood, setShowMood] = useState(false);
  const [showWorkMood, setShowWorkMood] = useState(false);
  const [showWorkMode, setShowWorkMode] = useState(false);
  const [checkin, setCheckin] = useState(null);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    // carregar cursos da Trilha via localStorage
    const stored = localStorage.getItem('evolvehub_courses');
    if (stored) setCourses(JSON.parse(stored));

    // mostrar popups apenas se não houver checkin do dia
    const todayKey = getTodayKey();
    const saved = localStorage.getItem(todayKey);
    if (!saved) {
      // iniciar sequência de popups na montagem
      setTimeout(() => setShowMood(true), 300); // leve delay para o modal aparecer depois do carregamento
    } else {
      setCheckin(JSON.parse(saved));
    }
  }, []);

  const getTodayKey = () => {
    const d = new Date();
    return `evolvehub_checkin_${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`;
  };

  const handleStatusChange = (statuses) => {
    setSelectedStatuses(statuses); // Atualiza os status selecionados
  };

  const handleMood = (value) => {
    const partial = { mood: value, timestamp: new Date().toISOString() };
    setCheckin(prev => ({ ...(prev||{}), ...partial }));
    setShowMood(false);
    setShowWorkMood(true);
  };

  const handleWorkMood = (value) => {
    setCheckin(prev => ({ ...(prev||{}), workMood: value }));
    setShowWorkMood(false);
    setShowWorkMode(true);
  };

  const handleWorkMode = (value) => {
    const newCheckin = { ...(checkin||{}), workMode: value, savedAt: new Date().toISOString() };
    const todayKey = getTodayKey();
    localStorage.setItem(todayKey, JSON.stringify(newCheckin));
    localStorage.setItem('evolvehub_last_checkin', JSON.stringify(newCheckin));
    setCheckin(newCheckin);
    setShowWorkMode(false);
  };

  return (
    <div className="dashboard-page">
      {/* popups sequenciais */}
      {showMood && <MoodPopup onSelect={handleMood} onClose={() => setShowMood(false)} />}
      {showWorkMood && <WorkMoodPopup onSelect={handleWorkMood} onClose={() => setShowWorkMood(false)} />}
      {showWorkMode && <WorkModePopup onSelect={handleWorkMode} onClose={() => setShowWorkMode(false)} />}

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

        {/* Widget LabIA e Gráfico de Cursos */}
        <Row className="mt-4">
          <Col md={6}>
            <LabIAWidget />
          </Col>
          <Col md={6}>
            <CoursesProgressWidget />
          </Col>
        </Row>

        {/* Cursos em Progresso (vindo da Trilha) */}
        <Row className="mt-4">
          <Col md={12}>
            <h3>Em Progresso</h3>
            {courses && courses.length ? (
              courses
                .filter(c => c.status === 'inprogress')
                .map(course => {
                  const total = (course.substeps?.length) || 0;
                  const done = course.substeps ? course.substeps.filter(s => s.done).length : 0;
                  const percent = total === 0 ? (course.status === 'completed' ? 100 : 0) : Math.round((done/total)*100);
                  return (
                    <Card key={course.id} className="mb-3">
                      <Card.Body>
                        <Card.Title>
                          <a href={course.link || '#'} target="_blank" rel="noopener noreferrer">{course.nome}</a>
                        </Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">{course.instituicao} • {course.horas}h</Card.Subtitle>
                        <div className="mt-2">
                          <ProgressBar now={percent} label={`${percent}%`} />
                        </div>
                      </Card.Body>
                    </Card>
                  );
                })
            ) : (
              <p>Nenhum curso em progresso.</p>
            )}
          </Col>
        </Row>

        {/* Resto do código da página (trilha, progresso de skills, etc) */}
      </Container>

      <Footer />
    </div>
  );
}

export default Dashboard;
