const express = require('express')
const Auth = require('../services/auth')
const {verifyToken} = require('../middlewares/auth.middleware')
const {logoutResponse, successfulResponse, authResponse, errorResponse} = require('../helpers/responses.helper')


const auth_router = (app) => {
    const router = express.Router()
    const authService = new Auth()

    app.use('/api/auth', router)

    router.post('/login', async (req, res) => {
        const response = await authService.login(req.body)
        console.log(response)
        response.success 
        ? authResponse(res, 200, true, 'Login successful', response) 
        : errorResponse(res, response)
        // return res.json(response)
        // return cookieResponse(res, response)
    })
    router.post('/register', async (req, res) => {
        const response = await authService.register(req.body)
        ? authResponse(res, 200, true, 'Register successful', response) 
        : errorResponse(res, response)
        // return res.json(response)
        // return cookieResponse(res, response)
    })

    router.get('/logout', async (req, res) => {
        logoutResponse(res)
    })

    router.get('/sesion',verifyToken,(req,res)=>{
        //return res.json({ ...req.userData })
        return res.status(200).json({
            success: true,
            message: 'Token correcto',
            data: {
                ...req.userData
            }
        })
    } )
}

module.exports = auth_router