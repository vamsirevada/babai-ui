import express from 'express'
import cors from 'cors'
import pkg from 'pg'
import dotenv from 'dotenv'

dotenv.config()

const { Pool } = pkg

const app = express()

// Production-ready CORS configuration
const allowedOrigins = [
  'https://main.d3u6tp5amhwi3s.amplifyapp.com',
  'https://bab-ai.com',
  'https://www.bab-ai.com',
  'http://bab-ai.com',
  'http://www.bab-ai.com',
  'http://localhost:8080', // for local development
  'http://localhost:3000', // for local development
]

const corsOptions = {
  origin: (origin, callback) => {
    console.log('🌐 CORS Check - Origin:', origin)
    console.log('🌐 Allowed Origins:', allowedOrigins)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true)
    } else {
      console.log('❌ CORS Rejected:', origin)
      callback(new Error('Not allowed by CORS'))
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'X-Requested-With',
    'Accept',
    'Origin',
  ],
  credentials: false,
  optionsSuccessStatus: 200,
}

app.use(cors(corsOptions))
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))

// Lazy database connection for Lambda compatibility
let pool = null

const getDbConnection = () => {
  if (!pool) {
    pool = new Pool({
      user: process.env.DB_USER,
      host: process.env.DB_HOST,
      database: process.env.DB_DATABASE,
      password: process.env.DB_PASSWORD,
      port: process.env.DB_PORT || 5432,
      ssl: {
        rejectUnauthorized: false,
      },
      max: 20,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 2000,
    })
  }
  return pool
}

app.get('/', (req, res) => {
  res.json({
    status: 'OK',
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
  })
})

app.get('/health', async (req, res) => {
  try {
    const dbPool = getDbConnection()
    const client = await dbPool.connect()
    await client.query('SELECT 1')
    client.release()

    res.json({
      status: 'healthy',
      database: 'connected',
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error('Health check failed:', error)
    res.status(503).json({
      status: 'unhealthy',
      database: 'disconnected',
      error: 'Database connection failed',
      timestamp: new Date().toISOString(),
    })
  }
})

app.get('/projects', async (req, res) => {
  try {
    const dbPool = getDbConnection()
    const result = await dbPool.query('SELECT id, name FROM projects')
    res.json(result.rows)
  } catch (error) {
    console.error('Database error:', error)
    res.status(500).json({
      error: 'Failed to fetch projects',
      message:
        process.env.NODE_ENV === 'development'
          ? error.message
          : 'Internal server error',
    })
  }
})

app.get('/inventory', async (req, res) => {
  try {
    const dbPool = getDbConnection()
    const result = await dbPool.query('SELECT * FROM inventory ORDER BY id')
    res.json(result.rows)
  } catch (error) {
    console.error('Database error:', error)
    res.status(500).json({
      error: 'Failed to fetch inventory',
      message:
        process.env.NODE_ENV === 'development'
          ? error.message
          : 'Internal server error',
    })
  }
})

app.get('/items', async (req, res) => {
  try {
    const dbPool = getDbConnection()
    const result = await dbPool.query(
      'SELECT * FROM material_request_items ORDER BY id'
    )
    res.json(result.rows)
  } catch (error) {
    console.error('Database error:', error)
    res.status(500).json({
      error: 'Failed to fetch items',
      message:
        process.env.NODE_ENV === 'development'
          ? error.message
          : 'Internal server error',
    })
  }
})

app.get('/review-order/:id', async (req, res) => {
  try {
    const { id } = req.params

    // Validate ID parameter
    if (!id) {
      return res.status(400).json({
        error: 'Invalid ID parameter',
        message: 'ID is required',
      })
    }

    // Check if it's a valid UUID format or number
    const isUUID =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id)
    const isNumeric = !isNaN(parseInt(id)) && isFinite(id)

    if (!isUUID && !isNumeric) {
      return res.status(400).json({
        error: 'Invalid ID parameter',
        message: 'ID must be a valid number or UUID',
      })
    }

    const dbPool = getDbConnection()

    let result
    if (isUUID) {
      // If it's a UUID, search by material_request_uuid or similar field
      result = await dbPool.query(
        'SELECT * FROM material_request_items WHERE material_request_id = $1 ORDER BY id',
        [id]
      )
    } else {
      // If it's numeric, use the original query
      result = await dbPool.query(
        'SELECT * FROM material_request_items WHERE material_request_id = $1 ORDER BY id',
        [parseInt(id)]
      )
    }

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: 'Review order not found',
        id: id,
      })
    }

    res.json(result.rows)
  } catch (error) {
    console.error('Error in /review-order/:id:', error)
    res.status(500).json({
      error: 'Failed to fetch review order',
      message:
        process.env.NODE_ENV === 'development'
          ? error.message
          : 'Internal server error',
    })
  }
})

// Add this temporary debug route
app.get('/debug/table-schema', async (req, res) => {
  try {
    const dbPool = getDbConnection()

    // Get table schema info
    const result = await dbPool.query(`
      SELECT column_name, data_type, is_nullable
      FROM information_schema.columns
      WHERE table_name = 'material_request_items'
      ORDER BY ordinal_position
    `)

    res.json({
      table: 'material_request_items',
      columns: result.rows,
    })
  } catch (error) {
    console.error('Schema debug error:', error)
    res.status(500).json({
      error: 'Failed to get schema info',
      message: error.message,
    })
  }
})

app.post('/submit-order', async (req, res) => {
  try {
    const orderData = req.body

    // Basic validation
    if (!orderData || Object.keys(orderData).length === 0) {
      return res.status(400).json({
        error: 'Invalid order data',
        message: 'Order data is required',
      })
    }

    // TODO: Implement actual order submission to database
    console.log('Order received:', orderData)

    // For now, just return success
    res.json({
      success: true,
      message: 'Order submitted successfully',
      orderId: `ORD-${Date.now()}`,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error('Error submitting order:', error)
    res.status(500).json({
      error: 'Failed to submit order',
      message:
        process.env.NODE_ENV === 'development'
          ? error.message
          : 'Internal server error',
    })
  }
})

app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Route not found',
    message: `${req.method} ${req.originalUrl} not found`,
    timestamp: new Date().toISOString(),
  })
})

app.use((error, req, res, next) => {
  console.error('Unhandled error:', error)
  res.status(500).json({
    error: 'Internal server error',
    message:
      process.env.NODE_ENV === 'development'
        ? error.message
        : 'Something went wrong',
    timestamp: new Date().toISOString(),
  })
})

// Start server only when not in Lambda environment
const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`)
  console.log(`📊 Health check: http://localhost:${PORT}/health`)
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`)
})
