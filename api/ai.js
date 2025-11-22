// api/ai.js
import { GoogleGenerativeAI } from "@google/generative-ai";

// Configuração para rodar localmente (lê o .env se existir)
try { 
    import('dotenv').then(d => d.config()).catch(()=>{}) 
} catch(e) {}

let genAIInstance = null;

export async function criarCliente() {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error("GEMINI_API_KEY não configurada. Verifique as Variáveis de Ambiente na Vercel.");
  }

  if (!genAIInstance) {
    genAIInstance = new GoogleGenerativeAI(apiKey);
  }
  
  return genAIInstance;
}

export async function gerarResposta(ai, historico, prompt) {
  try {
    // Usamos o modelo 'gemini-1.5-flash' que é o padrão atual, rápido e barato.
    // Se este der erro 404, significa que sua conta Google precisa ativar a API (passo anterior).
    const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Erro ao gerar resposta na IA:", error);
    throw error; // Repassa o erro para o chat.js mostrar na tela
  }
}

// Função vazia para evitar erros de importação em outros arquivos
export async function resumirConversa() { return ""; }