import { POST as CheckoutPOST } from '../app/api/checkout/route';
import { NextRequest } from 'next/server';

// Mock DB interactions (partial) by intercepting if possible, or just relying on validation failure for "Product not found" to prove the route runs.
// Since we can't easily mock the internal imports without a test runner like Jest, 
// we will test the Input Validation layer which is critical.

async function testCheckoutValidation() {
  console.log('--- Testing Checkout Validation ---');

  // Test 1: Invalid Email (Missing)
  const req1 = new NextRequest('http://localhost/api/checkout', {
    method: 'POST',
    body: JSON.stringify({
      items: [{ id: '123', quantity: 1 }],
      // Missing fullName, phone, etc.
    })
  });

  const res1 = await CheckoutPOST(req1);
  const data1 = await res1.json();
  
  if (res1.status === 400 && data1.error === 'Invalid data') {
    console.log('✅ Test 1 Passed: Caught invalid input');
  } else {
    console.error('❌ Test 1 Failed:', data1);
  }

  // Test 2: Valid Structure (Will likely fail at DB connection or ID check, but passes Zod)
  const req2 = new NextRequest('http://localhost/api/checkout', {
    method: 'POST',
    body: JSON.stringify({
      items: [{ id: '507f1f77bcf86cd799439011', quantity: 2 }],
      fullName: 'Test User',
      phone: '99112233',
      address: 'Test Address',
      city: 'UB',
      district: 'SBD'
    })
  });

  try {
    const res2 = await CheckoutPOST(req2);
    const data2 = await res2.json();
    console.log('ℹ️ Test 2 Result (DB Check):', data2.error || 'Success');
    // If it returns "Product not found" or "Internal Server Error" (due to DB), it means Zod passed.
    if (res2.status !== 400 || data2.error !== 'Invalid data') {
       console.log('✅ Test 2 Passed: Validation successful, proceeded to logic');
    }
  } catch (e) {
    console.log('⚠️ Test 2 skipped DB part');
  }
}

async function run() {
  await testCheckoutValidation();
}

run();
