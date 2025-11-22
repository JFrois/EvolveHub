// src/pages/LabIA.jsx
import React, { useState, useRef, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { SendFill, PersonFill, Robot } from 'react-bootstrap-icons';
import './LabIA.css';
import { gerarRespostaIA } from '../services/api';

function LabIA() {
    const [prompt, setPrompt] = useState('');
    const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [erro, setErro] = useState(null);

    const messagesEndRef = useRef(null);

    const suggestions = [
        "O que posso te pedir para fazer?",
        "Qual dos meus projetos está com melhor desempenho?",
        "Que projetos devo me preocupar agora?"
    ];

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isLoading]);

    const handleEnviarPrompt = async (e) => {
        if (e) e.preventDefault();
        if (!prompt.trim()) return;

        const textoPergunta = prompt;
        setPrompt('');
        setMessages(prev => [...prev, { text: textoPergunta, sender: 'user' }]);

        setIsLoading(true);
        setErro(null);

        try {
            const resposta = await gerarRespostaIA(textoPergunta);
            setMessages(prev => [...prev, { text: resposta, sender: 'ai' }]);
        } catch (err) {
            console.error("Erro capturado no LabIA:", err);
            // CORREÇÃO: Mostra a mensagem real do erro para ajudar no debug
            setErro(err.message || "Ocorreu um erro desconhecido.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleSuggestionClick = (suggestion) => {
        setPrompt(suggestion);
    };

    return (
        <div className="lab-ia-page">
            <Container className="content-wrapper d-flex flex-column" style={{ height: '100vh' }}>

                <div className="text-center pt-4 pb-2">
                    <div className="lab-ia-logo mb-2">
                        <span>✨</span>
                    </div>
                    <h2 className="lab-ia-title">Pergunte ao Co-Piloto</h2>
                </div>

                <div className="chat-area flex-grow-1 overflow-auto mb-3 px-3">

                    {messages.length === 0 && (
                        <div className="suggestions-section mt-5">
                            <p className="suggestions-text text-center">Sugestões para começar:</p>
                            <Row className="g-3 justify-content-center">
                                {suggestions.map((sug) => (
                                    <Col xs={12} md={4} key={sug}>
                                        <div className="suggestion-card" onClick={() => handleSuggestionClick(sug)}>
                                            {sug}
                                        </div>
                                    </Col>
                                ))}
                            </Row>
                        </div>
                    )}

                    {messages.map((msg, index) => (
                        <div key={index} className={`message-row d-flex ${msg.sender === 'user' ? 'justify-content-end' : 'justify-content-start'} mb-3`}>
                            <div className={`message-bubble ${msg.sender === 'user' ? 'user-bubble' : 'ai-bubble'}`}>
                                {msg.sender === 'ai' && <Robot className="message-icon me-2" />}
                                {msg.sender === 'user' && <PersonFill className="message-icon ms-2 order-2" />}
                                <span className={msg.sender === 'user' ? 'order-1' : ''}>{msg.text}</span>
                            </div>
                        </div>
                    ))}

                    {isLoading && (
                        <div className="message-row d-flex justify-content-start mb-3">
                            <div className="ai-bubble message-bubble d-flex align-items-center">
                                <Robot className="message-icon me-2" />
                                <div className="typing-indicator">
                                    <span></span><span></span><span></span>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Exibe o erro real agora */}
                    {erro && <Alert variant="danger" className="mt-3">{erro}</Alert>}

                    <div ref={messagesEndRef} />
                </div>

                <div className="input-area p-3 bg-white border-top">
                    <Form onSubmit={handleEnviarPrompt} className="d-flex align-items-center">
                        <Form.Control
                            as="textarea"
                            rows={1}
                            className="main-chat-input me-2"
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            placeholder="Digite sua pergunta..."
                            disabled={isLoading}
                            style={{ resize: 'none', borderRadius: '20px' }}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault();
                                    handleEnviarPrompt(e);
                                }
                            }}
                        />
                        <Button
                            type="submit"
                            disabled={isLoading || !prompt.trim()}
                            className="send-button rounded-circle p-2"
                            style={{ width: '45px', height: '45px' }}
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