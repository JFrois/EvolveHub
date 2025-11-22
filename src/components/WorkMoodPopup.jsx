// src/components/WorkMoodPopup.jsx
import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const options = [
  { key: 'engaged', label: 'Engajado' },
  { key: 'productive', label: 'Produtivo' },
  { key: 'neutral', label: 'Indiferente' },
  { key: 'tired', label: 'Cansado' },
  { key: 'overwhelmed', label: 'Sobrecarregado' },
];

export default function WorkMoodPopup({ onSelect, onClose }) {
  return (
    <Modal show onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Como você está em relação ao trabalho?</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="d-flex flex-column gap-2">
          {options.map(o => (
            <Button key={o.key} variant="outline-secondary" onClick={() => onSelect(o.key)}>
              {o.label}
            </Button>
          ))}
        </div>
      </Modal.Body>
    </Modal>
  );
}
