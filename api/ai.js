// api/ai.js
import { GoogleGenAI } from "@google/genai";

try { import('dotenv').then(d => d.config()).catch(()=>{}) } catch(e){}

const ai = new GoogleGenAI({});

export async function criarCliente() {
  if (!process.env.GEMINI_API_KEY) throw new Error("Sem chave API");
  if (!genAIInstance) genAIInstance = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  return genAIInstance;
}

export async function gerarResposta(ai, historico, prompt) {
  // Tenta o modelo padrão 'gemini-pro'
  const model = ai.getGenerativeModel({ model: "gemini-3-pro-preview" });
  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
}

export async function resumirConversa() { return ""; }