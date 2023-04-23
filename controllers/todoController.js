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

/// The todos route gets all todos from the database and includes the associated user information
router.get('/todos', verifyToken, async (req, res) => {
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
router.post('/todos', verifyToken, async (req, res) => {
    try {
        const todo = await models.Todo.create(req.body);
        res.status(201).json(todo);
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: 'Invalid todo information' });
    }
});

/// The todos route with a PUT method updates a todo by its ID in the database.
router.put('/todos/:id', verifyToken, async (req, res) => {
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
router.patch('/todos/:id', verifyToken, async (req, res) => {
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
router.delete('/todos/:id', verifyToken, async (req, res) => {
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
