// backend/services/aiServices.js
import 'dotenv/config';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { hashPassword, executeCode, getWeatherData, getUser } from '../tests/vulnerable-code.js';

async function scanCode(codeSource) {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error("Missing GEMINI_API_KEY in environment");
  }

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

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
`;

  const responseSchema = {
    "type": "object",
    "properties": {
      "summary": {
        "type": "object",
        "properties": {
          "overview": { "type": "string" },
          "risk_level": { "type": "string" },
          "key_findings_count": { "type": "integer" }
        },
        "required": ["overview", "risk_level", "key_findings_count"]
      },
      "issues": {
        "type": "array",
        "items": {
          "type": "object",
          "properties": {
            "id": { "type": "string" },
            "title": { "type": "string" },
            "owasp_category": { "type": "string" },
            "location": {
              "type": "object",
              "properties": {
                "file": { "type": "string" },
                "function": { "type": "string" },
                "line_range": { "type": "string" }
              },
              "required": ["file", "function", "line_range"]
            },
            "description": { "type": "string" },
            "impact": { "type": "string" },
            "likelihood": { "type": "string" },
            "severity": { "type": "string" },
            "evidence": { "type": "string" },
            "recommendation": { "type": "string" }
          },
          "required": ["id", "title", "owasp_category", "location", "description", "impact", "likelihood", "severity", "evidence", "recommendation"]
        }
      },
      "refactor_plan": {
        "type": "object",
        "properties": {
          "strategy": { "type": "string" },
          "steps": {
            "type": "array",
            "items": { "type": "string" }
          },
          "code_examples": {
            "type": "array",
            "items": {
              "type": "object",
              "properties": {
                "description": { "type": "string" },
                "before": { "type": "string" },
                "after": { "type": "string" }
              },
              "required": ["description", "before", "after"]
            }
          }
        },
        "required": ["strategy", "steps", "code_examples"]
      },
      "assumptions": {
        "type": "array",
        "items": { "type": "string" }
      },
      "notes": {
        "type": "array",
        "items": { "type": "string" }
      }
    },
    "required": ["summary", "issues", "refactor_plan", "assumptions", "notes"]
  };

  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
    generationConfig: {
        responseMimeType: "application/json",
        responseSchema: responseSchema
    }
  });


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

async function runTests() {
    console.log('--- Testing hashPassword ---');
    await scanCode(hashPassword);
  
    console.log('--- Testing executeCode ---');
    await scanCode(executeCode);
  
    console.log('--- Testing getWeatherData ---');
    await scanCode(getWeatherData);

    console.log('--- Testing getUser ---');
    await scanCode(getUser('devash'));
  
  }
  
runTests().catch(console.error);


// Also export it so you can use it elsewhere (e.g. in routes, CLI, tests)
export { scanCode };
