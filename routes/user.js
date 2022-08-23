const express = require('express')
const { validateRol,verifyToken } = require('../middlewares/auth.middleware')
const User = require('../services/user')

function user_router(app){
    const router = express.Router()
    app.use('/api/user',router)
    // Instance of user Service
    const userService = new User()

    router.get('/',verifyToken,validateRol(1,2),async (req,res)=>{
        const response = await userService.getAllUsers()
        return res.json(response)
    })

    router.post('/create',verifyToken,validateRol(1,2),async(req,res)=>{
        const data = req.body
        const response = await userService.create(data)
        return res.json(response)
    })
}
module.exports=user_router