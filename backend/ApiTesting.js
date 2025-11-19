// ApiTesting.js
import 'dotenv/config';
import { GoogleGenerativeAI } from '@google/generative-ai';

console.log("KEY present?:", !!process.env.GEMINI_API_KEY);

async function run() {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" }); // <- updated
    const res = await model.generateContent("Say: Hello from Gemini 2.5 Flash.");
    console.log("Raw response:", res);
    if (res?.response?.text) {
      console.log("Text:", res.response.text());
    } else {
      console.log("Check raw response above for output structure.");
    }
  } catch (err) {
    console.error("API call failed:", err);
  }
}

run();
