export default async function handler(req, res) {
  // Impede que acessem a URL via navegador (apenas POST permitido)
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  try {
    // Busca a URL que você salvou no painel da Vercel
    const WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL;

    if (!WEBHOOK_URL) {
      return res.status(500).json({ error: "Configuração do Webhook ausente" });
    }

    // Repassa os dados (imagem e texto) para o Discord
    const response = await fetch(WEBHOOK_URL, {
      method: "POST",
      body: req.body,
    });

    if (response.ok) {
      return res.status(200).json({ message: "Enviado com sucesso!" });
    } else {
      const errorText = await response.text();
      return res
        .status(500)
        .json({ error: "Erro no Discord", details: errorText });
    }
  } catch (error) {
    return res.status(500).json({ error: "Erro interno no servidor" });
  }
}
