export async function gerarRespostaIA(prompt) {
  if (!prompt) {
    throw new Error("O prompt não pode ser vazio.");
  }

  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt: prompt }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Falha ao receber dados da IA.');
    }

    const data = await response.json();
    return data.text;

  } catch (err) {
    console.error("Erro ao chamar /api/chat:", err);
    throw new Error("Não foi possível conectar ao assistente de IA.");
  }
}
