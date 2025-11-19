// src/pages/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import StatusSelector from '../components/StatusSelector'; // Importar o novo StatusSelector
import { Container, Row, Col, Card, Button, ProgressBar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

// Outros componentes
import CardBemEstar from '../components/CardBemEstar';
import CardSkill from '../components/CardSkill';
import './Dashboard.css';

function Dashboard() {
  const [selectedStatuses, setSelectedStatuses] = useState([]);

  const handleStatusChange = (statuses) => {
    setSelectedStatuses(statuses); // Atualiza os status selecionados
  };

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
        {/* Seção de Status */}
        <Row as="section" className="content-section justify-content-center">
          <Col md={10} lg={8}>
            <span className="section-number">01</span>
            <h2 className="section-title">Como está se sentindo?</h2>
            {/* Usando o StatusSelector */}
            <StatusSelector onStatusChange={handleStatusChange} />
          </Col>
        </Row>

        {/* Resto do código da página (trilha, progresso de skills, etc) */}
      </Container>
    </div>
  );
}

export default Dashboard;
