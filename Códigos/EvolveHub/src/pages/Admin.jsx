// src/pages/Admin.jsx
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

function Admin() {
    return (
        <Container className="my-5">
            <Row>
                <Col>
                    <h2 className="text-center">Página de Admin</h2>
                    <p className="lead text-center text-muted">
                        Área de gestão para adicionar novas skills Teste.
                    </p>
                    {/* Conteúdo do Admin virá aqui (formulário de adicionar skill) */}
                </Col>
            </Row>
        </Container>
    );
}

export default Admin; 