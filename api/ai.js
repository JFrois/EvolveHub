// api/ai.js
import { GoogleGenerativeAI } from "@google/generative-ai";

try {
    import('dotenv').then(dotenv => dotenv.config()).catch(() => {});
} catch (e) {}

let genAIInstance = null;

export async function criarCliente() {
  const apiKey = process.env.GEMINI_API_KEY;
  
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY não configurada na Vercel.");
  }

  if (!genAIInstance) {
    genAIInstance = new GoogleGenerativeAI(apiKey);
  }
  
  return genAIInstance;
}

export async function resumirConversa(ai, historico) {
  if (!historico || historico.length <= 6) return "";

  const texto = historico.map(m => `${m.role}: ${m.content}`).join("\n");
  const prompt = `Resuma: ${texto}`;

  try {
    const model = ai.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Erro ao resumir:", error);
    return "";
  }
}

export async function gerarResposta(ai, historico, novaMensagem) {
  try {
    const model = ai.getGenerativeModel({ model: "gemini-pro" });
    
    const result = await model.generateContent(novaMensagem);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Erro IA:", error);
    // Repassa o erro original para aparecer na tela vermelha se falhar
    throw error;
  }
}