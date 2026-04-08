import dotenv from 'dotenv';
dotenv.config();

import OpenAI from 'openai';

async function main() {
  console.log("Key starting with:", process.env.OPENAI_API_KEY?.substring(0, 5));
  try {
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: "Say 'Hello World'" }],
    });
    console.log("Success:", response.choices[0].message.content);
  } catch (error) {
    console.error("Error:", error);
  }
}
main();
