/*
    * This code defines six routes: 
        /register for user registration, 
        /login for user authentication, 
        /todos to get all todos, 
        /todos to create a new todo, 
        /todos/:id to update a todo by ID
        /todos/:id to delete a todo by ID.
*/
const { Router } = require('express');
const { models } = require('../sequelize');
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const verifyToken = require('../middlewares/auth');

const router = Router();

/// The register route creates a new user in the database, hashes their password, and sends back a JWT token for authentication.
router.post('/api/register', async (req, res) => {
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
router.post('/api/login', async (req, res) => {
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
router.get('/api/token', verifyToken, async (req, res) => {
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

/// The todos route gets all todos from the database and includes the associated user information
router.get('/api/todos', verifyToken, async (req, res) => {
    try {
        const todos = await models.Todo.findAll({
            include: models.User, order: [
                ['id', 'DESC']
            ],
        });
        res.json(todos);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

/// The todos route with a POST method creates a new todo in the database. 
router.post('/api/todos', verifyToken, async (req, res) => {
    try {
        const todo = await models.Todo.create(req.body);
        res.status(201).json(todo);
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: 'Invalid todo information' });
    }
});

/// The todos route with a PUT method updates a todo by its ID in the database.
router.put('/api/todos/:id', verifyToken, async (req, res) => {
    try {
        const todo = await models.Todo.findByPk(req.params.id);

        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }

        const updatedTodo = await todo.update(req.body);

        res.json(updatedTodo);
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: 'Invalid todo information' });
    }
});

/// The todos route with a PUT method updates a todo by its ID in the database.
router.patch('/api/todos/:id', verifyToken, async (req, res) => {
    try {
        const todo = await models.Todo.findByPk(req.params.id);

        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        //todo.completed = true;

        const updatedTodo = await todo.update(req.body);

        res.json(updatedTodo);
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: 'Invalid todo information' });
    }
});

/// The todos route with a DELETE method deletes a todo by its ID from the database.
router.delete('/api/todos/:id', verifyToken, async (req, res) => {
    try {
        const todo = await models.Todo.findByPk(req.params.id);

        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }

        await todo.destroy();

        res.sendStatus(204);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;