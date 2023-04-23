// Import Sequelize package and relations
const { Sequelize } = require('sequelize');
const { applyRelations } = require('./relations');

// Import config file
const config = require('../config/config');

// Create a new Sequelize instance with the configurations from the config file
const sequelize = new Sequelize(config.db);

// Define an array of model definers
const modelDefiners = [
	require('./models/user.model'),
	require('./models/todo.model'),
	// Add more models here...
];

// Define all models according to their files.
for (const modelDefiner of modelDefiners) {
	modelDefiner(sequelize);
}

// Execute relations after the models are defined
applyRelations(sequelize);

// Export the sequelize connection instance to be used around our app.
module.exports = sequelize;