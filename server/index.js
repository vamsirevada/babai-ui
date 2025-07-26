import express from 'express'
import cors from 'cors'
import pkg from 'pg'
import dotenv from 'dotenv'

dotenv.config()

const { Pool } = pkg

const app = express()
app.use(cors())
app.use(express.json())

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  ssl: {
    rejectUnauthorized: process.env.NODE_ENV === 'production',
  },
})

// This async function will try to connect to the database.
const checkDbConnection = async () => {
  try {
    const client = await pool.connect()
    // If the connection is successful, it will log this message.
    console.log('✅ Successfully connected to the database!')
    client.release() // It's important to release the client back to the pool.
  } catch (error) {
    // If there is an error, it will log the error message.
    console.error('❌ Error connecting to the database:', error.stack)
  }
}

// Call the function right after initializing the pool.
checkDbConnection()
// --- END: Database Connection Check ---

app.get('/projects', async (req, res) => {
  try {
    const result = await pool.query('SELECT id, name FROM projects')
    res.json(result.rows)
  } catch (error) {
    console.error(error)
    res.status(500).send('Server error')
  }
})

app.get('/inventory', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM inventory')
    res.json(result.rows)
  } catch (error) {
    console.error(error)
    res.status(500).send('Server error')
  }
})

app.get('/items', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM items')
    res.json(result.rows)
  } catch (error) {
    console.error(error)
    res.status(500).send('Server error')
  }
})

// GET endpoint to fetch review order data by UUID (query parameter)
app.get('/review-order', async (req, res) => {
  try {
    const { uuid } = req.query

    if (!uuid) {
      return res.status(400).json({ error: 'UUID parameter is required' })
    }

    console.log('Fetching review order for UUID:', uuid)

    // Validate UUID format (optional but recommended)
    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
    if (!uuidRegex.test(uuid)) {
      return res.status(400).json({ error: 'Invalid UUID format' })
    }

    // Query the database
    const result = await pool.query('SELECT * FROM inventory WHERE id = $1', [
      uuid,
    ])

    if (result.rows.length === 0) {
      // Return empty structure instead of 404 to match production behavior
      return res.json({
        uuid: uuid,
        customerInfo: {},
        items: [],
        status: 'not_found',
      })
    }

    // Return the found data
    res.json({
      uuid: uuid,
      data: result.rows,
      status: 'found',
    })
  } catch (error) {
    console.error('Error in /review-order:', error)
    res.status(500).json({ error: 'Server error' })
  }
})

// GET endpoint to fetch review order data by UUID (path parameter - legacy)
app.get('/review-order/:uuid', async (req, res) => {
  try {
    const { uuid } = req.params

    // You can query multiple tables or a specific orders table
    // For now, returning a basic structure that matches what the frontend expects
    const result = await pool.query('SELECT * FROM inventory WHERE id = $1', [
      uuid,
    ])

    if (result.rows.length === 0) {
      // Return empty object or default structure instead of 404
      // since the frontend seems to expect some data structure
      return res.json({
        uuid: uuid,
        customerInfo: {},
        items: [],
        status: 'not_found',
      })
    }

    // Return the found data - you might want to structure this differently
    // based on your database schema
    res.json({
      uuid: uuid,
      data: result.rows[0],
      status: 'found',
    })
  } catch (error) {
    console.error('Error in /review-order/:uuid:', error)
    res.status(500).json({ error: 'Server error' })
  }
})

app.listen(4000, () => console.log('Server running on port 4000'))
