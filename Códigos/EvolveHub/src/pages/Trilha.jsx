// src/pages/Trilha.jsx
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Badge, Modal, Form, Dropdown, InputGroup, FormControl } from 'react-bootstrap';
import { Plus, ThreeDotsVertical, Trash } from 'react-bootstrap-icons';
import './Trilha.css'; // Importa o novo CSS

function Trilha() {
    // carregar do localStorage ou usar default
    const [courses, setCourses] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [newCourse, setNewCourse] = useState({
        nome: '',
        instituicao: '',
        horas: '',
        link: '',
        motivo: '',
        substeps: []
    });
    const [newSubstepText, setNewSubstepText] = useState('');

    useEffect(() => {
      const stored = localStorage.getItem('evolvehub_courses');
      if (stored) setCourses(JSON.parse(stored));
      else {
        // se quiser preencher com um curso inicial (opcional)
        setCourses([
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
        ]);
      }
    }, []);

    useEffect(() => {
      // salvar sempre que courses mudar
      localStorage.setItem('evolvehub_courses', JSON.stringify(courses));
    }, [courses]);

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
            status: 'todo' // começa em A Fazer
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

    const handleToggleSubstep = (courseId, substepId) => {
      setCourses(prev =>
        prev.map(course => {
          if (course.id !== courseId) return course;
          const updatedSubsteps = course.substeps?.map(s => s.id === substepId ? { ...s, done: !s.done } : s) || [];
          // recalcular status
          const total = updatedSubsteps.length;
          const done = updatedSubsteps.filter(s => s.done).length;
          let newStatus = course.status;
          if (total === 0) {
            // sem substeps, manter status
            newStatus = course.status;
          } else if (done === 0) {
            newStatus = 'todo';
          } else if (done > 0 && done < total) {
            newStatus = 'inprogress';
          } else if (done === total) {
            newStatus = 'completed';
          }
          return { ...course, substeps: updatedSubsteps, status: newStatus };
        })
      );
    };

    const todoCourses = courses.filter(c => c.status === 'todo');
    const inProgressCourses = courses.filter(c => c.status === 'inprogress');
    const completedCourses = courses.filter(c => c.status === 'completed');

    const CourseCard = ({ course }) => {
        const total = (course.substeps?.length) || 0;
        const done = course.substeps ? course.substeps.filter(s => s.done).length : 0;
        const percent = total === 0 ? (course.status === 'completed' ? 100 : 0) : Math.round((done/total)*100);

        return (
            <Card className="course-card mb-3">
                <Card.Body>
                    <Card.Title>
                        <a href={course.link} target="_blank" rel="noopener noreferrer" className="card-title-link">
                            {course.nome}
                        </a>
                    </Card.Title>
                    <Card.Subtitle className="mb-2 text-muted card-institution">
                        {course.instituicao}
                    </Card.Subtitle>
                    <Card.Text className="card-reason">
                        "{course.motivo}"
                    </Card.Text>

                    {/* Sub-etapas com checkboxes */}
                    {course.substeps && course.substeps.length > 0 && (
                      <div className="substeps-list mt-2">
                        <strong>Sub-etapas</strong>
                        <ul className="list-unstyled">
                          {course.substeps.map(s => (
                            <li key={s.id} className="d-flex align-items-center">
                              <input
                                type="checkbox"
                                checked={!!s.done}
                                onChange={() => handleToggleSubstep(course.id, s.id)}
                                className="me-2"
                                id={`sub-${course.id}-${s.id}`}
                              />
                              <label htmlFor={`sub-${course.id}-${s.id}`}>{s.title}</label>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                </Card.Body>
                <Card.Footer className="card-footer d-flex justify-content-between align-items-center">
                    <Badge pill className="card-hours-badge">
                        {course.horas} Horas
                    </Badge>

                    <div style={{ width: '40%' }}>
                      <div className="progress mb-1" style={{ height: '10px' }}>
                        <div className="progress-bar" role="progressbar" style={{ width: `${percent}%` }} aria-valuenow={percent} aria-valuemin="0" aria-valuemax="100"></div>
                      </div>
                      <small>{percent}%</small>
                    </div>

                    <Dropdown className="card-move-menu" align="end">
                        <Dropdown.Toggle variant="link" id={`dropdown-move-${course.id}`}>
                            <ThreeDotsVertical />
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {course.status !== 'todo' && (
                                <Dropdown.Item onClick={() => handleMoveCourse(course.id, 'todo')}>Mover para "A Fazer"</Dropdown.Item>
                            )}
                            {course.status !== 'inprogress' && (
                                <Dropdown.Item onClick={() => handleMoveCourse(course.id, 'inprogress')}>Mover para "Em Progresso"</Dropdown.Item>
                            )}
                            {course.status !== 'completed' && (
                                <Dropdown.Item onClick={() => handleMoveCourse(course.id, 'completed')}>Mover para "Concluído"</Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                </Card.Footer>
            </Card>
        );
    };

    return (
        <div className="trilha-page">
            <Container fluid>
                {/* Header da Página */}
                <div className="page-header-container d-flex justify-content-between align-items-center">
                    <h2 className="page-title">Minha Trilha de Cursos</h2>
                    <Button className="btn-add-course" onClick={handleShowModal}>
                        <Plus size={20} /> Adicionar Curso
                    </Button>
                </div>

                {/* O Quadro Kanban */}
                <div className="kanban-board-wrapper d-flex gap-3 mt-4">
                    {/* Coluna A Fazer (TO DO) */}
                    <div className="kanban-column flex-fill">
                        <h3 className="column-title">A FAZER ({todoCourses.length})</h3>
                        {todoCourses.map(course => (
                            <CourseCard key={course.id} course={course} />
                        ))}
                    </div>

                    {/* Coluna Em Progresso (IN PROGRESS) */}
                    <div className="kanban-column flex-fill">
                        <h3 className="column-title">EM PROGRESSO ({inProgressCourses.length})</h3>
                        {inProgressCourses.map(course => (
                            <CourseCard key={course.id} course={course} />
                        ))}
                    </div>

                    {/* Coluna Concluído (COMPLETED) */}
                    <div className="kanban-column flex-fill">
                        <h3 className="column-title">CONCLUÍDO ({completedCourses.length})</h3>
                        {completedCourses.map(course => (
                            <CourseCard key={course.id} course={course} />
                        ))}
                    </div>
                </div>
            </Container>

            {/* Modal para Adicionar Novo Curso */}
            <Modal show={showModal} onHide={handleCloseModal} centered>
                <Modal.Header closeButton className="modal-header">
                    <Modal.Title className="modal-title">Adicionar Novo Curso</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSaveCourse}>
                        <Form.Group className="mb-3" controlId="formCourseName">
                            <Form.Label>Nome do Curso*</Form.Label>
                            <Form.Control
                                type="text"
                                name="nome"
                                value={newCourse.nome}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formCourseInstitution">
                            <Form.Label>Instituição*</Form.Label>
                            <Form.Control
                                type="text"
                                name="instituicao"
                                value={newCourse.instituicao}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formCourseHours">
                            <Form.Label>Horas de Curso</Form.Label>
                            <Form.Control
                                type="number"
                                name="horas"
                                value={newCourse.horas}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formCourseLink">
                            <Form.Label>Link</Form.Label>
                            <Form.Control
                                type="url"
                                name="link"
                                value={newCourse.link}
                                onChange={handleInputChange}
                                placeholder="https://..."
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formCourseReason">
                            <Form.Label>Motivo de escolher o curso</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                name="motivo"
                                value={newCourse.motivo}
                                onChange={handleInputChange}
                            />
                        </Form.Group>

                        {/* Sub-etapas dinâmicas */}
                        <Form.Group className="mb-3">
                          <Form.Label>Sub-etapas (adicionar passo a passo)</Form.Label>
                          <InputGroup className="mb-2">
                            <FormControl
                              placeholder="Ex: Aula 1 - Introdução"
                              value={newSubstepText}
                              onChange={(e) => setNewSubstepText(e.target.value)}
                              onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddSubstepToNewCourse(); } }}
                            />
                            <Button variant="outline-secondary" onClick={handleAddSubstepToNewCourse}>Adicionar</Button>
                          </InputGroup>

                          <ul className="list-group">
                            {newCourse.substeps && newCourse.substeps.map(s => (
                              <li key={s.id} className="list-group-item d-flex justify-content-between align-items-center">
                                <span>{s.title}</span>
                                <Button variant="link" onClick={() => handleRemoveSubstepFromNewCourse(s.id)}><Trash /></Button>
                              </li>
                            ))}
                          </ul>
                        </Form.Group>

                        <Button className="btn-add-course w-100" type="submit">
                            Salvar Curso
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default Trilha;
