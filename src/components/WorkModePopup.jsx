// src/components/WorkModePopup.jsx
import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const options = [
  { key: 'onsite', label: 'Presencial' },
  { key: 'home', label: 'Home office' },
];

export default function WorkModePopup({ onSelect, onClose }) {
  return (
    <Modal show onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Você está presencial ou em home office hoje?</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="d-flex flex-column gap-2">
          {options.map(o => (
            <Button key={o.key} variant="outline-success" onClick={() => onSelect(o.key)}>
              {o.label}
            </Button>
          ))}
        </div>
      </Modal.Body>
    </Modal>
  );
}
