import { GoogleGenAI } from "@google/genai";

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

const ai = new GoogleGenAI({
    apiKey: GEMINI_API_KEY
});

const SYSTEM_INSTRUCTION = `Você é uma IA de auxílio de uma plataforma de desenvolvimento pessoal
focado em organizar e melhorar a produtividade do usuário.
Responda de forma gentil e positiva.

UTILIZE APENAS '-' PARA SINTETIZAR EM TÓPICOS CASO NECESSÁRIO E NADA MAIS DE MARKDOWN, RESPONDA EM PORTUGUES (PT-BR).
`;

const chat = ai.chats.create({
    model: "gemini-2.5-flash", 
    config: {
        systemInstruction: SYSTEM_INSTRUCTION, // Usa as regras como instrução do sistema
    }
});

// Cada usuário teria seus dados do site aqui para tratamento personalizado.
const dadosParaIA = {
 "user_profile": {
   "nickname": "Alexa",
   "gender": "Female",
   "country": "Brazil",
   "language": "Portuguese (BR)",
   "time_zone": "GMT-03:00 Brasilia"
 },
 "user_skills_progress": [
   { "skill_name": "Introdução ao Design Thinking", "details": "Fundamentos e processos.", "status": "Completo" },
   { "skill_name": "Fundamentos de UX", "details": "Pesquisa e prototipagem.", "status": "Completo" },
   { "skill_name": "React Básico", "details": "Componentes, props, state.", "status": "Em Progresso" },
   { "skill_name": "React Avançado", "details": "Hooks, performance.", "status": "Em Progresso" },
   { "skill_name": "IA para Profissionais", "details": "Introdução ao uso de APIs de IA.", "status": "Em Progresso" }
 ]
};
const jsonString = JSON.stringify(dadosParaIA, null, 2);

const CONTEXTO_FIXO = `
---
Detalhes do usuário (JSON):
\`\`\`json
${jsonString}
\`\`\`
`;

export async function gerarRespostaIA(prompt) {
    if (!prompt) {
        throw new Error("O prompt não pode ser vazio.");
    }

    const prompt_com_contexto = `${CONTEXTO_FIXO}
---
PERGUNTA DO USUÁRIO: ${prompt}
`;
    const response = await chat.sendMessage({
        message: prompt_com_contexto,
    });
    
    return response.text;
}

export function resetChatSession() {
    return ai.chats.create({
        model: "gemini-2.5-flash", 
        config: {
            systemInstruction: SYSTEM_INSTRUCTION,
        }
    });
}