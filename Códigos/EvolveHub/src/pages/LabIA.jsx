import React, { useState, useRef, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { SendFill, PersonFill, Robot } from 'react-bootstrap-icons'; 
import './LabIA.css';
import { gerarRespostaIA } from '../services/api';

function LabIA() {
    const [prompt, setPrompt] = useState('');
    // Array para guardar o histórico da conversa
    const [messages, setMessages] = useState([]); 
    const [isLoading, setIsLoading] = useState(false);
    const [erro, setErro] = useState(null);

    // Ref para rolar o chat para baixo automaticamente
    const messagesEndRef = useRef(null);

    const suggestions = [
        "O que posso te pedir para fazer?",
        "Qual dos meus projetos está com melhor desempenho?",
        "Que projetos devo me preocupar agora?"
    ];

    // Função para rolar para o final do chat sempre que houver nova mensagem
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isLoading]);

    const handleEnviarPrompt = async (e) => {
        if (e) e.preventDefault();
        if (!prompt.trim()) return;

        const textoPergunta = prompt; // Guarda o texto antes de limpar

        // Limpa o campo IMEDIATAMENTE e adiciona msg do usuário
        setPrompt(''); 
        setMessages(prev => [...prev, { text: textoPergunta, sender: 'user' }]);
        
        setIsLoading(true);
        setErro(null);
        
        console.log("Enviando prompt:", textoPergunta);

        try {
            // Simulação de delay (mantenha ou remova conforme sua API real)
            await new Promise(resolve => setTimeout(resolve, 1000)); 

            const resposta = await gerarRespostaIA(textoPergunta);
            
            // Adiciona a resposta da IA ao histórico
            setMessages(prev => [...prev, { text: resposta, sender: 'ai' }]);

        } catch (err) {
            console.error("Erro ao comunicar com a IA:", err);
            setErro("Não foi possível conectar com o Co-Piloto Evolve.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleSuggestionClick = (suggestion) => {
        // Ao clicar na sugestão, já define o texto e envia ou prepara
        setPrompt(suggestion);
        // Se quiser enviar direto ao clicar, descomente a linha abaixo:
        // handleEnviarPrompt({ preventDefault: () => {} }, suggestion);
    };

    return (
        <div className="lab-ia-page">
            <Container className="content-wrapper d-flex flex-column" style={{ height: '100vh' }}> 
                
                {/* Cabeçalho Fixo */}
                <div className="text-center pt-4 pb-2">
                    <div className="lab-ia-logo mb-2">
                        <span>✨</span>
                    </div>
                    <h2 className="lab-ia-title">Pergunte ao Co-Piloto</h2>
                </div>

                {/* Área de Chat (Scrollável) */}
                <div className="chat-area flex-grow-1 overflow-auto mb-3 px-3">
                    
                    {/* Mostra sugestões apenas se não houver mensagens ainda */}
                    {messages.length === 0 && (
                        <div className="suggestions-section mt-5">
                            <p className="suggestions-text text-center">Sugestões para começar:</p>
                            <Row className="g-3 justify-content-center">
                                {suggestions.map((sug) => (
                                    <Col xs={12} md={4} key={sug}>
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

                    {/* Loop de Mensagens */}
                    {messages.map((msg, index) => (
                        <div 
                            key={index} 
                            className={`message-row d-flex ${msg.sender === 'user' ? 'justify-content-end' : 'justify-content-start'} mb-3`}
                        >
                            <div className={`message-bubble ${msg.sender === 'user' ? 'user-bubble' : 'ai-bubble'}`}>
                                {msg.sender === 'ai' && <Robot className="message-icon me-2" />}
                                {msg.sender === 'user' && <PersonFill className="message-icon ms-2 order-2" />}
                                <span className={msg.sender === 'user' ? 'order-1' : ''}>{msg.text}</span>
                            </div>
                        </div>
                    ))}

                    {/* Loading Indicator (Animação de bolinhas) */}
                    {isLoading && (
                        <div className="message-row d-flex justify-content-start mb-3">
                            <div className="ai-bubble message-bubble d-flex align-items-center">
                                <Robot className="message-icon me-2" />
                                <div className="typing-indicator">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>
                            </div>
                        </div>
                    )}
                    
                    {erro && <Alert variant="danger">{erro}</Alert>}
                    
                    {/* Elemento invisível para ancorar o scroll */}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input Fixo no Rodapé */}
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