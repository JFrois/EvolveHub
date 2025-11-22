import { criarCliente, resumirConversa, gerarResposta } from "./ai.js";

// ===========================================================
// CONFIGURAÇÃO DE ARMAZENAMENTO TEMPORÁRIO (Serverless)
// ===========================================================
// Na Vercel, não podemos escrever em pastas normais, apenas em /tmp
const isProduction = process.env.NODE_ENV === 'production';
// Se estiver em produção, NÃO TENTE ler arquivos, use memória volátil para evitar erros de 'fs'
// (Para um chat simples, persistência em arquivo na Vercel não funciona bem sem banco de dados real)

export default async function handler(request, response) {
  // 1. Validação de Método
  if (request.method !== "POST") {
    return response.status(405).json({ error: "Método não permitido (Use POST)" });
  }

  // 2. Validação da Chave (DEBUG EXPLÍCITO)
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error("ERRO CRÍTICO: GEMINI_API_KEY está undefined no servidor.");
    return response.status(500).json({
      error: "A chave de API (GEMINI_API_KEY) não foi configurada no painel da Vercel."
    });
  }

  try {
    const { prompt } = request.body;
    if (!prompt) return response.status(400).json({ error: "O prompt é obrigatório" });

    // 3. Tenta conectar com a IA
    try {
      const ai = await criarCliente();

      // Define um histórico vazio para evitar erros de leitura de arquivo na Vercel
      // (Melhoria futura: usar um Banco de Dados real como MongoDB/Postgres)
      const historico = [];

      const systemInstruction = `
        Você é uma IA de auxílio de uma plataforma de desenvolvimento pessoal chamada EvolveHub.
        Responda de forma objetiva, gentil e positiva em Português (PT-BR).
        O usuário perguntou: ${prompt}
      `;

      const resposta = await gerarResposta(ai, historico, systemInstruction);

      return response.status(200).json({ text: resposta });

    } catch (aiError) {
      console.error("Erro direto do Gemini:", aiError);
      return response.status(500).json({
        error: `Erro ao falar com o Google: ${aiError.message || 'Erro desconhecido'}`
      });
    }

  } catch (err) {
    console.error("Erro Geral na API:", err);
    return response.status(500).json({ error: `Erro interno no servidor: ${err.message}` });
  }
}