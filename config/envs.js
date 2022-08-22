require ('dotenv').config()

const config={
    port: process.env.PORT,
    db_username: process.env.DB_USERNAME,
    db_password: process.env.DB_PASSWORD,
    db_host: process.env.DB_HOST,
    db_name: process.env.DB_NAME,
    isProductionEnvironment: process.env.NODE_ENV === "production",
    jwtSecret: process.env.PRIVATE_JWT,
}

module.exports=config