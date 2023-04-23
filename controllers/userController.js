const { Router } = require('express');
const { models } = require('../sequelize');
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const verifyToken = require('../middlewares/auth');

const router = Router();

/// The register route creates a new user in the database, hashes their password, and sends back a JWT token for authentication.
router.post('/users/register', async (req, res) => {
    try {
        const user = await models.User.create(req.body);
        const token = jwt.sign({ userId: user.id }, config.jwt.secret, { expiresIn: '1h' });
        res.status(201).json({ user, token });
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: 'Invalid user information' });
    }
});

/// The login route checks if the provided username and password match a user in the database, and if so, sends back a JWT token for authentication.
router.post('/users/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        //auser = await models.User.create({username:'test',password:'123123'});
        // return;
        const user = await models.User.findOne({ where: { username } });

        if (!user) {
            return res.status(401).json({ message: 'Authentication failed' });
        }

        const isPasswordValid = await user.comparePassword(password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Authentication failed' });
        }

        const token = jwt.sign({ username: user.username }, config.jwt.secret, { expiresIn: '1h' });

        res.json({ user, token });
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: 'Invalid credentials' });
    }
});

/// To check for token validity from client app
router.get('/users/token', verifyToken, async (req, res) => {
    try {
        console.log("req.username", req.username)
        let username = req.username;
        const user = await models.User.findOne({ where: { username } });

        if (!user) {
            return res.status(401).json({ message: 'Invalid token' });
        }

        res.json({ user, token: req.token });

    } catch (err) {
        console.error(err);
        return res.status(401).json({ message: 'Invalid token' });
    }
});

module.exports = router;
