// src/components/LabIAWidget.jsx
import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function LabIAWidget() {
  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Title>LabIA</Card.Title>
        <Card.Text>
          Experimentos e ferramentas de IA. Clique abaixo para acessar o LabIA.
        </Card.Text>
        <Link to="/labia">
          <Button variant="primary">Ir para o LabIA</Button>
        </Link>
      </Card.Body>
    </Card>
  );
}
