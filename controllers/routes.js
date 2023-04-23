const express = require('express');
const router = express.Router();

const userRoutes = require('./userController');
const todoRoutes = require('./todoController');

router.use('/api/', userRoutes);
router.use('/api/', todoRoutes);

module.exports = router;
