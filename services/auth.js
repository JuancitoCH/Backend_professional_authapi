const Users = require('./user')
const jwt = require('jsonwebtoken')
const {jwt_secret} = require('../config/envs')
const bcrypt = require('bcrypt')


class Auth{
    constructor(){
        this.userService = new Users()
    }
    async register(data){
        const {email,password} = data
        if(!email) return {
            success:false,
            message:"Email must be included"
        }
        const userEmailExist = await this.userService.getUserbyEmail(email)
        if(userEmailExist) return {
            success:false,
            // TODO: Buscar el Status correspondiente
            status:400,
            message:"User Alredy Exist",
        }
        // Encriptamos password
        if(password) data.password = await this.cryptPassword(password)
        const userRegistered = await this.userService.create(data)
        if(userRegistered.success === false) return userRegistered
        
        const token  = this.getToken(userRegistered)
        // eliminamos password de la respuesta del return
        userRegistered.password=null
        delete userRegistered.password
        return {
            message:"User Register Succefully",
            success:true,
            error:false,
            data:{
                user:userRegistered
            },
            token
        }
    }

    async login({email,password}){
        if(!email || !password) return {success:false,message:"You must include Credentials"}
        const user = await this.userService.getUserbyEmail(email)
        if(!user) return {success:false,message:"User not Register"}

        const passwordCompare = await bcrypt.compare(password,user.password)
        if(!passwordCompare) return {success:false,message:"Incorrect Credentials"}

        const token = this.getToken(user)
        user.password=null
        delete user.password
        return {
            message:"User Login Succefully",
            success:true,
            data:{
                user
            },
            token
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