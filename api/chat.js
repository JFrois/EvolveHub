import fs from "fs";
import path from "path";
// Ajuste de importação: agora estão na mesma pasta
import { criarCliente, resumirConversa, gerarResposta } from "./ai.js";

// ===========================================================
// AJUSTE PARA VERCEL: Usar pasta /tmp em produção
// ===========================================================
const isProduction = process.env.NODE_ENV === 'production';
// Na Vercel Serverless, apenas /tmp é gravável
const baseDir = isProduction ? '/tmp' : path.join(process.cwd(), 'data');

const historyPath = path.join(baseDir, "history.json");
const summaryPath = path.join(baseDir, "summary.txt");

const SYSTEM_INSTRUCTION = `
Você é uma IA de auxílio de uma plataforma de desenvolvimento pessoal.
Responda de forma objetiva, gentil e positiva em Português (PT-BR).
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
  try {
    if (!fs.existsSync(baseDir)) fs.mkdirSync(baseDir, { recursive: true });
    fs.writeFileSync(historyPath, JSON.stringify(hist, null, 2), "utf8");
  } catch (err) {
    console.error("Aviso: Não foi possível salvar o histórico.", err);
  }
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
  try {
    if (!fs.existsSync(baseDir)) fs.mkdirSync(baseDir, { recursive: true });
    fs.writeFileSync(summaryPath, texto, "utf8");
  } catch (err) {
    console.error("Aviso: Não foi possível salvar o resumo.", err);
  }
}

export default async function handler(request, response) {
  if (request.method !== "POST") {
    return response.status(405).json({ error: "Method Not Allowed" });
  }

  if (!process.env.GEMINI_API_KEY) {
    return response.status(500).json({ error: "Configuração de API Key ausente" });
  }

  try {
    const { prompt } = request.body;
    if (!prompt) return response.status(400).json({ error: "O prompt é obrigatório" });

    const ai = await criarCliente();

    let historico = carregarHistorico();
    let resumo = carregarResumo();

    const dadosParaIA = {
      user_profile: { nickname: "Usuário", country: "Brazil" }
    };

    const memoriaCurtoPrazo = historico.slice(-6)
      .map(msg => `${msg.role.toUpperCase()}: ${msg.content}`)
      .join("\n");

    const promptCompleto = `
${SYSTEM_INSTRUCTION}
DADOS: ${JSON.stringify(dadosParaIA)}
RESUMO: ${resumo}
HISTÓRICO: ${memoriaCurtoPrazo}
USUÁRIO: ${prompt}
`;

    const resposta = await gerarResposta(ai, historico, promptCompleto);

    historico.push({ role: "user", content: prompt });
    historico.push({ role: "assistant", content: resposta });

    // Tenta resumir se ficar muito longo
    if (historico.length > 12) {
      try {
        const novoResumo = await resumirConversa(ai, historico);
        salvarResumo(novoResumo);
        historico = historico.slice(-6);
      } catch (e) { console.log("Erro resumo", e); }
    }

    salvarHistorico(historico);

    return response.status(200).json({ text: resposta });

  } catch (err) {
    console.error("Erro na API:", err);
    return response.status(500).json({ error: "Erro interno na IA." });
  }
}