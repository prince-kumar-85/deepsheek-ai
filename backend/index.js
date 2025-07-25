import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import userRoutes from './routes/user.route.js' // Import user routes
import cookieParser from 'cookie-parser'

dotenv.config()
const app = express()
const port = process.env.PORT || 3000

//mongodb Connection
mongoose.connect(process.env.MONGO_URI, {
}) .then(() => {
  console.log('MongoDB connected successfully') 
}).catch((err) => {
  console.error('MongoDB connection error:', err)
})

//routes

// Middleware to parse JSON requests
app.use(express.json()) 
app.use(cookieParser())

app.use('/api/v1/user', userRoutes) // Use user routes


app.listen(port, () => {
  console.log(`server is listening on port ${port}`)
})
