import fs from "fs";
import path from "path";
import { criarCliente, resumirConversa, gerarResposta } from "../helper/ai.js";

const historyPath = path.join(process.cwd(), "data", "history.json");
const summaryPath = path.join(process.cwd(), "data", "summary.txt");

const SYSTEM_INSTRUCTION = `
Você é uma IA de auxílio de uma plataforma de desenvolvimento pessoal
focada em organizar e melhorar a produtividade do usuário.
Responda de forma objetiva, gentil e positiva.
Use APENAS hífen (-) para listas. Nunca use marcadores duplos.
Responda apenas em português (PT-BR).
`;

function carregarHistorico() {
  try {
    if (!fs.existsSync(historyPath)) return [];
    return JSON.parse(fs.readFileSync(historyPath, "utf8"));
  } catch {
    return [];
  }
}

function salvarHistorico(hist) {
  const dir = path.dirname(historyPath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(historyPath, JSON.stringify(hist, null, 2), "utf8");
}

function carregarResumo() {
  try {
    if (!fs.existsSync(summaryPath)) return "";
    return fs.readFileSync(summaryPath, "utf8");
  } catch {
    return "";
  }
}

function salvarResumo(texto) {
  const dir = path.dirname(summaryPath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(summaryPath, texto, "utf8");
}

export default async function handler(request, response) {
  if (request.method !== "POST") {
    return response.status(405).json({ error: "Method Not Allowed" });
  }

  if (!process.env.GEMINI_API_KEY) {
    return response.status(500).json({ error: "Configuração faltando no servidor" });
  }

  try {
    const { prompt } = request.body;
    if (!prompt) return response.status(400).json({ error: "O prompt é obrigatório" });

    const ai = await criarCliente();

    let historico = carregarHistorico();
    let resumo = carregarResumo();

    const dadosParaIA = {
      user_profile: { nickname: "Alexa", country: "Brazil" },
      user_skills_progress: [
        { skill_name: "Fundamentos de UX", status: "Completo" },
        { skill_name: "React Básico", status: "Em Progresso" }
      ]
    };

    const memoriaCurtoPrazo = historico.slice(-6)
      .map(msg => `${msg.role.toUpperCase()}: ${msg.content}`)
      .join("\n");

    const promptCompleto = `
${SYSTEM_INSTRUCTION}

DADOS DO USUÁRIO:
${JSON.stringify(dadosParaIA, null, 2)}

RESUMO (MEMÓRIA LONGA):
${resumo || "(Ainda não há resumo consolidado)"}

HISTÓRICO RECENTE (MEMÓRIA CURTA):
${memoriaCurtoPrazo || "(Início da conversa)"}

PERGUNTA ATUAL DO USUÁRIO:
${prompt}
`;

    const resposta = await gerarResposta(ai, historico, promptCompleto);

    historico.push({ role: "user", content: prompt });
    historico.push({ role: "assistant", content: resposta });

    if (historico.length > 12) {
      const novoResumo = await resumirConversa(ai, historico);
      salvarResumo(novoResumo);
      historico = historico.slice(-6);
    }

    salvarHistorico(historico);

    return response.status(200).json({ text: resposta });

  } catch (err) {
    console.error("Erro na API /api/chat:", err);
    return response.status(500).json({ error: "Falha ao comunicar com a IA." });
  }
}