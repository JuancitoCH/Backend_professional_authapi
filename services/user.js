const UserModel = require('../models/user')

class userService {

    async getAllUsers() {
        try {
            const users = await UserModel.find()
            return { success:true, users }
        } catch (error) {
            return { success: false, error }
        }
    }

    // async getUserId(id) {
    //     return await UserModel.findById(id)
    // }
    async getUserbyEmail(email) { 
        try {
           const user = await UserModel.findOne({ email }) 
           if (!user) throw new Error("User not found");
           return { success:true, user }
        } catch (error) {
            return { success:false, error }
        }
    }

    async create(data) {
        try {
            const user = await UserModel.create(data)
            return {
                success:true,
                user
            }

        } catch (error) {
            return {
                success:false,
                error
            }
        }
    }


}
module.exports = userService