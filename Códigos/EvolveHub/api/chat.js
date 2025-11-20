import fs from "fs";
import path from "path";
import { criarCliente, resumirConversa, gerarResposta } from "../helper/ai.js";

// ===========================================================
// AJUSTE PARA VERCEL: Usar pasta /tmp em produção
// ===========================================================
const isProduction = process.env.NODE_ENV === 'production';
const baseDir = isProduction ? '/tmp' : path.join(process.cwd(), 'data');

const historyPath = path.join(baseDir, "history.json");
const summaryPath = path.join(baseDir, "summary.txt");

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
  try {
    // Garante que o diretório existe (seja /tmp ou /data)
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
  // CORS e Verificação de Método
  if (request.method !== "POST") {
    return response.status(405).json({ error: "Method Not Allowed" });
  }

  if (!process.env.GEMINI_API_KEY) {
    return response.status(500).json({ error: "Configuração de API Key ausente no servidor" });
  }

  try {
    const { prompt } = request.body;
    if (!prompt) return response.status(400).json({ error: "O prompt é obrigatório" });

    const ai = await criarCliente();

    // Carrega memória (Do disco local ou do /tmp na Vercel)
    let historico = carregarHistorico();
    let resumo = carregarResumo();

    const dadosParaIA = {
      user_profile: { nickname: "Alexa", country: "Brazil" },
      user_skills_progress: [
        { skill_name: "Fundamentos de UX", status: "Completo" },
        { skill_name: "React Básico", status: "Em Progresso" }
      ]
    };

    // Pega as últimas mensagens
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

    // Gera a resposta
    const resposta = await gerarResposta(ai, historico, promptCompleto);

    // Atualiza memória
    historico.push({ role: "user", content: prompt });
    historico.push({ role: "assistant", content: resposta });

    // Resumo automático
    if (historico.length > 12) {
      // Faz o resumo em background para não travar a resposta
      // (Na Vercel Serverless isso pode ser cortado, mas tentamos)
      try {
        const novoResumo = await resumirConversa(ai, historico);
        salvarResumo(novoResumo);
        historico = historico.slice(-6);
      } catch (e) {
        console.log("Erro ao gerar resumo automático:", e);
      }
    }

    salvarHistorico(historico);

    return response.status(200).json({ text: resposta });

  } catch (err) {
    console.error("Erro na API /api/chat:", err);
    // Retorna 200 com mensagem de erro amigável para não quebrar o front
    return response.status(500).json({ error: "Ocorreu um erro ao processar sua mensagem." });
  }
}