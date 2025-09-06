const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const connectDB = require('./config/db')
const path = require("path");

dotenv.config()
const ItemFoundRouter = require('./routes/itemFound')

const app = express()
connectDB()

//middlewares
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use('/', ItemFoundRouter)


app.listen(process.env.PORT, ()=>{
    console.log('Server running on port ', process.env.PORT)
})