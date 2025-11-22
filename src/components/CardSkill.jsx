// src/components/CardSkill.jsx
import React, { useEffect, useState } from 'react';
import { Card, ListGroup, Badge } from 'react-bootstrap';

export default function CardSkill() {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    fetch('/trilha.json')
      .then(res => res.json())
      .then(data => setSkills(data.trilha || []))
      .catch(err => console.error('Erro ao carregar skills', err));
  }, []);

  return (
    <Card className="mt-3 shadow-sm">
      <Card.Body>
        <h5>Minhas Skills</h5>
        <ListGroup variant="flush">
          {skills.map(skill => (
            <ListGroup.Item key={skill.id} className="d-flex justify-content-between align-items-center">
              <div>
                <div style={{ fontWeight: 600 }}>{skill.nome}</div>
                <small className="text-muted">{skill.descricao}</small>
              </div>
              <div>
                {skill.completo ? <Badge bg="success">Completo</Badge> : <Badge bg="secondary">Em Progresso</Badge>}
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card.Body>
    </Card>
  );
}
