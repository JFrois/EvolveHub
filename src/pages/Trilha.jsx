// src/pages/Trilha.jsx
import React, { useState, useEffect } from 'react';
import { Container, Card, Button, Badge, Modal, Form, Dropdown, InputGroup, FormControl, Row, Col } from 'react-bootstrap';
import { Plus, ThreeDotsVertical, Trash } from 'react-bootstrap-icons';
import './Trilha.css';

const CourseCard = ({ course, onMove, onDelete, onToggleSubstep }) => {
  const total = (course.substeps?.length) || 0;
  const done = course.substeps ? course.substeps.filter(s => s.done).length : 0;
  const percent = total === 0 ? (course.status === 'completed' ? 100 : 0) : Math.round((done / total) * 100);

  return (
    <Card className="course-card mb-3">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-start">
          <Card.Title>
            <a href={course.link} target="_blank" rel="noopener noreferrer" className="card-title-link">
              {course.nome}
            </a>
          </Card.Title>
          <Dropdown className="card-move-menu" align="end">
            <Dropdown.Toggle variant="link" id={`dropdown-move-${course.id}`}>
              <ThreeDotsVertical />
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {course.status !== 'todo' && (
                <Dropdown.Item onClick={() => onMove(course.id, 'todo')}>Mover para "A Fazer"</Dropdown.Item>
              )}
              {course.status !== 'inprogress' && (
                <Dropdown.Item onClick={() => onMove(course.id, 'inprogress')}>Mover para "Em Progresso"</Dropdown.Item>
              )}
              {course.status !== 'completed' && (
                <Dropdown.Item onClick={() => onMove(course.id, 'completed')}>Mover para "Concluído"</Dropdown.Item>
              )}
              <Dropdown.Divider />
              <Dropdown.Item className="text-danger" onClick={() => onDelete(course)}>Excluir Curso</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>

        <Card.Subtitle className="mb-2 text-muted card-institution">
          {course.instituicao}
        </Card.Subtitle>
        <Card.Text className="card-reason">
          "{course.motivo}"
        </Card.Text>

        {course.substeps && course.substeps.length > 0 && (
          <div className="substeps-list mt-2">
            <strong>Passos</strong>
            <ul className="list-unstyled">
              {course.substeps.map(s => (
                <li key={s.id} className="d-flex align-items-center mb-1">
                  <input
                    type="checkbox"
                    checked={!!s.done}
                    onChange={() => onToggleSubstep(course.id, s.id)}
                    className="me-2"
                    style={{ cursor: 'pointer' }}
                    id={`sub-${course.id}-${s.id}`}
                  />
                  <label htmlFor={`sub-${course.id}-${s.id}`} style={{ cursor: 'pointer', textDecoration: s.done ? 'line-through' : 'none', color: s.done ? '#adb5bd' : 'inherit' }}>
                    {s.title}
                  </label>
                </li>
              ))}
            </ul>
          </div>
        )}
      </Card.Body>
      <Card.Footer className="card-footer d-flex justify-content-between align-items-center">
        <Badge pill className="card-hours-badge">
          {course.horas}h
        </Badge>

        <div style={{ width: '50%', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div className="progress flex-grow-1" style={{ height: '6px' }}>
            <div className="progress-bar bg-success" role="progressbar" style={{ width: `${percent}%` }} aria-valuenow={percent} aria-valuemin="0" aria-valuemax="100"></div>
          </div>
          <small className="text-muted" style={{ fontSize: '0.75rem' }}>{percent}%</small>
        </div>
      </Card.Footer>
    </Card>
  );
};

function Trilha() {
  const [courses, setCourses] = useState(() => {
    try {
      const stored = localStorage.getItem('evolvehub_courses_v1');
      if (stored) {
        const parsed = JSON.parse(stored);
        return Array.isArray(parsed) ? parsed : [];
      }
    } catch (error) {
      console.error("Erro ao ler trilha:", error);
    }

    return [
      {
        id: Date.now(),
        nome: "Python Essencial",
        instituicao: "Alura",
        horas: 40,
        link: "https://www.alura.com.br",
        motivo: "Base para IA e back-end.",
        status: "todo",
        substeps: [
          { id: 1, title: 'Módulo 1 - Fundamentos', done: false },
          { id: 2, title: 'Módulo 2 - Condicionais', done: false }
        ]
      }
    ];
  });

  const [showModal, setShowModal] = useState(false);
  const [newCourse, setNewCourse] = useState({
    nome: '', instituicao: '', horas: '', link: '', motivo: '', substeps: []
  });
  const [newSubstepText, setNewSubstepText] = useState('');

  useEffect(() => {
    localStorage.setItem('evolvehub_courses_v1', JSON.stringify(courses));
  }, [courses]);

  // --- FUNÇÕES ---

  const handleCloseModal = () => {
    setShowModal(false);
    setNewCourse({ nome: '', instituicao: '', horas: '', link: '', motivo: '', substeps: [] });
    setNewSubstepText('');
  };
  const handleShowModal = () => setShowModal(true);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCourse(prev => ({ ...prev, [name]: value }));
  };

  const handleAddSubstepToNewCourse = () => {
    const text = newSubstepText.trim();
    if (!text) return;
    setNewCourse(prev => ({
      ...prev,
      substeps: [...(prev.substeps || []), { id: Date.now() + Math.random(), title: text, done: false }]
    }));
    setNewSubstepText('');
  };

  const handleRemoveSubstepFromNewCourse = (id) => {
    setNewCourse(prev => ({ ...prev, substeps: prev.substeps.filter(s => s.id !== id) }));
  };

  const handleSaveCourse = (e) => {
    e.preventDefault();
    const courseToSave = {
      id: Date.now(),
      ...newCourse,
      horas: parseInt(newCourse.horas) || 0,
      status: 'todo'
    };
    setCourses(prevCourses => [...prevCourses, courseToSave]);
    handleCloseModal();
  };

  const handleMoveCourse = (courseId, newStatus) => {
    setCourses(prevCourses =>
      prevCourses.map(course =>
        course.id === courseId ? { ...course, status: newStatus } : course
      )
    );
  };

  const handleDeleteCourse = (course) => {
    if (window.confirm('Tem certeza que deseja excluir este curso?')) {
      setCourses(prev => prev.filter(c => c.id !== course.id));
    }
  };

  const handleToggleSubstep = (courseId, substepId) => {
    setCourses(prev =>
      prev.map(course => {
        if (course.id !== courseId) return course;
        const updatedSubsteps = course.substeps?.map(s => s.id === substepId ? { ...s, done: !s.done } : s) || [];
        return { ...course, substeps: updatedSubsteps };
      })
    );
  };

  const todoCourses = courses.filter(c => c.status === 'todo');
  const inProgressCourses = courses.filter(c => c.status === 'inprogress');
  const completedCourses = courses.filter(c => c.status === 'completed');

  return (
    <div className="trilha-page">
      <Container fluid>
        <div className="page-header-container d-flex justify-content-between align-items-center">
          <h2 className="page-title">Minha Trilha de Cursos</h2>
          <Button className="btn-add-course" onClick={handleShowModal}>
            <Plus size={20} className="me-1" /> Adicionar Curso
          </Button>
        </div>

        <div className="kanban-board-wrapper d-flex gap-3 mt-4">
          <div className="kanban-column flex-fill">
            <div className="d-flex justify-content-between align-items-center mb-3 pb-2 border-bottom">
              <h3 className="column-title mb-0">A FAZER</h3>
              <Badge bg="secondary" pill>{todoCourses.length}</Badge>
            </div>
            {todoCourses.map(course =>
              <CourseCard
                key={course.id}
                course={course}
                onMove={handleMoveCourse}
                onDelete={handleDeleteCourse}
                onToggleSubstep={handleToggleSubstep}
              />
            )}
          </div>

          <div className="kanban-column flex-fill">
            <div className="d-flex justify-content-between align-items-center mb-3 pb-2 border-bottom">
              <h3 className="column-title mb-0 text-warning">EM PROGRESSO</h3>
              <Badge bg="warning" text="dark" pill>{inProgressCourses.length}</Badge>
            </div>
            {inProgressCourses.map(course =>
              <CourseCard
                key={course.id}
                course={course}
                onMove={handleMoveCourse}
                onDelete={handleDeleteCourse}
                onToggleSubstep={handleToggleSubstep}
              />
            )}
          </div>

          <div className="kanban-column flex-fill">
            <div className="d-flex justify-content-between align-items-center mb-3 pb-2 border-bottom">
              <h3 className="column-title mb-0 text-success">CONCLUÍDO</h3>
              <Badge bg="success" pill>{completedCourses.length}</Badge>
            </div>
            {completedCourses.map(course =>
              <CourseCard
                key={course.id}
                course={course}
                onMove={handleMoveCourse}
                onDelete={handleDeleteCourse}
                onToggleSubstep={handleToggleSubstep}
              />
            )}
          </div>
        </div>
      </Container>

      {/* MODAL DE ADIÇÃO */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton className="modal-header">
          <Modal.Title className="modal-title">Adicionar Novo Curso</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSaveCourse}>
            <Form.Group className="mb-3">
              <Form.Label>Nome do Curso*</Form.Label>
              <Form.Control type="text" name="nome" value={newCourse.nome} onChange={handleInputChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Instituição*</Form.Label>
              <Form.Control type="text" name="instituicao" value={newCourse.instituicao} onChange={handleInputChange} required />
            </Form.Group>
            <Row>
              <Col xs={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Carga Horária (h)</Form.Label>
                  <Form.Control type="number" name="horas" value={newCourse.horas} onChange={handleInputChange} />
                </Form.Group>
              </Col>
              <Col xs={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Link</Form.Label>
                  <Form.Control type="url" name="link" value={newCourse.link} onChange={handleInputChange} placeholder="https://..." />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-3">
              <Form.Label>Motivo</Form.Label>
              <Form.Control as="textarea" rows={2} name="motivo" value={newCourse.motivo} onChange={handleInputChange} placeholder="Por que este curso é importante?" />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Planejamento (Opcional)</Form.Label>
              <InputGroup className="mb-2">
                <FormControl
                  placeholder="Ex: Aula 1 - Introdução"
                  value={newSubstepText}
                  onChange={(e) => setNewSubstepText(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddSubstepToNewCourse(); } }}
                />
                <Button variant="outline-secondary" onClick={handleAddSubstepToNewCourse}>+</Button>
              </InputGroup>
              <ul className="list-group list-group-flush small">
                {newCourse.substeps && newCourse.substeps.map(s => (
                  <li key={s.id} className="list-group-item d-flex justify-content-between align-items-center py-1">
                    <span>{s.title}</span>
                    <Trash className="text-danger" style={{ cursor: 'pointer' }} onClick={() => handleRemoveSubstepFromNewCourse(s.id)} />
                  </li>
                ))}
              </ul>
            </Form.Group>

            <div className="d-grid">
              <Button className="btn-add-course" type="submit">
                Salvar Curso
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Trilha;