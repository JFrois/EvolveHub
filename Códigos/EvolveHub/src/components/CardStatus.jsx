// src/components/CardStatus.jsx
import React, { useState } from 'react';
import { Card, ListGroup, Form, Button } from 'react-bootstrap';

export default function CardStatus() {
  // Exemplo estático; se tiver dados dinâmicos, adaptação é fácil
  const stats = [
    { label: 'Tarefas Hoje', value: 4 },
    { label: 'Horas Focadas', value: '3h 20m' },
    { label: 'Reuniões', value: 2 }
  ];

  // Estado para armazenar os status selecionados
  const [selectedStatuses, setSelectedStatuses] = useState([]);

  // Status possíveis para o colaborador
  const availableStatuses = ['Feliz', 'Estressado', 'Triste', 'Motivado'];

  // Função para manipular a seleção de status
  const handleStatusChange = (event) => {
    const { value, checked } = event.target;

    setSelectedStatuses((prevStatuses) =>
      checked ? [...prevStatuses, value] : prevStatuses.filter(status => status !== value)
    );
  };

  // Função para enviar status ao backend 
  const handleSubmitStatus = async () => {
    try {
      const response = await fetch('/api/updateStatus', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          statuses: selectedStatuses,
        }),
      });

      if (response.ok) {
        alert('Status atualizado com sucesso!');
      } else {
        alert('Erro ao atualizar status');
      }
    } catch (error) {
      console.error('Erro de rede:', error);
      alert('Erro ao tentar salvar o status');
    }
  };

  return (
    <Card className="shadow-sm p-3">
      <Card.Body>
        <h5>Status do Dia</h5>
        <ListGroup variant="flush">
          {stats.map((s) => (
            <ListGroup.Item key={s.label} className="d-flex justify-content-between align-items-center">
              <span>{s.label}</span>
              <strong>{s.value}</strong>
            </ListGroup.Item>
          ))}
        </ListGroup>

        {/* Seção de Seleção de Status */}
        <div className="mt-4">
          <h6>Selecione seu Status:</h6>
          <Form>
            {availableStatuses.map((status) => (
              <Form.Check
                key={status}
                type="checkbox"
                label={status}
                value={status}
                checked={selectedStatuses.includes(status)}
                onChange={handleStatusChange}
              />
            ))}
          </Form>
          <Button variant="primary" className="mt-3" onClick={handleSubmitStatus}>
            Atualizar Status
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}
