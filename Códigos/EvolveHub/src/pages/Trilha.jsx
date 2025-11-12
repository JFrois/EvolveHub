// src/pages/Trilha.jsx
import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
import trilhaData from '../data/trilha.json'; // Importa os dados da trilha

function Trilha() {
    // O estado para guardar as skills da trilha. Inicializa diretamente com os dados do JSON.
    const [skills, setSkills] = useState(trilhaData);

    // Função para lidar com o clique em "Marcar como Concluída"
    const handleConcluirSkill = (id) => {
        setSkills(prevSkills =>
            prevSkills.map(skill => {
                // Se for a skill clicada, marca como concluída
                if (skill.id === id) {
                    return { ...skill, status: 'concluido', icone: '✅' };
                }
                // Se for a skill imediatamente a seguir e estiver bloqueada, desbloqueia para "em_progresso"
                if (skill.id === id + 1 && skill.status === 'bloqueado') {
                    return { ...skill, status: 'em_progresso', icone: '🔥' };
                }
                return skill;
            })
        );
    };

    // Funções auxiliares para o estilo dos cards
    const getVariantByStatus = (status) => {
        switch (status) {
            case 'concluido': return 'success';
            case 'em_progresso': return 'warning';
            case 'bloqueado': return 'secondary';
            default: return 'light';
        }
    };

    const isButtonDisabled = (status) => status !== 'em_progresso';

    return (
        <Container className="my-5">
            <Row className="mb-4">
                <Col>
                    <h2 className="text-center">Minha Trilha de Carreira: <span style={{ color: '#FD7E14' }}>Engenheiro de Prompt de IA</span></h2>
                    <p className="lead text-center text-muted">
                        Segue o teu caminho de aprendizagem para o futuro.
                    </p>
                </Col>
            </Row>

            {/* Apenas um Row para mapear todas as skills */}
            <Row>
                {skills.map((skill) => (
                    <Col key={skill.id} md={6} lg={4} className="mb-4">
                        <Card border={getVariantByStatus(skill.status)} className="h-100">
                            <Card.Header className={`bg-${getVariantByStatus(skill.status)} text-white`}>
                                {skill.icone} {skill.nome}
                            </Card.Header>
                            <Card.Body>
                                <Card.Text>{skill.descricao}</Card.Text>
                            </Card.Body>
                            <Card.Footer className="d-flex justify-content-between align-items-center">
                                <Badge pill bg={getVariantByStatus(skill.status)}>
                                    {skill.status.replace('_', ' ').toUpperCase()}
                                </Badge>
                                <Button
                                    variant={skill.status === 'em_progresso' ? 'primary' : 'outline-secondary'}
                                    size="sm"
                                    onClick={() => handleConcluirSkill(skill.id)}
                                    disabled={isButtonDisabled(skill.status)}
                                >
                                    {skill.status === 'concluido' ? 'Concluído' : 'Marcar como Concluída'}
                                </Button>
                            </Card.Footer>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
}

export default Trilha;