// src/components/MoodPopup.jsx
import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const options = [
  { key: 'very_happy', label: 'Muito bem 😀' },
  { key: 'happy', label: 'Bem 🙂' },
  { key: 'neutral', label: 'Normal 😐' },
  { key: 'sad', label: 'Triste 😕' },
  { key: 'stressed', label: 'Estressado 😣' },
];

export default function MoodPopup({ onSelect, onClose }) {
  return (
    <Modal show onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Como você está se sentindo hoje?</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="d-flex flex-column gap-2">
          {options.map(o => (
            <Button key={o.key} variant="outline-primary" onClick={() => onSelect(o.key)}>
              {o.label}
            </Button>
          ))}
        </div>
      </Modal.Body>
    </Modal>
  );
}
