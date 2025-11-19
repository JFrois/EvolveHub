// src/pages/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, ProgressBar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

// Componentes personalizados
import CardBemEstar from '../components/CardBemEstar';
import CardStatus from '../components/CardStatus';
import CardSkill from '../components/CardSkill';

// CSS específico da página
import './Dashboard.css';

function Dashboard() {
    const [skillProgress, setSkillProgress] = useState(0);
    const [nextSkill, setNextSkill] = useState(null);
    const [inProgressCourses, setInProgressCourses] = useState([]); // Estado para armazenar os cursos em andamento
    const [selectedStatuses, setSelectedStatuses] = useState([]); // Estado para armazenar os status selecionados

    // Integração com trilha.json
    useEffect(() => {
        fetch('/trilha.json')
            .then((res) => {
                if (!res.ok) throw new Error('Não foi possível carregar trilha.json');
                return res.json();
            })
            .then((data) => {
                const skills = Array.isArray(data.trilha) ? data.trilha : [];
                if (skills.length === 0) {
                    setSkillProgress(0);
                    setNextSkill('Nenhuma skill encontrada');
                    return;
                }
                const completed = skills.filter((s) => s.completo).length;
                setSkillProgress((completed / skills.length) * 100);
                const next = skills.find((s) => !s.completo);
                setNextSkill(next ? next.nome : 'Todas concluídas! 🎉');
            })
            .catch((err) => {
                console.error(err);
                setNextSkill('Erro ao carregar trilha');
            });
    }, []);

    // Carregar cursos em andamento do backend
    useEffect(() => {
        fe
