const {mode} = require('../config/env')

const cookieResponse=(res,data)=>{
    const {token=''} = data
    delete data.token
    // fecha de exppiracion
    const date = new Date(new Date().setDate(new Date().getDate()+7))
    return res.cookie('token',token,{
        httpOnly:true,
        // comprobamos el modo de el server ( dev )
        ...(mode!=='dev')&&( {secure:true, sameSite:'none'} ),
        expires:date
    }).json(data)
}

module.exports = cookieResponse