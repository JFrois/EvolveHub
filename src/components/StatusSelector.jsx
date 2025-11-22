// src/components/StatusSelector.jsx
import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const StatusSelector = ({ onStatusChange }) => {
  const [selectedStatuses, setSelectedStatuses] = useState([]);

  const availableStatuses = ['Feliz', 'Estressado', 'Triste', 'Motivado'];

  const handleStatusChange = (event) => {
    const { value, checked } = event.target;
    setSelectedStatuses((prevStatuses) =>
      checked ? [...prevStatuses, value] : prevStatuses.filter((status) => status !== value)
    );
  };

  const handleSubmitStatus = () => {
    onStatusChange(selectedStatuses); 
  };

  return (
    <div>
      <h5>Selecione seu Status</h5>
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
      <Button variant="primary" onClick={handleSubmitStatus}>
        Salvar Status
      </Button>
    </div>
  );
};

export default StatusSelector;
