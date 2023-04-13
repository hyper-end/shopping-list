require('dotenv').config();

module.exports = {
    "db": `postgres://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_URL}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
    "jwt": {
        "secret": process.env.JWT_SECRET
    },
    "app": {
        "port": process.env.APP_PORT,
        "api": process.env.API_ENDPOINT
    }
}