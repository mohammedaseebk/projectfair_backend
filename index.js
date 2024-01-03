//1) import dotenv
//Loads .env file contents into process.env by default
require('dotenv').config()

//2) import express - to create server
const express = require('express')

//3)import cors 
const cors = require('cors')

//import router
const router = require('./Routes/router')

//import connection.js file/mongoose
require('./DB/connections')

//import application specfic middleware
// const appMiddleware = require('./Middleware/appMiddleware')

//4) create server - Create an Express application the express() function is a top-level function exported by the express module

const pfServer = express()

//5) use of cors by server 

pfServer.use(cors())


//6)Returns middleware that only parses json and convert it into javascript object
pfServer.use(express.json())

//server use router
pfServer.use(router)

// //server use middleware
// pfServer.use(appMiddleware)

//pfserver should use uploads folder
//first arg - how the other application should use this file
//sec arg - to export the upload folder
pfServer.use('/uploads',express.static('./uploads'))


//7)customize  the port  - bydefault run - 3000 / we chnge the port
const PORT =4000 || process.env.PORT

//8)run server
pfServer.listen(PORT,()=>{
    console.log(`SERVER RUNNING SUCESSFULLY AT PORT NUMBER ${PORT}`);
})

//9)get http request to baseurl -http://localhost:4000/
pfServer.get('/',(req,res)=>{

    res.send(`<h1 style="color:blue">projectfair server running sucessfully and waiting for client request</h1>`)
})
 
// //10)post request
// pfServer.post('/',(req,res)=>{

//     res.send('post request')
// })

