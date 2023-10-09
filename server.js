require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const workoutRoutes = require('./routes/workouts')
const cors = require('cors')

// express app
const app = express()

// middleware
app.use(express.json())

const corsOptions = {
  origin: 'https://workout-buddy-backend-chyp.onrender.com',
  successStatus: 200
}
app.use(cors(corsOptions))

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

// routes
app.use('/api/workouts',workoutRoutes)

// connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(() => {
  // listen for requests
  app.listen(process.env.PORT, () => {
    console.log('connect to db & listening on port ', process.env.PORT)
  })
})
.catch((error) => {
  console.log(error)
})