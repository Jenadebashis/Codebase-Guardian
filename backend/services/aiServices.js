// ApiTesting.js
import 'dotenv/config';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { createScan } from '../controllers/scanController.js'; // make sure path & extension are correct

async function runSecurityAudit(codeSource) {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error("Missing GEMINI_API_KEY in environment");
  }

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  const systemInstruction = `
You are a Node.js/Express Security Expert.
Your output must be ONLY a valid JSON object.

Rules:
- Do NOT output markdown, code fences, or prose.
- Do NOT wrap JSON in \`\`\`.
- Return exactly one JSON object.

Your responsibilities:
1. Identify vulnerabilities in the provided code based on the OWASP Top 10.
2. Suggest best-practice refactoring for each issue.
3. Include severity, impact, and likelihood ratings.
4. Use this strict JSON format:

{
  "summary": {
    "overview": "",
    "risk_level": "",
    "key_findings_count": 0
  },
  "issues": [
    {
      "id": "",
      "title": "",
      "owasp_category": "",
      "location": {
        "file": "",
        "function": "",
        "line_range": ""
      },
      "description": "",
      "impact": "",
      "likelihood": "",
      "severity": "",
      "evidence": "",
      "recommendation": ""
    }
  ],
  "refactor_plan": {
    "strategy": "",
    "steps": [""],
    "code_examples": [
      {
        "description": "",
        "before": "",
        "after": ""
      }
    ]
  },
  "assumptions": [],
  "notes": []
}
`;

  // Normalize the input: function -> string, anything else -> String(...)
  const codeSnippet =
    typeof codeSource === 'function' ? codeSource.toString() : String(codeSource);

  const contents = [
    {
      parts: [
        { text: `SYSTEM: ${systemInstruction}` },
        { text: `USER: Analyze this code:\n${codeSnippet}` }
      ]
    }
  ];

  const result = await model.generateContent({ contents });
  const rawText = result?.response?.text?.() || JSON.stringify(result);

  try {
    const parsed = JSON.parse(rawText);
    console.log("✅ JSON parsed successfully.");
    console.dir(parsed, { depth: null });
    return parsed;
  } catch (err) {
    console.error("❌ Invalid JSON output from model:");
    console.error(rawText);
    console.error("Parse error:", err.message);
    return null;
  }
}

// Example: analyze the imported controller function
runSecurityAudit(createScan).catch(console.error);

// Also export it so you can use it elsewhere (e.g. in routes, CLI, tests)
export { runSecurityAudit };