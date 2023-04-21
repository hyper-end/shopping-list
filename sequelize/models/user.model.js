const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

// Export a function that defines the user model.
// This function will automatically receive as parameter the Sequelize connection object.
module.exports = (sequelize) => {
	let userSchema = sequelize.define('User', {
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER
		},
		username: {
			allowNull: false,
			type: DataTypes.STRING,
			unique: true,
			validate: {
				// Length of at least 3, and only use letters, numbers and underscores.
				is: /^\w{3,}$/
			}
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
		}
	});

	userSchema.beforeCreate(function (user, options) {
		return new Promise((resolve, reject) => {
			bcrypt.hash(user.password, 10).then(hash => {
				user.password = hash;
				return resolve(user, options);
			}, error => {
				reject(error);
			});
		});
	});

	userSchema.associate = (models) => {
		User.hasMany(models.Todo);
	};

	userSchema.prototype.comparePassword = async function (password) {
		return await bcrypt.compare(password, this.password);
	};

	userSchema.prototype.toJSON = function () {
		const values = Object.assign({}, this.get());

		delete values.password;

		return values;
	};


	return userSchema;

};
