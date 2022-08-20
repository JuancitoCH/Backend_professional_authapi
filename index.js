const express = require("express")
const app = express()

app.get('/',(req,res)=>{
    return  res.json({
        message:'Hola'
    })
})

app.listen(4000,()=>{
    console.log("Listen on http://localhost:4000")
})