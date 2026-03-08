
const { Readable } = require('stream');

async function testChat() {
  console.log('Testing Chat API...');
  try {
    const response = await fetch('http://localhost:3001/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messages: [{ role: 'user', content: 'Sony камер хайж байна' }]
      })
    });

    if (!response.ok) {
      console.error('Chat API Error Status:', response.status);
      const text = await response.text();
      console.error('Error Body:', text);
      return;
    }

    console.log('Chat API Status: OK (200)');
    
    // Read stream
    if (!response.body) {
        console.error('No response body');
        return;
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let fullText = '';
    
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      const chunk = decoder.decode(value, { stream: true });
      process.stdout.write(chunk); // Stream to console
      fullText += chunk;
    }
    console.log('\n\nStream test passed. Full response received.');

  } catch (error) {
    console.error('Test Failed:', error);
  }
}

testChat();
