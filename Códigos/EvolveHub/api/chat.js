import { GoogleGenAI } from "@google/genai";

// 1. Pega a API Key (SEGURA) do ambiente da Vercel
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// 2. Suas instruções de sistema
const SYSTEM_INSTRUCTION = `Você é uma IA de auxílio de uma plataforma de desenvolvimento pessoal
focado em organizar e melhorar a produtividade do usuário.
Responda de forma gentil e positiva.
UTILIZE APENAS '-' PARA SINTETIZAR EM TÓPICOS CASO NECESSÁRIO E NADA MAIS DE MARKDOWN, RESPONDA EM PORTUGUES (PT-BR).
`;

// 3. A Função da Vercel
export default async function handler(request, response) {
  // Permite apenas requisições POST
  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method Not Allowed' });
  }

  // 4. Verificação de segurança (inicialização da IA)
  if (!GEMINI_API_KEY) {
    console.error("Erro: Chave do Gemini não configurada no servidor.");
    return response.status(500).json({ error: 'Configuração do servidor incompleta.' });
  }

  try {
    // Pega o prompt que o frontend enviou
    const { prompt } = request.body;
    if (!prompt) {
      return response.status(400).json({ error: 'O prompt é obrigatório' });
    }

    // Inicializa o cliente da IA aqui, no servidor
    const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
    
    // Pega os dados de contexto (movidos para o backend)
    const dadosParaIA = {
      "user_profile": { "nickname": "Alexa", "country": "Brazil" },
      "user_skills_progress": [
        { "skill_name": "Fundamentos de UX", "status": "Completo" },
        { "skill_name": "React Básico", "status": "Em Progresso" },
      ]
    };
    const jsonString = JSON.stringify(dadosParaIA, null, 2);
    const CONTEXTO_FIXO = `---
Detalhes do usuário (JSON):
\`\`\`json
${jsonString}
\`\`\`
`;

    const chat = ai.chats.create({
      model: "gemini-2.5-flash",
      config: { systemInstruction: SYSTEM_INSTRUCTION }
    });

    const prompt_com_contexto = `${CONTEXTO_FIXO}\n---\nPERGUNTA DO USUÁRIO: ${prompt}`;

    // 5. Chama o Gemini (do servidor para o Gemini)
    const geminiResponse = await chat.sendMessage({
      message: prompt_com_contexto,
    });
    
    // 6. Envia a resposta de volta para o seu frontend
    return response.status(200).json({ text: geminiResponse.text });

  } catch (error) {
    console.error("Erro na API /api/chat:", error);
    return response.status(500).json({ error: 'Falha ao comunicar com a IA.' });
  }
}