const { DataTypes } = require('sequelize');

// Export a function that defines the todo model.
// This function will automatically receive as parameter the Sequelize connection object.
module.exports = (sequelize) => {
	sequelize.define('Todo', {
		// It is the default configuration for an ID. So you can skip this one.
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER
		},
		completed: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: false,
		},
		title: {
			allowNull: false,
			type: DataTypes.STRING
		}
	});

	// Todo.associate = (models) => {
	// 	Todo.belongsTo(models.User);
	// };

	// return Todo;
};

// Todo.associate = (models) => {
// 	Todo.belongsTo(models.User);
//   };