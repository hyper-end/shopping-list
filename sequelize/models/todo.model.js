/*
	This code defines a Sequelize model for a Todo item. 
	It exports a function that takes the Sequelize connection object as a parameter and uses it to define the model.
*/
const { DataTypes } = require('sequelize');

// Export a function that defines the todo model.
// This function will automatically receive as parameter the Sequelize connection object.
module.exports = (sequelize) => {
	sequelize.define('Todo', {
		// A unique identifier for the Todo item that is an auto-incrementing integer and the primary key of the table.
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER
		},

		// A boolean indicating whether the Todo item has been completed. By default, it is set to false.
		completed: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: false,
		},

		// A string describing the Todo item.
		title: {
			allowNull: false,
			type: DataTypes.STRING
		}
	});

};

