// import mongoose 

const mongoose  = require('mongoose')

//connect string of mongodb 

const connectionString = process.env.DATABASE

//connect to mongodb using mongoose 
 mongoose.connect(connectionString).then((res)=>{
    console.log('mongodb connected successfully');
 }).catch((err)=>{
    console.log(`mongodb connection failed due to :${err}`);
 })