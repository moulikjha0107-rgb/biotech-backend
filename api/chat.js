import { OpenAI } from "openai";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowed." });
  }

  try {
    const { message } = req.body;

    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are the official chatbot for the fictional Biotech Business Conglomerate. Respond professionally."
        },
        { role: "user", content: message }
      ],
    });

    res.status(200).json({
      reply: response.choices[0].message.content
    });

  } catch (err) {
    res.status(500).json({ error: "Internal server error." });
  }
}
