// src/pages/Trilha.jsx
import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Badge, Modal, Form, Dropdown } from 'react-bootstrap';
import { Plus, ThreeDotsVertical } from 'react-bootstrap-icons';
import './Trilha.css'; // Importa o novo CSS

function Trilha() {
    // 1. STATE (Estado)
    // Começa com um array vazio. Você pode adicionar cursos aqui para testes.
    const [courses, setCourses] = useState([
      { 
        id: 1, 
        nome: "Python Essencial", 
        instituicao: "Alura", 
        horas: 40, 
        link: "https://www.alura.com.br", 
        motivo: "Base para IA e back-end.", 
        status: "todo" 
      }
    ]);
    const [showModal, setShowModal] = useState(false);
    const [newCourse, setNewCourse] = useState({
        nome: '',
        instituicao: '',
        horas: '',
        link: '',
        motivo: ''
    });

    // 2. FUNÇÕES DO MODAL E FORMULÁRIO
    const handleCloseModal = () => {
        setShowModal(false);
        setNewCourse({ nome: '', instituicao: '', horas: '', link: '', motivo: '' });
    };
    const handleShowModal = () => setShowModal(true);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewCourse(prev => ({ ...prev, [name]: value }));
    };

    const handleSaveCourse = (e) => {
        e.preventDefault();
        setCourses(prevCourses => [
            ...prevCourses,
            {
                id: Date.now(),
                ...newCourse,
                horas: parseInt(newCourse.horas) || 0,
                status: 'todo' // Novo curso sempre começa em "A Fazer"
            }
        ]);
        handleCloseModal();
    };

    // 3. FUNÇÃO PARA MOVER OS CARDS
    const handleMoveCourse = (courseId, newStatus) => {
        setCourses(prevCourses =>
            prevCourses.map(course =>
                course.id === courseId ? { ...course, status: newStatus } : course
            )
        );
    };

    // 4. FILTRAR CURSOS POR COLUNA
    const todoCourses = courses.filter(c => c.status === 'todo');
    const inProgressCourses = courses.filter(c => c.status === 'inprogress');
    const completedCourses = courses.filter(c => c.status === 'completed');

    // 5. COMPONENTE INTERNO DO CARD (para não repetir código)
    const CourseCard = ({ course }) => (
        <Card className="course-card">
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
            </Card.Body>
            <Card.Footer className="card-footer">
                <Badge pill className="card-hours-badge">
                    {course.horas} Horas
                </Badge>
                
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

    // 6. RENDERIZAÇÃO PRINCIPAL
    return (
        <div className="trilha-page">
            <Container fluid>
                {/* Header da Página */}
                <div className="page-header-container">
                    <h2 className="page-title">Minha Trilha de Cursos</h2>
                    <Button className="btn-add-course" onClick={handleShowModal}>
                        <Plus size={20} /> Adicionar Curso
                    </Button>
                </div>

                {/* O Quadro Kanban */}
                <div className="kanban-board-wrapper">
                    
                    {/* Coluna A Fazer (TO DO) */}
                    <div className="kanban-column">
                        <h3 className="column-title">A FAZER ({todoCourses.length})</h3>
                        {todoCourses.map(course => (
                            <CourseCard key={course.id} course={course} />
                        ))}
                    </div>

                    {/* Coluna Em Progresso (IN PROGRESS) */}
                    <div className="kanban-column">
                        <h3 className="column-title">EM PROGRESSO ({inProgressCourses.length})</h3>
                        {inProgressCourses.map(course => (
                            <CourseCard key={course.id} course={course} />
                        ))}
                    </div>

                    {/* Coluna Concluído (COMPLETED) */}
                    <div className="kanban-column">
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