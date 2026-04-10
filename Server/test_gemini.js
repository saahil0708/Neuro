import dotenv from 'dotenv';
dotenv.config();
import { GoogleGenerativeAI } from "@google/generative-ai";

async function main() {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.error("API Key missing");
      return;
    }
    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`)
    const json = await res.json()
    console.log("AVAILABLE MODELS:");
    if (json.models) {
      console.log(json.models.map(m => m.name).join("\n"));
    } else {
      console.log(JSON.stringify(json, null, 2));
    }
  } catch(e) {
    console.error("Error:", e);
  }
}
main();
