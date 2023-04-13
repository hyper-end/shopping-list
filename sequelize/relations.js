function applyRelations(sequelize) {
	const { Todo, User } = sequelize.models;

	User.hasMany(Todo);
	Todo.belongsTo(User);
}

module.exports = { applyRelations };
