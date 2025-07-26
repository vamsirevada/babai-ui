// api/review-order/test.js - Test file to see if subdirectory works
export default async function handler(req, res) {
  console.log('🧪 TEST HANDLER IN REVIEW-ORDER SUBDIRECTORY CALLED!')
  console.log('URL:', req.url)

  res.setHeader('Access-Control-Allow-Origin', '*')
  res.json({
    message: 'Test endpoint in review-order subdirectory works!',
    url: req.url,
    method: req.method,
  })
}
