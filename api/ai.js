// api/ai.js
import { GoogleGenerativeAI } from "@google/generative-ai";

// Carrega variáveis de ambiente se estiver local
try {
  import('dotenv').then(d => d.config()).catch(() => { })
} catch (e) { }

let genAIInstance = null;

export async function criarCliente() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error("GEMINI_API_KEY não configurada.");

  if (!genAIInstance) {
    genAIInstance = new GoogleGenerativeAI(apiKey);
  }
  return genAIInstance;
}

export async function gerarResposta(ai, historico, prompt) {
  try {
    // ATUALIZADO: Usando o modelo 'gemini-2.5-flash' (Versão atual em Nov/2025)
    const model = ai.getGenerativeModel({ model: "gemini-2.5-flash" });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Erro na IA:", error);
    throw error;
  }
}

export async function resumirConversa() { return ""; }