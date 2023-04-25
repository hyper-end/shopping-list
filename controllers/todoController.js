// Require the necessary dependencies
const { Router } = require('express');
const { models } = require('../sequelize');
const verifyToken = require('../middlewares/verify-token');

// Initialize the router
const router = Router();

// Route to get all todos for a user
// Includes associated user information and can filter by status
router.get('/todos', verifyToken, async (req, res) => {
    try {
        // Filter todos by user ID
        let where = {
            UserId: req.userId
        }

        // Filter todos by status if query parameter is present
        if (req.query) {
            switch (req.query.status) {
                case "todo": where.completed = false; break;
                case "completed": where.completed = true; break;
            }
        }

        // Retrieve todos from the database
        const todos = await models.Todo.findAll({
            include: models.User, order: [
                ['id', 'DESC']
            ],
            where
        });

        // Return the retrieved todos
        res.json(todos);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Route to create a new todo for a user
router.post('/todos', verifyToken, async (req, res) => {
    try {
        // Retrieve the todo data from the request body
        let data = req.body;

        // Create a new todo associated with the authenticated user
        const todo = await req.user.createTodo(data);

        // Return the created todo
        res.status(201).json(todo);
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: 'Invalid todo information' });
    }
});

// Route to update an existing todo by ID
router.put('/todos/:id', verifyToken, async (req, res) => {
    try {
        // Find the todo by ID
        const todo = await models.Todo.findByPk(req.params.id);

        // Check if the todo exists and belongs to the authenticated user
        if (!todo || todo.UserId != req.userId) {
            return res.status(404).json({ message: 'Todo not found' });
        }

        // Update the todo with the new data
        const updatedTodo = await todo.update(req.body);

        // Return the updated todo
        res.json(updatedTodo);
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: 'Invalid todo information' });
    }
});

// Route to partially update an existing todo by ID
router.patch('/todos/:id', verifyToken, async (req, res) => {
    try {
        // Find the todo by ID
        const todo = await models.Todo.findByPk(req.params.id);

        // Check if the todo exists and belongs to the authenticated user
        if (!todo || todo.UserId != req.userId) {
            return res.status(404).json({ message: 'Todo not found' });
        }

        // Update the todo with the new data
        const updatedTodo = await todo.update(req.body);

        // Return the updated todo
        res.json(updatedTodo);
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: 'Invalid todo information' });
    }
});

/// The todos route with a DELETE method deletes a todo by its ID from the database.
router.delete('/todos/:id', verifyToken, async (req, res) => {
    try {
        // Find the todo in the database by its ID
        const todo = await models.Todo.findByPk(req.params.id);

        // If todo does not exist, return 404 status code
        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }

        // If todo exists, delete it from the database
        await todo.destroy();

        // Send a 204 No Content response indicating that the request was successful but there is no content to return
        res.sendStatus(204);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
