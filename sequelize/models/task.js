const { DataTypes } = require('sequelize');

// Export a function that defines the task model.
// This function will automatically receive as parameter the Sequelize connection object.
module.exports = (sequelize) => {
	sequelize.define('task', {
		// It is the default configuration for an ID. So you can skip this one.
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER
		},
		status: {
			allowNull: false,
			type: DataTypes.STRING,
		},
		title: {
			allowNull: false,
			type: DataTypes.STRING
		},
	});
};
