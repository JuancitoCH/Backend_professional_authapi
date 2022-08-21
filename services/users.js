const UserModel = require('../models/users')

class userService {

    async getAllUsers() {
        return await UserModel.find()
    }

    async getUserId(id) {
        return await UserModel.findById(id)
    }
    async getUserbyEmail(email) {
        return await UserModel.findOne({ email })
    }

    async create( data ){
        try {
            const user = await UserModel.create(data)
            return user

        } catch (error) {
           console.log(error);
           
           if(error.code===11000){
               const message = `El correo ${error.keyValue.email} ya tiene una cuenta registrada`

               return {
                   error:true,
                   message
               }
           }else{
                return {
                     error:true,
                     message:error.message
                }
           }
        }
    }

    
    async updateUserbyId(id, data) {
        return await UserModel.findByIdAndUpdate(id, data, { new: true })
    }

    async updateUserbyEmail(email, data) {
        return await UserModel.findOneAndUpdate({ email }, data, { new: true })
    }
    
    async deleteUserById(_id) {
        
        return await UserModel.deleteOne({_id})
    }
}
module.exports = userService