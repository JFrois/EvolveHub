// api/ai.js
import { GoogleGenerativeAI } from "@google/generative-ai";

try {
    import('dotenv').then(dotenv => dotenv.config()).catch(() => {});
} catch (e) {
}

let genAIInstance = null;

export async function criarCliente() {
  const apiKey = process.env.GEMINI_API_KEY;
  
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY não encontrada. Verifique as Variáveis de Ambiente na Vercel.");
  }

  if (!genAIInstance) {
    genAIInstance = new GoogleGenerativeAI(apiKey);
  }
  
  return genAIInstance;
}

export async function resumirConversa(ai, historico) {
  if (!historico || historico.length <= 6) {
    return "";
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
    const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });
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
    const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const result = await model.generateContent(novaMensagem);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Erro ao gerar resposta no helper:", error);
    throw error;
  }
}