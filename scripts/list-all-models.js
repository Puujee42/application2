
const https = require('https');
require('dotenv').config({ path: '.env.local' });

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

if (!apiKey) {
  console.error('API Key not found!');
  process.exit(1);
}

const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;

https.get(url, (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    try {
      const parsed = JSON.parse(data);
      if (parsed.error) {
        console.error('API Error:', parsed.error);
      } else if (parsed.models) {
        console.log('Available Models:');
        parsed.models.forEach(m => console.log(`- ${m.name} (${m.version}) [${m.supportedGenerationMethods.join(', ')}]`));
      } else {
        console.log('Unexpected response:', parsed);
      }
    } catch (e) {
      console.error('Parse error:', e);
      console.log('Raw data:', data);
    }
  });
}).on('error', (e) => {
  console.error('Request error:', e);
});
