/**
 * Envia um prompt para o *nosso* backend (Vercel Function),
 * que então chama o Gemini com segurança.
 */
export async function gerarRespostaIA(prompt) {
  if (!prompt) {
    throw new Error("O prompt não pode ser vazio.");
  }

  try {
    // 1. Chama a sua própria API (criada no Passo 1)
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      // 2. Envia apenas o prompt no corpo da requisição
      body: JSON.stringify({ prompt: prompt }),
    });

    // 3. Trata erros da sua própria API
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Falha ao receber dados da IA.');
    }

    // 4. Recebe a resposta e retorna o texto
    const data = await response.json();
    return data.text;

  } catch (err) {
    console.error("Erro ao chamar /api/chat:", err);
    throw new Error("Não foi possível conectar ao assistente de IA.");
  }
}

// A função 'resetChatSession' não é mais necessária aqui,
// pois cada chamada ao backend cria uma nova sessão.