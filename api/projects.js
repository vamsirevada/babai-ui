// api/projects.js - Vercel serverless function
export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, OPTIONS'
  )
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')

  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }

  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }

  try {
    // Mock data for Vercel deployment
    const projects = [
      { id: 1, name: 'Residential Construction - Phase 1' },
      { id: 2, name: 'Residential Construction - Phase 2' },
      { id: 3, name: 'Commercial Building Project' },
      { id: 4, name: 'Infrastructure Development' },
    ]

    console.log('✅ Projects API called - returning mock data')
    res.status(200).json(projects)
  } catch (error) {
    console.error('❌ Projects API error:', error)
    res.status(500).json({
      error: 'Server error',
      details: error.message,
    })
  }
}
