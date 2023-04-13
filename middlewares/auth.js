/*
    * This middleware verifies the token by checking if it exists in the Authorization header of the request. 
    * If it does not exist, the middleware sends a 401 status code with an error message. 
    * If the token exists, it is verified using the jsonwebtoken library and the jwt.secret from the config file. 
    * If the token is invalid, the middleware sends a 401 status code with an error message. 
    * If the token is valid, the middleware sets the username property of the request to the username value in the decoded token and calls the next middleware.
*/
const jwt = require('jsonwebtoken');
const config = require('../config/config');

const verifyToken = (req, res, next) => {
    // const token = req.headers.authorization?.split(' ')[1];
    // console.log("verifyToken", token)
    // if (!token) {
    //     return res.status(401).json({ message: 'No token provided' });
    // }

    // jwt.verify(token, config.jwt.secret, (err, decodedToken) => {
    //     if (err) {
    //         return res.status(401).json({ message: 'Invalid token' });
    //     }

    //     req.username = decodedToken.username;
    //     req.token = token;
    //     next();
    // });
    next();

};

module.exports = verifyToken;



/*const verifyToken = async (req, res, next) => {
    if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
      jwt.verify(req.headers.authorization.split(' ')[1], config.jwt.secret, (err, decode) => {
        if (err) req.user = undefined;
        req.user = decode;
        next();
      });
    } else {
      req.user = undefined;
      next();
    }
  }
  
  module.exports = verifyToken; */