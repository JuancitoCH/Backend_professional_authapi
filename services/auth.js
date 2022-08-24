const Users = require('./user')
const jwt = require('jsonwebtoken')
const {jwt_secret} = require('../config/envs')
const bcrypt = require('bcrypt')


class Auth{
    constructor(){
        this.userService = new Users()
    }
    async register(data){
        
        const {password} = data
        if(password) data.password = await this.cryptPassword(password)

        const userRegistered = await this.userService.create(data)
        if(userRegistered.success === false) return userRegistered
        
        const token  = this.getToken(userRegistered)
        // eliminamos password de la respuesta del return
        userRegistered.user.password=null
        delete userRegistered.user.password

        return {
            message:"User Register Succefully",
            success:true,
            data:{
                user:userRegistered,
                token
            }
        }
    }

    async login({email,password}){
        if(!email || !password) return {success:false,message:"You must include Credentials"}
        const response = await this.userService.getUserbyEmail(email)
        if(response.success==false) return {success:false,message:'Email has not been registered'}

        const passwordCompare = await bcrypt.compare(password,response.user.password)
        if(!passwordCompare) return {success:false,message:"Incorrect Credentials"}

        const token = this.getToken(response.user)
        response.user.password=null
        delete response.user.password
        return {
            message:"User Login Succefully",
            success:true,
            data:{
                user:response.user,
                token
            }
        }
    }

    async cryptPassword(password){
        const salt = await bcrypt.genSalt(10)
        const cryptPassword = await bcrypt.hash(password,salt)
        return cryptPassword
    }


    getToken(userData,time="7d"){
        const user = {
            // id:userData._id,
            name:userData.name,
            lastname:userData.lastName,
            password:userData.password,
            email:userData.email,
            role:userData.role
        }
        const token = jwt.sign(user,jwt_secret,{expiresIn:time})
        return token
    }
}

module.exports = Auth