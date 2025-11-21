// ApiTesting.js
import 'dotenv/config';
import { GoogleGenerativeAI } from '@google/generative-ai';

console.log("raw env value:", JSON.stringify(process.env.GEMINI_API_KEY));
console.log("present?:", !!process.env.GEMINI_API_KEY);

async function run() {
  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const contents = [
      {
        parts: [
          { text: "SYSTEM: You are a professional security and code quality auditor specializing in Node.js and Express applications. Return strict JSON only." },
          { text: "USER: Analyze this variable declaration: var x = 1;" }
        ]
      }
    ];

    // Debug BEFORE calling the SDK
    console.log("DEBUG: contents type:", typeof contents, Array.isArray(contents));
    console.log("DEBUG: contents preview:", JSON.stringify(contents, null, 2));

    // If your SDK expects `contents` (not `messages`)
    const result = await model.generateContent({ contents });

    let rawText;
    if (result?.response?.text) rawText = result.response.text();
    else if (result?.output?.text) rawText = result.output.text;
    else rawText = JSON.stringify(result);

    console.log("AI RAW RESPONSE:", rawText);
    return res.json({ ok: true, raw: rawText });
  } catch (err) {
    console.error("AI TEST ERROR:", err);
    return res.status(500).json({ ok: false, error: String(err) });
  }
}

run();
