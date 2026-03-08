
async function testChatActions() {
  console.log('Testing Chat Actions...');

  async function send(message) {
      console.log(`\nUser: "${message}"`);
      const response = await fetch('http://localhost:3000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [{ role: 'user', content: message }]
        })
      });
      const text = await response.text();
      console.log('AI Response:', text);
      return text;
  }

  // Test 1: Navigation
  const navResponse = await send('Миний захиалга хаана байна?');
  if (navResponse.includes('[ACTION:NAVIGATE:') && navResponse.includes(':END_ACTION]')) {
      console.log('PASS: Navigation action detected.');
  } else {
      console.log('FAIL: Navigation action missing.');
  }

  await new Promise(resolve => setTimeout(resolve, 5000)); // Wait 5s to avoid rate limits

  // Test 2: Inventory
  const invResponse = await send('Sony камер хэд үлдсэн бэ?');
  if (invResponse.includes('Inventory Status') || invResponse.includes('units available') || invResponse.includes('ширхэг')) {
       console.log('PASS: Inventory check seems to work.');
  } else {
       console.log('WARNING: Inventory check specific phrase missing, but might be conversational.');
  }

  await new Promise(resolve => setTimeout(resolve, 5000)); // Wait 5s to avoid rate limits

  // Test 3: Add to Cart
  // Need a valid product name. "Sony" usually works if seeded.
  const cartResponse = await send('Sony a7iii камер сагсанд хийе');
  if (cartResponse.includes('[ACTION:ADD_TO_CART_DATA:') && cartResponse.includes(':END_ACTION]')) {
      console.log('PASS: Add to Cart action detected.');
  } else {
      console.log('FAIL: Add to Cart action missing.');
  }
}

testChatActions();
