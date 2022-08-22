const express = require("express")
// connectio function to db
const { connection } = require("./config/db")
// port of the server
const {port} = require('./config/envs')
const user_router = require("./routes/user")
const app = express()

// middelwares
app.use(express.json())

connection() //db

// routes
user_router(app)

app.get('/',(req,res)=>{
    return  res.json({
        message:'Hola'
    })
})

app.listen(port,()=>{
    console.log(`Listen on http://localhost:${port}`)
})