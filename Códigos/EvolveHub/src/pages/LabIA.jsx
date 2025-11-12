// src/pages/LabIA.jsx
import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Spinner, Alert, Card } from 'react-bootstrap';

function LabIA() {
    const [prompt, setPrompt] = useState(''); // Estado para o input do utilizador
    const [respostaIA, setRespostaIA] = useState(''); // Estado para a resposta da IA
    const [isLoading, setIsLoading] = useState(false); // Estado para o spinner de carregamento
    const [erro, setErro] = useState(null); // Estado para mensagens de erro

    const handleEnviarPrompt = async (e) => {
        e.preventDefault(); // Previne o comportamento padrão do formulário (recarregar a página)
        setIsLoading(true);
        setErro(null); // Limpa erros anteriores
        setRespostaIA(''); // Limpa a resposta anterior

        // --- AQUI VAI SER ONDE CHAMAMOS A NOSSA API PYTHON (no próximo passo!) ---
        // Por enquanto, vamos simular uma resposta
        console.log("Enviando prompt (simulado):", prompt);

        try {
            // SIMULAÇÃO: Num projeto real, farias um 'fetch' ou 'axios' para a tua API Python
            // await fetch('/api/gemini-proxy', { ... });
            await new Promise(resolve => setTimeout(resolve, 2000)); // Simula 2 segundos de espera

            // Resposta simulada
            const respostaSimulada = `Olá! Simulei a tua tarefa com o prompt:\n\n"${prompt}"\n\nNo futuro, a IA irá gerar um resultado real aqui. Por exemplo:\n\n\`\`\`python\n# Código Python sugerido pela IA\ndef soma(a, b):\n    return a + b\n\nprint(soma(5, 3)) # Output: 8\n\`\`\`\n\nEstou pronto para te ajudar a otimizar as tuas tarefas!`;

            setRespostaIA(respostaSimulada);

        } catch (err) {
            console.error("Erro ao comunicar com a IA (simulado):", err);
            setErro("Não foi possível conectar com o Co-Piloto Evolve. Tenta novamente mais tarde.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Container className="my-5">
            <Row className="mb-4">
                <Col>
                    <h2 className="text-center">Laboratório Co-Piloto Evolve<span style={{ color: '#FD7E14' }}>Hub</span></h2>
                    <p className="lead text-center text-muted">
                        A tua parceira IA para otimizar tarefas e impulsionar a criatividade.
                    </p>
                </Col>
            </Row>

            <Row>
                <Col md={12} lg={6} className="mb-4">
                    <Card>
                        <Card.Body>
                            <Card.Title className="h5">Diz-me como posso ajudar:</Card.Title>
                            <Form onSubmit={handleEnviarPrompt}>
                                <Form.Group controlId="promptTextArea" className="mb-3">
                                    <Form.Label>O que precisas?</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={8}
                                        value={prompt}
                                        onChange={(e) => setPrompt(e.target.value)}
                                        placeholder="Ex: 'Escreve um pseudocódigo para calcular a média de 5 números' ou 'Sugere um esquema de cores para um site sobre sustentabilidade'."
                                        disabled={isLoading}
                                    />
                                </Form.Group>
                                <Button variant="primary" type="submit" disabled={isLoading} className="w-100">
                                    {isLoading ? (
                                        <>
                                            <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" className="me-2" />
                                            A pensar...
                                        </>
                                    ) : (
                                        "Perguntar ao Co-Piloto"
                                    )}
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>

                <Col md={12} lg={6}>
                    <Card>
                        <Card.Body>
                            <Card.Title className="h5">Resposta do Co-Piloto:</Card.Title>
                            {erro && <Alert variant="danger">{erro}</Alert>}
                            {isLoading ? (
                                <div className="text-center py-5">
                                    <Spinner animation="border" role="status" variant="primary" />
                                    <p className="mt-2 text-muted">A gerar a resposta...</p>
                                </div>
                            ) : (
                                <div className="resposta-ia-box p-3 bg-light rounded" style={{ minHeight: '200px', whiteSpace: 'pre-wrap', fontFamily: 'monospace' }}>
                                    {/* `whiteSpace: 'pre-wrap'` e `fontFamily: 'monospace'` ajudam a formatar o código */}
                                    {respostaIA || "Aguardando a tua pergunta..."}
                                </div>
                            )}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default LabIA;