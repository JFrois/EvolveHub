// src/components/CardSkill.jsx
import React from 'react';
import { Card, ProgressBar, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom'; // Para criar o link do botão

/**
 * Este componente exibe o skill atual em foco.
 * Vamos usar "props" (propriedades) para torná-lo reutilizável.
 * Se não passarmos nada, ele usa os valores "defaultProps".
 */
function CardSkill({ skillName, progress, trilhaLink }) {
    return (
        <Card className="mb-4">
            <Card.Body>
                <Card.Title className="h5">A tua próxima skill</Card.Title>
                <Card.Text className="text-muted">
                    Foco na tua trilha de <span style={{ color: '#FD7E14', fontWeight: 'bold' }}>{skillName}</span>.
                </Card.Text>

                {/* Barra de Progresso do Bootstrap */}
                <ProgressBar
                    now={progress}
                    label={`${progress}%`}
                    variant="primary" // Podes mudar para "warning" (laranja) se preferires
                    animated // Efeito animado!
                    className="mb-3"
                />

                <Button
                    variant="outline-primary" // Botão com estilo "outline"
                    as={Link} // Funciona como um Link do React Router
                    to={trilhaLink} // O destino do link
                    className="w-100" // Ocupa 100% da largura do Card
                >
                    Ver Trilha Completa ➔
                </Button>
            </Card.Body>
        </Card>
    );
}

// Valores padrão caso nenhuma "prop" seja passada
CardSkill.defaultProps = {
    skillName: 'Lógica Python',
    progress: 75,
    trilhaLink: '/trilha' // O link para a Página 2
};

export default CardSkill;