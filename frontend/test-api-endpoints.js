// Quick test script for API endpoints with /api prefix
const LAMBDA_URL = 'https://xu6bjzx45vbot3gwmqfn5f3e3m0ufkma.lambda-url.us-east-1.on.aws'

async function testEndpoint(endpoint, method = 'GET') {
  const url = `${LAMBDA_URL}${endpoint}`
  console.log(`🧪 Testing: ${method} ${url}`)
  
  try {
    const response = await fetch(url, { method })
    const data = await response.json()
    console.log(`✅ Success:`, data)
    return { success: true, data }
  } catch (error) {
    console.log(`❌ Error:`, error.message)
    return { success: false, error: error.message }
  }
}

async function runTests() {
  console.log('🚀 Testing Lambda API endpoints...\n')
  
  // Test root endpoint (should work)
  await testEndpoint('/')
  console.log('')
  
  // Test API endpoints
  await testEndpoint('/api/health')
  console.log('')
  
  await testEndpoint('/api/projects')
  console.log('')
  
  console.log('✨ Test completed!')
}

// Run in browser console:
// copy this entire script, paste in browser console, then run: runTests()
console.log('📋 Copy this script to browser console and run: runTests()')
