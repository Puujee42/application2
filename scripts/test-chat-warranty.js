
async function testWarranty() {
  console.log('Testing Chat API Warranty Response...');
  try {
    const response = await fetch('http://localhost:3000/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messages: [{ role: 'user', content: 'Танай бараа баталгаатай юу?' }]
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    console.log('Chat API Status: OK (200)');
    
    // Check if response is stream or text. The current implementation uses streamText.
    // We can just print the text.
    const text = await response.text();
    console.log('Response:', text);

    if (text.includes('баталгаа өгдөггүй') || text.includes('баталгаат хугацаа олгодоггүй')) {
        console.log('PASS: Warranty instruction followed.');
    } else {
        console.log('WARNING: Warranty instruction might not be followed exactly.');
    }

  } catch (error) {
    console.error('Test failed:', error);
  }
}

testWarranty();
