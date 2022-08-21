const mongoose = require('mongoose')
const configV = require('./envs')

const connection = async ()=>{
    try{
        const conn = await mongoose.connect(`mongodb+srv://${configV.db_username}:${configV.db_password}@${configV.db_host}/${configV.db_name}`)
        console.log('MongoDb connected '+conn.connection.host)
    }
    catch(e){
        console.log(e.message)
    }
}

module.exports = {connection,mongoose}