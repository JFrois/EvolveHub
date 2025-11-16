// src/components/CardBemEstar.jsx
import React, { useState } from 'react';
import { Card, Button } from 'react-bootstrap';

const options = [
  { key: 'bem', label: '😊 Bem' },
  { key: 'neutro', label: '😐 Neutro' },
  { key: 'cansado', label: '😞 Cansado' }
];

export default function CardBemEstar() {
  const [selected, setSelected] = useState(null);

  return (
    <Card className="shadow-sm p-3">
      <Card.Body>
        <div className="d-flex flex-column gap-3">
          <div className="d-flex flex-wrap gap-2">
            {options.map((o) => (
              <Button
                key={o.key}
                variant={selected === o.key ? 'warning' : 'outline-secondary'}
                onClick={() => setSelected(o.key)}
              >
                {o.label}
              </Button>
            ))}
          </div>
          <div>
            <small className="text-muted">
              {selected ? `Último check-in: ${options.find(x => x.key===selected).label}` : 'Ainda sem check-in.'}
            </small>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}
