require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const workoutRoutes = require('./routes/workouts')

// express app
const app = express()

//cors
const cors = require('cors')

// middleware
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://workout-buddy-backend-chyp.onrender.com, http://localhost:3000, https://workout-buddy-tzli.onrender.com");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// With this code using the 'cors' middleware:
app.use(
  cors({
    origin: [
      "https://workout-buddy-backend-chyp.onrender.com", 
      "http://localhost:3000",
      "https://workout-buddy-tzli.onrender.com"
    ]
  })
);

app.use(express.json())

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