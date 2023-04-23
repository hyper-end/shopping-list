/*
    This code exports an object that contains configuration information for the application.
*/

// It uses dotenv to load environment variables from a .env file and use them to construct 
// the database connection string, JWT secret, and other app settings.
require('dotenv').config();

// The configuration object includes the database connection string, 
// JWT secret key, and the port number and API endpoint for the application.
module.exports = {
    "db": `postgres://${process.env.DB_USERNAME}:${encodeURIComponent(process.env.DB_PASSWORD)}@${process.env.DB_URL}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
    "jwt": {
        "secret": process.env.JWT_SECRET
    },
    "app": {
        "port": process.env.APP_PORT,
        "api": process.env.API_ENDPOINT
    }
}



