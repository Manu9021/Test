const { OpenAI } = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Méthode non autorisée" });
  }

  const { message } = req.body;
  if (!message) {
    return res.status(400).json({ error: "Message manquant" });
  }

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "user", content: message }],
    });
    res.status(200).json({ reply: completion.choices[0].message.content });
  } catch (error) {
    console.error("Erreur OpenAI :", error);
    res.status(500).json({ error: "Erreur serveur OpenAI" });
  }
};