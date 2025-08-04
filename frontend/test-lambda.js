// Quick test for your Lambda API
const LAMBDA_URL =
  'https://xu6bjzx45vbot3gwmqfn5f3e3m0ufkma.lambda-url.us-east-1.on.aws'

// Test the health endpoint
fetch(`${LAMBDA_URL}/health`)
  .then((response) => response.json())
  .then((data) => {
    console.log('✅ Lambda API Health Check:', data)
  })
  .catch((error) => {
    console.error('❌ Lambda API Error:', error)
  })

// Test the root endpoint
fetch(`${LAMBDA_URL}/`)
  .then((response) => response.json())
  .then((data) => {
    console.log('✅ Lambda API Root:', data)
  })
  .catch((error) => {
    console.error('❌ Lambda API Error:', error)
  })
