// src/components/CardStatus.jsx
import React, { useState } from 'react';
import { Card, ToggleButton, ToggleButtonGroup } from 'react-bootstrap';

function CardStatus() {
    // O useState vai guardar o valor 'home' ou 'escritorio'
    // Começa com 'home' como padrão
    const [local, setLocal] = useState('home');

    const handleChange = (val) => {
        setLocal(val);
        // No futuro, aqui poderias chamar uma API para salvar esta preferência
    };

    return (
        <Card className="mb-4">
            <Card.Body>
                <Card.Title className="h5">O teu local de trabalho</Card.Title>
                <Card.Text className="text-muted">
                    Seleciona o teu status para a equipa.
                </Card.Text>

                {/* ToggleButtonGroup gere o estado de qual botão está ativo.
          'type="radio"' garante que apenas um pode ser selecionado.
          'name="local-trabalho"' é importante para a acessibilidade.
        */}
                <ToggleButtonGroup
                    type="radio"
                    name="local-trabalho"
                    value={local}
                    onChange={handleChange}
                    className="d-flex" // Faz os botões ocuparem o espaço todo
                >
                    <ToggleButton
                        id="tbg-radio-1"
                        value={'home'}
                        // Usa 'primary' (azul) quando ativo, e 'outline-secondary' (cinza) quando inativo
                        variant={local === 'home' ? 'primary' : 'outline-secondary'}
                    >
                        🏠 Home
                    </ToggleButton>

                    <ToggleButton
                        id="tbg-radio-2"
                        value={'escritorio'}
                        variant={local === 'escritorio' ? 'primary' : 'outline-secondary'}
                    >
                        🏢 Escritório
                    </ToggleButton>
                </ToggleButtonGroup>
            </Card.Body>
        </Card>
    );
}

export default CardStatus;