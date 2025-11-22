// src/pages/Admin.jsx
import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Alert, Button } from 'react-bootstrap';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    PointElement,
    LineElement,
    Filler
} from 'chart.js';
import { Bar, Doughnut, Line, Pie } from 'react-chartjs-2';
import { Link } from 'react-router-dom';
import {
    EmojiSmileFill,
    Laptop,
    Building,
    BookHalf,
    GraphUpArrow,
    InfoCircle
} from 'react-bootstrap-icons';

// Registrando componentes do Chart.js
ChartJS.register(
    CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement, Filler
);

function Admin() {
    const [courseStats, setCourseStats] = useState({ todo: 0, inprogress: 0, completed: 0, totalHours: 0 });
    const [moodData, setMoodData] = useState({ labels: [], data: [] });
    const [workModeStats, setWorkModeStats] = useState({ home: 0, onsite: 0 });
    const [workMoodStats, setWorkMoodStats] = useState({});
    const [loading, setLoading] = useState(true);
    const [hasData, setHasData] = useState(false);

    useEffect(() => {
        carregarDados();
    }, []);

    const carregarDados = () => {
        // 1. Dados da Trilha
        const storedCourses = localStorage.getItem('evolvehub_courses_v1');
        if (storedCourses) {
            const courses = JSON.parse(storedCourses);
            setCourseStats({
                todo: courses.filter(c => c.status === 'todo').length,
                inprogress: courses.filter(c => c.status === 'inprogress').length,
                completed: courses.filter(c => c.status === 'completed').length,
                totalHours: courses.reduce((acc, curr) => acc + (parseInt(curr.horas) || 0), 0)
            });
        }

        // 2. Dados de Check-ins
        const moodHistory = [];
        const modeCounts = { home: 0, onsite: 0 };
        const moodWorkCounts = { engaged: 0, productive: 0, neutral: 0, tired: 0, overwhelmed: 0 };
        let dataFound = false;

        const keys = Object.keys(localStorage);
        const moodValues = { 'very_happy': 5, 'happy': 4, 'neutral': 3, 'sad': 2, 'stressed': 1 };

        keys.forEach(key => {
            if (key.startsWith('evolvehub_checkin_')) {
                try {
                    dataFound = true;
                    const data = JSON.parse(localStorage.getItem(key));
                    const datePart = key.replace('evolvehub_checkin_', '');
                    const dateObj = new Date(datePart);
                    // Formata DD/MM
                    const dateFormatted = dateObj.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });

                    if (data.mood && moodValues[data.mood]) {
                        moodHistory.push({
                            date: dateFormatted,
                            rawDate: dateObj,
                            value: moodValues[data.mood]
                        });
                    }

                    if (data.workMode === 'home') modeCounts.home++;
                    if (data.workMode === 'onsite') modeCounts.onsite++;

                    if (data.workMood && moodWorkCounts.hasOwnProperty(data.workMood)) {
                        moodWorkCounts[data.workMood]++;
                    }
                } catch (e) { console.error(e); }
            }
        });

        moodHistory.sort((a, b) => a.rawDate - b.rawDate);

        // Limita aos últimos 7 registros para o gráfico não ficar espremido
        const last7Moods = moodHistory.slice(-7);

        setMoodData({
            labels: last7Moods.map(d => d.date),
            data: last7Moods.map(d => d.value)
        });
        setWorkModeStats(modeCounts);
        setWorkMoodStats(moodWorkCounts);
        setHasData(dataFound);
        setLoading(false);
    };


    // 1. Gráfico de Humor (Emojis no Eixo Y)
    const lineOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        const val = context.raw;
                        const labels = { 5: 'Muito Bem 🤩', 4: 'Bem 🙂', 3: 'Neutro 😐', 2: 'Triste 😞', 1: 'Estressado 😫' };
                        return labels[val] || val;
                    }
                }
            }
        },
        scales: {
            y: {
                min: 0.5,
                max: 5.5,
                ticks: {
                    stepSize: 1,
                    callback: function (value) {
                        const emojis = { 5: '🤩', 4: '🙂', 3: '😐', 2: '😞', 1: '😫' };
                        return emojis[value] || '';
                    },
                    font: { size: 18 } // Emojis maiores
                },
                grid: { color: '#f0f0f0' }
            },
            x: {
                grid: { display: false }
            }
        }
    };

    const lineData = {
        labels: moodData.labels,
        datasets: [{
            label: 'Humor',
            data: moodData.data,
            borderColor: '#FD7E14',
            backgroundColor: 'rgba(253, 126, 20, 0.1)', // Sombra laranja suave
            pointBackgroundColor: '#fff',
            pointBorderColor: '#FD7E14',
            pointRadius: 6,
            pointHoverRadius: 8,
            fill: true,
            tension: 0.4
        }]
    };

    // 2. Gráfico de Barras (Cores Semânticas)
    const barData = {
        labels: ['Engajado', 'Produtivo', 'Neutro', 'Cansado', 'Sobrecarregado'],
        datasets: [{
            label: 'Dias',
            data: [
                workMoodStats.engaged || 0,
                workMoodStats.productive || 0,
                workMoodStats.neutral || 0,
                workMoodStats.tired || 0,
                workMoodStats.overwhelmed || 0
            ],
            backgroundColor: [
                '#198754', // Verde (Bom)
                '#0d6efd', // Azul (Bom)
                '#adb5bd', // Cinza (Neutro)
                '#fd7e14', // Laranja (Alerta)
                '#dc3545'  // Vermelho (Perigo)
            ],
            borderRadius: 6,
            barThickness: 30
        }]
    };

    // 3. Gráfico de Pizza (Cores Distintas)
    const pieData = {
        labels: ['Home Office', 'Presencial'],
        datasets: [{
            data: [workModeStats.home, workModeStats.onsite],
            backgroundColor: ['#0dcaf0', '#6610f2'],
            hoverOffset: 4
        }]
    };

    // 4. Gráfico de Rosca (Trilhas)
    const doughnutData = {
        labels: ['A Fazer', 'Em Progresso', 'Concluído'],
        datasets: [{
            data: [courseStats.todo, courseStats.inprogress, courseStats.completed],
            backgroundColor: ['#e9ecef', '#ffc107', '#198754'],
            borderWidth: 0,
            hoverOffset: 4
        }]
    };

    // Componente de Cartão KPI
    const KpiCard = ({ icon, title, value, color, subtitle }) => (
        <Card className="border-0 shadow-sm h-100 card-hover-effect">
            <Card.Body className="d-flex align-items-center">
                <div className={`rounded-circle p-3 me-3 bg-${color} bg-opacity-10`}>
                    {icon}
                </div>
                <div>
                    <h6 className="text-muted text-uppercase mb-1" style={{ fontSize: '0.75rem', letterSpacing: '0.5px' }}>{title}</h6>
                    <h3 className={`fw-bold mb-0 text-${color}`}>{value}</h3>
                    {subtitle && <small className="text-muted">{subtitle}</small>}
                </div>
            </Card.Body>
        </Card>
    );

    return (
        <div style={{ background: '#f8f9fa', minHeight: '100vh', paddingBottom: '60px' }}>
            <Container className="pt-5">

                {/* Cabeçalho */}
                <div className="mb-5">
                    <h2 style={{ color: '#1a2a44', fontWeight: '700' }}>Relatório de Saúde & Produtividade</h2>
                    <p className="text-muted">Acompanhe métricas vitais para o seu equilíbrio profissional.</p>
                </div>

                {/* Seção 1: Indicadores Principais (KPIs) */}
                <Row className="g-4 mb-5">
                    <Col md={6} xl={3}>
                        <KpiCard
                            icon={<EmojiSmileFill size={24} className="text-primary" />}
                            title="Humor Médio"
                            color="primary"
                            value={moodData.data.length > 0
                                ? (moodData.data.reduce((a, b) => a + b, 0) / moodData.data.length).toFixed(1)
                                : '-'}
                            subtitle="Últimos 7 check-ins"
                        />
                    </Col>
                    <Col md={6} xl={3}>
                        <KpiCard
                            icon={<Laptop size={24} className="text-info" />}
                            title="Dias em Home Office"
                            color="info"
                            value={workModeStats.home}
                        />
                    </Col>
                    <Col md={6} xl={3}>
                        <KpiCard
                            icon={<Building size={24} className="text-purple" style={{ color: '#6610f2' }} />}
                            title="Dias Presenciais"
                            color="secondary" // Usando classe bootstrap, ajustado no inline style do icone
                            value={workModeStats.onsite}
                        />
                    </Col>
                    <Col md={6} xl={3}>
                        <KpiCard
                            icon={<BookHalf size={24} className="text-success" />}
                            title="Cursos Concluídos"
                            color="success"
                            value={courseStats.completed}
                        />
                    </Col>
                </Row>

                {!hasData && (
                    <Alert variant="light" className="text-center shadow-sm border-0 py-5 mb-5">
                        <InfoCircle size={40} className="text-muted mb-3" />
                        <h5>Ainda não temos dados suficientes</h5>
                        <p className="text-muted max-w-500 mx-auto">
                            Faça seu check-in diário no <strong>Dashboard</strong> para começar a visualizar seus gráficos de saúde e produtividade aqui.
                        </p>
                        <Link to="/dashboard">
                            <Button variant="outline-primary">Ir para Dashboard</Button>
                        </Link>
                    </Alert>
                )}

                {hasData && (
                    <>
                        {/* Seção 2: Saúde Mental (Linha do Tempo) */}
                        <Row className="mb-4">
                            <Col xs={12}>
                                <Card className="border-0 shadow-sm">
                                    <Card.Header className="bg-white border-0 pt-4 px-4">
                                        <h5 className="mb-0 fw-bold text-dark">
                                            <GraphUpArrow className="me-2 text-warning" />
                                            Evolução do Bem-Estar
                                        </h5>
                                    </Card.Header>
                                    <Card.Body className="px-4 pb-4">
                                        <div style={{ height: '300px' }}>
                                            <Line data={lineData} options={lineOptions} />
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>

                        {/* Seção 3: Grid de Detalhes */}
                        <Row className="g-4">
                            {/* Sentimento no Trabalho */}
                            <Col lg={6}>
                                <Card className="border-0 shadow-sm h-100">
                                    <Card.Header className="bg-white border-0 pt-4 px-4">
                                        <h5 className="mb-0 fw-bold text-dark">Sentimento no Trabalho</h5>
                                        <small className="text-muted">Como você se sentiu durante o expediente</small>
                                    </Card.Header>
                                    <Card.Body>
                                        <div style={{ height: '250px' }}>
                                            <Bar
                                                data={barData}
                                                options={{
                                                    maintainAspectRatio: false,
                                                    plugins: { legend: { display: false } },
                                                    scales: {
                                                        y: { grid: { display: false }, ticks: { precision: 0 } },
                                                        x: { grid: { display: false } }
                                                    }
                                                }}
                                            />
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>

                            {/* Local de Trabalho & Cursos */}
                            <Col lg={3}>
                                <Card className="border-0 shadow-sm h-100">
                                    <Card.Header className="bg-white border-0 pt-4 px-4 text-center">
                                        <h6 className="fw-bold">Local de Trabalho</h6>
                                    </Card.Header>
                                    <Card.Body>
                                        <div style={{ height: '200px', display: 'flex', justifyContent: 'center' }}>
                                            <Pie
                                                data={pieData}
                                                options={{
                                                    maintainAspectRatio: false,
                                                    plugins: { legend: { position: 'bottom', labels: { usePointStyle: true } } }
                                                }}
                                            />
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>

                            <Col lg={3}>
                                <Card className="border-0 shadow-sm h-100">
                                    <Card.Header className="bg-white border-0 pt-4 px-4 text-center">
                                        <h6 className="fw-bold">Progresso na Trilha</h6>
                                    </Card.Header>
                                    <Card.Body>
                                        <div style={{ height: '200px', display: 'flex', justifyContent: 'center' }}>
                                            <Doughnut
                                                data={doughnutData}
                                                options={{
                                                    maintainAspectRatio: false,
                                                    cutout: '70%',
                                                    plugins: { legend: { position: 'bottom', labels: { usePointStyle: true } } }
                                                }}
                                            />
                                        </div>
                                        <div className="text-center mt-2">
                                            <h3 className="fw-bold mb-0">{courseStats.completed}</h3>
                                            <small className="text-muted">Cursos concluídos</small>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </>
                )}
            </Container>
        </div>
    );
}

export default Admin;