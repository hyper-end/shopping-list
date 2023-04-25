/*
  This middleware verifies the token by checking if it exists in the Authorization header of the request.
  If it does not exist, the middleware sends a 401 status code with an error message.
  If the token exists, it is verified using the jsonwebtoken library and the jwt.secret from the config file.
  If the token is invalid, the middleware sends a 401 status code with an error message.
  If the token is valid, the middleware sets the username property of the request to the username value in the decoded token and calls the next middleware.
*/

// Require necessary libraries and modules
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const { models } = require('../sequelize');


const verifyToken = (req, res, next) => {
  // Extract token from request header
  const token = req.headers.authorization?.split(' ')[1];

  // If token is not present in header, send 401 status code with error message
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  // Verify the token using jsonwebtoken and jwt.secret from config file
  jwt.verify(token, config.jwt.secret, async (err, decodedToken) => {

    // If token is invalid, send 401 status code with error message
    if (err) {
      console.log(err);
      return res.status(401).json({ message: 'Invalid token' });
    }

    // If token is valid, set properties of the request object and call the next middleware
    req.username = decodedToken.username;
    req.userId = decodedToken.userId;
    req.token = token;

    // Find user from the database using username extracted from decoded token and add it to current request object
    req.user = await models.User.findOne({ where: { username: req.username } });

    next();
  });
};

// Export the middleware function
module.exports = verifyToken;

