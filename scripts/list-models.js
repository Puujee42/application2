
const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY || 'AIzaSyClJvjtJIpYOJRM3OX553VRkA7VK8OJy0k';

async function listModels() {
  const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${API_KEY}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    if (data.models) {
      console.log('Available models:');
      data.models.forEach(model => {
        if (model.supportedGenerationMethods.includes('generateContent')) {
           console.log(`- ${model.name} (${model.displayName})`);
        }
      });
    } else {
      console.error('No models found or error:', data);
    }
  } catch (error) {
    console.error('Error fetching models:', error);
  }
}

listModels();
