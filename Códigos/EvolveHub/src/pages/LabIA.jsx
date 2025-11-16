// src/pages/LabIA.jsx
import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Spinner, Alert, Card } from 'react-bootstrap';
import { SendFill } from 'react-bootstrap-icons'; // Importa o ícone de avião
import './LabIA.css';
import { gerarRespostaIA } from '../services/api';

function LabIA() {
    const [prompt, setPrompt] = useState('');
    const [respostaIA, setRespostaIA] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [erro, setErro] = useState(null);

    const suggestions = [
        "O que posso te pedir para fazer?",
        "Qual dos meus projetos está com melhor desempenho?",
        "Que projetos devo me preocupar agora?"
    ];

    const handleEnviarPrompt = async (e) => {
        e.preventDefault();
        if (!prompt.trim()) return;

        setIsLoading(true);
        setErro(null);
        setRespostaIA('');
        
        console.log("Enviando prompt:", prompt);

        try {
            await new Promise(resolve => setTimeout(resolve, 2000)); 

            const resposta = await gerarRespostaIA(prompt)
            setRespostaIA(resposta);

        } catch (err) {
            console.error("Erro ao comunicar com a IA (simulado):", err);
            setErro("Não foi possível conectar com o Co-Piloto Evolve. Tenta novamente mais tarde.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleSuggestionClick = (suggestion) => {
        setPrompt(suggestion);
        // Opcional: envia a sugestão automaticamente
        // handleEnviarPrompt({ preventDefault: () => {} }); 
    };

    return (
        <div className="lab-ia-page">
            <Container className="content-wrapper"> 
                {/* Logo/Ícone Centralizado */}
                <div className="lab-ia-logo">
                    <span>✨</span>
                </div>

                {/* Título Principal */}
                <h2 className="lab-ia-title">
                    Pergunte qualquer coisa à sua IA
                </h2>

                <div className="w-100 mb-5">
                    {erro && <Alert variant="danger" className="text-center">{erro}</Alert>}
                    {isLoading ? (
                        <div className="text-center py-5">
                            <Spinner animation="border" role="status" className="spinner-brand-primary" />
                            <p className="mt-2 loading-text">A gerar a resposta...</p>
                        </div>
                    ) : (
                        respostaIA && (
                            <div className="resposta-ia-box">
                                {respostaIA}
                            </div>
                        )
                    )}
                </div>

                {!respostaIA && !isLoading && (
                    <div className="suggestions-section">
                        <p className="suggestions-text">Sugestões sobre o que perguntar à sua IA:</p>
                        <Row className="g-3">
                            {suggestions.map((sug, index) => (
                                <Col xs={12} md={4} key={index}>
                                    <div 
                                        className="suggestion-card" 
                                        onClick={() => handleSuggestionClick(sug)}
                                    >
                                        {sug}
                                    </div>
                                </Col>
                            ))}
                        </Row>
                    </div>
                )}
                
                {/* Campo de Input Principal e Botão de Envio */}
                <div className="w-100 d-flex align-items-center mt-auto p-3"> {/* mt-auto para empurrar para baixo */}
                    <Form onSubmit={handleEnviarPrompt} className="d-flex flex-grow-1">
                        <Form.Control
                            as="textarea"
                            rows={1} // Começa com 1 linha e expande
                            className="main-chat-input"
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            placeholder="Pergunte algo sobre seus projetos..."
                            disabled={isLoading}
                            style={{ resize: 'none', maxHeight: '150px' }} // Desabilita resize manual, limita altura
                        />
                        <Button 
                            type="submit" 
                            disabled={isLoading || !prompt.trim()} 
                            className="send-button"
                        >
                            <SendFill />
                        </Button>
                    </Form>
                </div>
            </Container>
        </div>
    );
}

export default LabIA;