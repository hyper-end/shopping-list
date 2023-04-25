/*
    This file defines the routes for the API.
    It creates an Express router and attaches the routes for the user and todo controllers.
    The router prefixes the routes with "/api/".
*/

const express = require('express');
const router = express.Router();

const userRoutes = require('./userController');
const todoRoutes = require('./todoController');

// Attach the user and todo routes to the "/api/" prefix
router.use('/api/', userRoutes);
router.use('/api/', todoRoutes);

module.exports = router;