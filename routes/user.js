const express = require('express')
const { successfulResponse, errorResponse } = require('../helpers/responses.helper')
const { validateRol, verifyToken } = require('../middlewares/auth.middleware')
const User = require('../services/user')

function user_router(app){
    const router = express.Router()
    app.use('/api/user',router)
    // Instance of user Service
    const userService = new User()

    //TODO: hacer que no devuelva las contraseñas
    router.get('/',[verifyToken, validateRol(3) ],async (req,res)=>{
        const response = await userService.getAllUsers()
        response.success
        ? successfulResponse(
            res,
            200,
            true,
            "Users successfully retrieved",
            response.users
          )
        : errorResponse(res, response.error);
    })

    router.post('/create',async(req,res)=>{
        const data = req.body
        const response = await userService.create(data)
        return res.json(response)
    })
}
module.exports=user_router