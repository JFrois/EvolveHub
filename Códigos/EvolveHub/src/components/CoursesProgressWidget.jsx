// src/components/CoursesProgressWidget.jsx
import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';

// widget simples que mostra um "gráfico" baseado nos cursos (contagens por status)
// usa barras horizontais simples (HTML/CSS) para evitar dependências de libs externas.
export default function CoursesProgressWidget() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem('evolvehub_courses');
    if (stored) setCourses(JSON.parse(stored));
  }, []);

  const counts = {
    todo: courses.filter(c => c.status === 'todo').length,
    inprogress: courses.filter(c => c.status === 'inprogress').length,
    completed: courses.filter(c => c.status === 'completed').length,
  };
  const total = counts.todo + counts.inprogress + counts.completed || 1;

  const barFor = (count) => {
    const pct = Math.round((count / total) * 100);
    return (
      <div style={{ marginBottom: 8 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
          <div>{count} —</div>
          <div>{pct}%</div>
        </div>
        <div className="simple-graph-bar" style={{ background: '#e9ecef', height: 10, borderRadius: 6 }}>
          <div style={{ width: `${pct}%`, height: '100%', borderRadius: 6, background: '#0d6efd' }} />
        </div>
      </div>
    );
  };

  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Title>Visão Geral das Trilhas</Card.Title>
        <div>
          <strong>A Fazer</strong>
          {barFor(counts.todo)}
          <strong>Em Progresso</strong>
          {barFor(counts.inprogress)}
          <strong>Concluído</strong>
          {barFor(counts.completed)}
        </div>
      </Card.Body>
    </Card>
  );
}
