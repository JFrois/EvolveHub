// src/services/api.js
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

    // Verifica se a resposta é JSON antes de tentar ler
    const contentType = response.headers.get("content-type");
    if (!response.ok) {
      if (contentType && contentType.includes("application/json")) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Erro do servidor: ${response.status}`);
      } else {
        // Se não for JSON (ex: erro 404 HTML ou 500 crash), lê como texto
        const errorText = await response.text();
        console.error("Erro não-JSON do servidor:", errorText);
        throw new Error(`Erro de conexão (${response.status}): Verifique os Logs da Vercel.`);
      }
    }

    const data = await response.json();
    return data.text;

  } catch (err) {
    console.error("Erro detalhado na API:", err);
    // Repassa a mensagem real do erro para a tela
    throw err;
  }
}