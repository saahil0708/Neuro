import dotenv from 'dotenv';
dotenv.config();
import { GoogleGenerativeAI } from "@google/generative-ai";

async function test() {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    console.log("Using API Key:", apiKey ? "FOUND" : "MISSING");
    
    if (!apiKey) return;

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const messages = [{ role: 'user', content: 'Hello' }];
    const systemPrompt = "You are NeuroBot, a specialized AI assistant.";
    let completePrompt = `${systemPrompt}\n\n`;
    messages.forEach((msg, i) => {
      completePrompt += `${msg.role === 'assistant' ? 'NeuroBot' : 'Patient'}: ${msg.content}\n`;
    });
    completePrompt += "NeuroBot: ";

    console.log("Sending Prompt...");
    const result = await model.generateContent(completePrompt);
    console.log("Result received.");
    const text = result.response.text();
    console.log("Reply:", text);
  } catch (error) {
    console.error("Gemini Error Details:");
    console.error("Name:", error.name);
    console.error("Message:", error.message);
    console.error("Stack:", error.stack);
    if (error.response) {
       console.error("Response data:", JSON.stringify(error.response, null, 2));
    }
  }
}

test();
