/* eslint-disable no-console */
/**
 * Updated by augustus.hyu_'s author on January 03, 2024
 * "Code is like humor. When you have to explain it, it’s bad." by Cory House
 */
const mongoose = require('mongoose')
const { env } = require('@/config/environment.config')

// Establish the connection
const CONNECT_DB = async () => {
  try {
    await mongoose.connect(env.MONGODB_URI)
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message)
    if (error.name === 'MongoNetworkError') {
      console.error('Network error occurred. Check your MongoDB server.')
    } else if (error.name === 'MongooseServerSelectionError') {
      console.error(
        'Server selection error. Ensure MongoDB is running and accessible.'
      )
    } else {
      console.error('An unexpected error occurred: ', error)
    }
    process.exit(1) // Exit the process if the connection fails
  }
}

// Handling connection events
const db = mongoose.connection

db.on('error', (error) => {
  console.error('MongoDB connection error:', error)
})

db.once('open', () => {
  console.log('Connected to MongoDB')
})

db.on('disconnected', () => {
  console.log('Disconnected from MongoDB')
})

// Gracefully close the connection when the application exits
process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('Mongoose connection is disconnected due to application termination')
    process.exit(0)
  })
})

// Export the connectDB function
module.exports = CONNECT_DB
