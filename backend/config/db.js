const mongoose = require('mongoose');

async function connectDB() {
    console.log(process.env.MONGO_URI)
    try{
        const connection = await mongoose.connect(process.env.MONGO_URI);
        console.log('Database Connected')
    }catch (error){
        console.error('Database Connection error: ', error);
        process.exit(1);
    }
}

module.exports = connectDB;

