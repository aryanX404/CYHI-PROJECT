const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const connectDB = require('./config/db')
dotenv.config()

const app = express()
connectDB()

//middlewares
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}));


app.listen(process.env.PORT, ()=>{
    console.log('Server running on port ', process.env.PORT)
})