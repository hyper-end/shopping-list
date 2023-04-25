// Importing required packages
const { Router } = require('express');
const { models } = require('../sequelize');
const jwt = require('jsonwebtoken');
const config = require('../config/config');

// Importing middleware to verify token
const verifyToken = require('../middlewares/verify-token');

// Creating a new router instance
const router = Router();

// Register route creates a new user in the database, hashes their password, and sends back a JWT token for authentication.
router.post('/users/register', async (req, res) => {
    try {
        let user = req.body;
        // If no username is provided, send back an error
        if (!user.username) {
            res.status(400).json({ message: 'Invalid user information' });
        }

        // Create user in the database
        user = await models.User.create(user);

        // Sign JWT token for user authentication
        const token = jwt.sign({ username: user.username, userId: user.id }, config.jwt.secret, { expiresIn: '1h' });

        // Send back user data and token
        res.status(201).json({ user, token });
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: 'Invalid user information' });
    }

});

// Login route checks if the provided username and password match a user in the database, and if so, sends back a JWT token for authentication.
router.post('/users/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Find user in the database
        const user = await models.User.findOne({ where: { username } });

        // If user doesn't exist, send back an error
        if (!user) {
            return res.status(401).json({ message: 'Authentication failed' });
        }

        // Check if password matches the hashed password in the database
        const isPasswordValid = await user.comparePassword(password);

        // If password doesn't match, send back an error
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Authentication failed' });
        }

        // Sign JWT token for user authentication
        const token = jwt.sign({ username: user.username, userId: user.id }, config.jwt.secret, { expiresIn: '1h' });

        // Send back user data and token
        res.json({ user, token });
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: 'Invalid credentials' });
    }
});

// Route to check for token validity from client app
router.get('/users/token', verifyToken, async (req, res) => {
    try {
        let username = req.username;
        // Find user in the database using the username from the decoded token
        const user = await models.User.findOne({ where: { username } });

        // If user doesn't exist, send back an error
        if (!user) {
            return res.status(401).json({ message: 'Invalid token' });
        }

        // Send back user data and token
        res.json({ user, token: req.token });

    } catch (err) {
        console.error(err);
        return res.status(401).json({ message: 'Invalid token' });
    }

});

// Exporting router instance
module.exports = router;