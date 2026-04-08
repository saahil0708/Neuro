import dotenv from 'dotenv';
dotenv.config();

async function main() {
  const res = await fetch('https://generativelanguage.googleapis.com/v1beta/models?key=' + process.env.GEMINI_API_KEY);
  const data = await res.json();
  const models = data.models.filter(m => m.supportedGenerationMethods.includes('generateContent'));
  console.log("Valid Models for generateContent:");
  console.log(models.map(m => m.name).join("\n"));
}
main();
