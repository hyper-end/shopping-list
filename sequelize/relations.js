// This function sets up the relations between the Todo and User models.
function applyRelations(sequelize) {
	// Destructuring the Todo and User models from the sequelize.models object
	const { Todo, User } = sequelize.models;

	// Establishing a one-to-many relationship between User and Todo models
	User.hasMany(Todo);
	Todo.belongsTo(User);
}

module.exports = { applyRelations };

