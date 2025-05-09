/**
 * Updated by augustus.hyu_'s author on January 02, 2024
 * "Code is like humor. When you have to explain it, it’s bad." by Cory House
 */
require('mongoose')
require('dotenv').config()
require('module-alias/register')
const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const { env } = require('@/config/environment.config')
const CONNECT_DB = require('@/config/db.config')
const routes = require('@/routes/v1')
const errorHandlingMiddleware = require('@/middlewares/errorHandling.middleware')
const { corsOptions } = require('@/config/cors.config')
const cookieParser = require('cookie-parser')

// Create an Express app
const app = express()
const port = env.PORT || 8888

// Connect to the database
CONNECT_DB()

// Fix cache from disk of express js
app.use((req, res, next) => {
  res.set('Cache-Control', 'no-store')
  next()
})

// Middleware to set security HTTP headers
app.use(helmet())
// Middleware to parse JSON bodies
app.use(express.json())

// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }))

// Enable CORS & cookies parser
app.use(cors(corsOptions))
app.use(cookieParser())

// routes
app.use('/v1', routes)

//Middleware xử lý lỗi tập trung
app.use(errorHandlingMiddleware)
app.get('/', (req, res) => {
  res.send('Hello World!')
})
// Start the server
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running on port ${port}`)
})