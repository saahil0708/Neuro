import { GoogleGenerativeAI } from "@google/generative-ai";

export const askChatbot = async (req, res) => {
  try {
    const { messages } = req.body;

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ error: "Gemini API key missing in Server/.env" });
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-3.1-flash-lite-preview" });

    const systemPrompt = "You are NeuroBot, a specialized AI assistant for the Neuro Sync rehabilitation platform. You help patients recovering from strokes or neurological conditions. Provide concise, helpful, and optimistic advice about physical and cognitive rehab. Important: Reply in the exact same language the user uses.";

    let completePrompt = `${systemPrompt}\n\n`;
    messages.forEach((msg, i) => {
      completePrompt += `${msg.role === 'assistant' ? 'NeuroBot' : 'Patient'}: ${msg.content}\n`;
    });
    completePrompt += "NeuroBot: ";

    const result = await model.generateContent(completePrompt);
    const text = result.response.text();

    res.json({ reply: text });
  } catch (error) {
    console.error("Gemini Error:", error.message);
    res.status(500).json({ error: "Failed to communicate with AI Assistant." });
  }
};
