// AWS Lambda handler for Express app
import serverless from 'serverless-http'
import app from './src/index.js'

// Wrap Express app for AWS Lambda
export const handler = serverless(app)
