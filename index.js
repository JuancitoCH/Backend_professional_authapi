const express = require("express")
// connectio function to db
const { connection } = require("./config/db")
// port of the server
const {port} = require('./config/envs')
const auth_router = require("./routes/auth")
const user_router = require("./routes/user")
const app = express()

// middelwares
app.use(express.json())

connection() //db

// routes
user_router(app)
auth_router(app)

app.get('/',(req,res)=>{
    return  res.json({
        message:'Hola'
    })
})

app.listen(port,()=>{
    console.log(`Listen on http://localhost:${port}`)
})