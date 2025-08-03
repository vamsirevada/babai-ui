// api/review-order.js - Fallback for direct review-order calls
import { Pool } from 'pg'

// Create a connection pool
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT || 5432,
  ssl: {
    rejectUnauthorized: false, // More permissive for AWS RDS
  },
  connectionTimeoutMillis: 10000, // 10 second timeout
})

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

  // Get ID from query parameter (?id=1) or from path parsing
  const { id } = req.query
  console.log('Extracted ID from query:', id)

  try {
    if (id) {
      // Query the database for order items by ID
      const result = await pool.query(
        'SELECT * FROM material_request_items WHERE material_request_id = $1',
        [id]
      )

      console.log(
        `✅ Database query successful for order ${id}, found ${result.rows.length} items`
      )
      res.status(200).json(result.rows)
    } else {
      // Query all order items if no ID provided
      const result = await pool.query(
        'SELECT * FROM order_items ORDER BY request_id DESC, id'
      )

      console.log(
        `✅ Database query successful, found ${result.rows.length} total items`
      )
      res.status(200).json(result.rows)
    }
  } catch (error) {
    console.error('❌ Database error in review Order fallback API:', error)
    res.status(500).json({
      error: 'Server error',
      details: error.message,
    })
  }
}
