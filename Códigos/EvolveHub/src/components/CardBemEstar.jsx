// src/components/CardBemEstar.jsx
import React, { useState } from 'react';
import { Card, Button, Alert, ButtonGroup } from 'react-bootstrap';

function CardBemEstar() {
    const [sentimento, setSentimento] = useState(null); // null, 'feliz', 'neutro', 'triste'
    const [mostrarAlerta, setMostrarAlerta] = useState(false);

    const handleSentimentoClick = (novoSentimento) => {
        setSentimento(novoSentimento);
        setMostrarAlerta(true); // Mostra o alerta após o clique
        // Esconde o alerta após 3 segundos
        setTimeout(() => {
            setMostrarAlerta(false);
        }, 3000);
    };

    const getMensagemAlerta = () => {
        switch (sentimento) {
            case 'feliz':
                return "Que bom! O teu bem-estar é a nossa prioridade. Continua assim!";
            case 'neutro':
                return "Compreendemos. Lembra-te de fazer pausas e cuidar de ti.";
            case 'triste':
                return "Sentimos muito que te sintas assim. Sugerimos uma breve pausa ou um exercício de respiração.";
            default:
                return "";
        }
    };

    return (
        <Card className="mb-4"> {/* mb-4 adiciona uma margem inferior */}
            <Card.Body>
                <Card.Title className="h5">Como esta se sentindo hoje?</Card.Title> {/* h5 para tamanho de título */}
                <Card.Text className="text-muted">
                    Ajuda-nos a entender o teu bem-estar para otimizar o teu dia.
                </Card.Text>

                <ButtonGroup className="d-flex justify-content-center mb-3">
                    <Button
                        variant={sentimento === 'feliz' ? 'success' : 'outline-secondary'}
                        onClick={() => handleSentimentoClick('feliz')}
                        className="me-2" // Margem à direita
                    >
                        😄 Feliz
                    </Button>
                    <Button
                        variant={sentimento === 'neutro' ? 'warning' : 'outline-secondary'}
                        onClick={() => handleSentimentoClick('neutro')}
                        className="me-2"
                    >
                        😐 Neutro
                    </Button>
                    <Button
                        variant={sentimento === 'triste' ? 'danger' : 'outline-secondary'}
                        onClick={() => handleSentimentoClick('triste')}
                    >
                        😩 Triste
                    </Button>
                </ButtonGroup>

                {mostrarAlerta && sentimento && (
                    <Alert variant={
                        sentimento === 'feliz' ? 'success' :
                            sentimento === 'neutro' ? 'warning' :
                                'danger'
                    }>
                        {getMensagemAlerta()}
                    </Alert>
                )}
            </Card.Body>
        </Card>
    );
}

export default CardBemEstar;