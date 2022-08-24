const {mongoose} = require('../config/db')

const Schema = mongoose.Schema

const userSchema = new Schema({
    name:{
        type:String,
        trim: true,
        required: true,
        lowercase: true
    },
    lastName:{
        type:String,
        trim: true,
    },
    password:{
        type:String,
        required:true,
        trim: true,
        minlength: 5
    },
    email:{
        type:String,
        unique:true,
        required:[true, "Email is a required field"],
        trim: true,
        validate:{
            validator: function(value){
                if(! /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value)){
                    throw new Error('Please enter a valid email')
                }
            }
        }
    },
    // dni:{
    //     type:String,
    //     trim: true,
    //     unique:true
    // },
    // phone:{
    //     type:String,
    //     trim: true,
    //     unique:true
    // },
    role:{
        type:Number,
        default:1
    },
    status:{
        type:Number,
        default:1
    },
    photo:{
        type:String,
        trim: true
    }
})
const UserModel = mongoose.model('User',userSchema)
module.exports = UserModel
