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

// GET endpoint to fetch single inventory item by ID
app.get('/review-order/:id', async (req, res) => {
  try {
    const { id } = req.params

    if (!id) {
      return res
        .status(400)
        .json({ error: 'Inventory ID parameter is required' })
    }

    console.log('Fetching inventory item for ID:', id)

    // Query the database for specific inventory item
    const result = await pool.query('SELECT * FROM inventory WHERE id = $1', [
      id,
    ])

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: 'Inventory item not found',
        id: id,
      })
    }

    // Return the found inventory item
    res.json(result.rows[0])
  } catch (error) {
    console.error('Error in /inventory/:id:', error)
    res.status(500).json({ error: 'Server error' })
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

app.listen(4000, () => console.log('Server running on port 4000'))
