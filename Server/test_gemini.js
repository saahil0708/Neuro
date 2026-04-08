import dotenv from 'dotenv';
dotenv.config();

import { GoogleGenerativeAI } from "@google/generative-ai";

async function main() {
  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${process.env.GEMINI_API_KEY}`)
    const json = await res.json()
    console.log("AVAILABLE MODELS:");
    console.log(json.models?.map(m => m.name).join(", ") || json);
  } catch(e) {
    console.error("Error:", e);
  }
}
main();
