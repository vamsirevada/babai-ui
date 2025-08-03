// api/review-order.js - Fallback for direct review-order calls
export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')

  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }

  // Extract ID from URL path
  const urlPath = req.url || ''
  const idMatch = urlPath.match(/\/review-order\/([^?]+)/)
  const id = idMatch ? idMatch[1] : req.query.id

  console.log('✅ Review Order fallback API called with URL:', urlPath, 'ID:', id)

  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }

  try {
    // Mock data for the review order
    const mockOrderData = [
      {
        id: 1,
        material_name: "Cement",
        sub_type: "OPC 53 Grade",
        dimensions: "50kg bags",
        quantity: 10,
        unit_price: 350
      },
      {
        id: 2,
        material_name: "Steel TMT Bars",
        sub_type: "Fe500D",
        dimensions: "12mm x 12m",
        quantity: 25,
        unit_price: 65
      },
      {
        id: 3,
        material_name: "Bricks",
        sub_type: "Red Clay Bricks",
        dimensions: "Standard size",
        quantity: 1000,
        unit_price: 8
      }
    ]

    res.status(200).json(mockOrderData)
  } catch (error) {
    console.error('❌ Review Order fallback API error:', error)
    res.status(500).json({
      error: 'Server error',
      details: error.message,
    })
  }
}
