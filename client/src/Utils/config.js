/*
    This code defines an object called config with properties for the app port and API URL. 
    It sets the port property to 5000 and the api property to http://localhost:5000/.
    I think we should put it in a .env file
*/
const config = {
    "app": {
        "port": 5000,
        "api": "http://localhost:5000/"
    }
}

export default config;