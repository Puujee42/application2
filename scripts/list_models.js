const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

// Load .env.local manually since dotenv.config() defaults to .env
const envLocalPath = path.resolve(process.cwd(), '.env.local');
if (fs.existsSync(envLocalPath)) {
    const envConfig = dotenv.parse(fs.readFileSync(envLocalPath));
    for (const k in envConfig) {
        process.env[k] = envConfig[k];
    }
    console.log('Loaded .env.local');
} else {
    dotenv.config();
    console.log('Loaded .env (or default)');
}

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY);

async function listModels() {
  try {
    // Try to list models using the API if possible, otherwise test candidates
    // The SDK might not expose listModels directly on the client, but let's try.
    // Actually, checking candidates is safer for now.
    
    const candidates = [
        "gemini-1.5-flash",
        "gemini-1.5-flash-latest",
        "gemini-1.5-flash-001",
        "gemini-1.5-flash-002",
        "gemini-1.5-pro",
        "gemini-1.5-pro-latest",
        "gemini-1.0-pro",
        "gemini-pro",
        "gemini-2.0-flash-exp",
        "gemini-2.0-flash",
        "gemini-2.5-flash"
    ];

    console.log("Testing models with API Key ending in ...", process.env.GOOGLE_GENERATIVE_AI_API_KEY ? process.env.GOOGLE_GENERATIVE_AI_API_KEY.slice(-4) : 'NONE');
    
    for (const modelName of candidates) {
        try {
            const m = genAI.getGenerativeModel({ model: modelName });
            const result = await m.generateContent("Hello");
            console.log(`✅ ${modelName} is available.`);
        } catch (error) {
            let msg = error.message;
            if (msg.includes('404')) msg = '404 Not Found';
            else if (msg.includes('400')) msg = '400 Bad Request (API Key?)';
            else if (msg.includes('429')) msg = '429 Quota Exceeded';
            console.log(`❌ ${modelName} failed: ${msg}`);
        }
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

listModels();
