// api/ai.js
import dotenv from 'dotenv';
dotenv.config(); // Garante que o .env seja lido
import { GoogleGenerativeAI } from "@google/generative-ai";

let genAIInstance = null;

export async function criarCliente() {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error("GEMINI_API_KEY não encontrada no arquivo .env");
  }

  if (!genAIInstance) {
    genAIInstance = new GoogleGenerativeAI(apiKey);
  }

  return genAIInstance;
}

export async function resumirConversa(ai, historico) {
  if (!historico || historico.length <= 6) {
    return historico.map(m => `${m.role}: ${m.content}`).join("\n");
  }

  const texto = historico
    .map(m => `${m.role}: ${m.content}`)
    .join("\n");

  const prompt = `
Resuma a conversa abaixo de forma objetiva para manter o contexto.
CONVERSA:
${texto}
RESUMO:`;

  try {
    // CORRIGIDO: Modelo atualizado para 1.5-flash
    const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Erro ao resumir:", error);
    return texto.substring(texto.length - 2000);
  }
}

export async function gerarResposta(ai, historico, novaMensagem) {
  try {
    const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent(novaMensagem);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Erro ao gerar resposta no helper:", error);
    throw error;
  }
}