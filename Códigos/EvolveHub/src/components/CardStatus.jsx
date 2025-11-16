// src/components/CardStatus.jsx
import React from 'react';
import { Card, ListGroup } from 'react-bootstrap';

export default function CardStatus() {
  // Exemplo estático; se tiver dados dinâmicos, adaptação é fácil
  const stats = [
    { label: 'Tarefas Hoje', value: 4 },
    { label: 'Horas Focadas', value: '3h 20m' },
    { label: 'Reuniões', value: 2 }
  ];

  return (
    <Card className="shadow-sm p-3">
      <Card.Body>
        <h5>Status do Dia</h5>
        <ListGroup variant="flush">
          {stats.map((s, idx) => (
            <ListGroup.Item key={idx} className="d-flex justify-content-between align-items-center">
              <span>{s.label}</span>
              <strong>{s.value}</strong>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card.Body>
    </Card>
  );
}
