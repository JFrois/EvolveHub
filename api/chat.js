import { criarCliente, gerarResposta } from "./ai.js";

export default async function handler(request, response) {
  if (request.method !== "POST") return response.status(405).json({ error: "Method Not Allowed" });

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return response.status(500).json({ error: "Chave API não configurada na Vercel." });

  try {
    const { prompt } = request.body;
    const ai = await criarCliente();
    
    // Tenta gerar a resposta
    try {
        // Chama a função do arquivo ai.js
        const resposta = await gerarResposta(ai, [], prompt);
        return response.status(200).json({ text: resposta });

    } catch (modelError) {
        console.error("Erro no modelo:", modelError);
        
        // SE DER ERRO, TENTA DESCOBRIR O MOTIVO
        // Tenta listar os modelos disponíveis para essa chave
        try {
            // Correção para pegar o genAIInstance corretamente se ele for retornado direto ou encapsulado
            const genAI = ai; 
            // O método getGenerativeModel é do genAI, mas listModels não existe diretamente no SDK client
            // Para debug, vamos devolver o erro cru do Google para você ver na tela
            
            throw new Error(`O Google rejeitou o modelo. Erro original: ${modelError.message}`);
        } catch (listError) {
             throw listError;
        }
    }

  } catch (err) {
    console.error("Erro final:", err);
    // Isso vai mostrar na tarja vermelha o motivo exato (ex: "API Not Enabled")
    return response.status(500).json({ 
        error: `DIAGNÓSTICO: ${err.message}` 
    });
  }
}