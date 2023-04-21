const { Sequelize } = require('sequelize');
const { applyRelations } = require('./relations');
const config = require('../config/config');

const sequelize = new Sequelize(config.db);

const modelDefiners = [
	require('./models/user.model'),
	require('./models/todo.model'),
	// Add more models here...
];

// Define all models according to their files.
for (const modelDefiner of modelDefiners) {
	modelDefiner(sequelize);
}

// Object.keys(models).forEach((modelName) => {
// 	if ('associate' in models[modelName]) {
// 	  models[modelName].associate(models);
// 	}
//   });

// Execute relations after the models are defined
applyRelations(sequelize);

// Export the sequelize connection instance to be used around our app.
module.exports = sequelize; 
