/*
	This module exports an async function named "run" which rewrites the database and adds some dummy data.

	The required modules for the function are imported at the beginning of the code. "sequelize" is imported from the root directory, "pickRandom" function is imported from the helper function in another directory, and "bcrypt" is imported from the bcrypt package.

	In the function, first, a message is logged to indicate the start of the process. Then, the database tables are synced and any existing tables are dropped.

	A hashed password is generated using bcrypt.

	Some dummy users are added to the User table using the "bulkCreate" method.

	A random title and completed value are selected for each user's todo from a list of options, and the todos are created for the user using the "createTodo" method.

	Finally, a message is logged to indicate the end of the process.
*/

// Importing required modules
const sequelize = require('.');
const { pickRandom } = require('../utils/helpers/random');
const bcrypt = require('bcrypt');

// Defining an async function to rewrite the database and add dummy data
async function run() {
	// Logging a message to indicate the start of the process
	console.log('Rewriting the database, adding some dummy data.');

	// Syncing the database tables and dropping any existing tables
	await sequelize.sync({ force: true });

	// Generating a hashed password using bcrypt
	passwordHash = await bcrypt.hash('123123', 10);

	// Adding some dummy users to the User table
	await sequelize.models.User.bulkCreate([
		{ username: 'hossein', password: passwordHash },
		{ username: 'aria', password: passwordHash },
		{ username: 'rebekka', password: passwordHash }
	]);

	// Creating random todos for each user
	for (const user of await sequelize.models.User.findAll()) {
		for (let i = 0; i < 10; i++) {
			// Selecting a random title for the todo from a list of options
			const title = pickRandom([
				'Do the POD',
				'Review assessment course goals',
				'Do the team building activities',
				'Talk to the product owner',
				'Meeting with the scrum master',
				'Attend the classes'
			]);

			// Selecting a random value for the completed field of the todo
			const completed = pickRandom([
				true, false
			]);

			// Creating the todo for the user with the selected title and completed value
			await user.createTodo({
				title: title,
				completed: completed
			});
		}
	}

	// Logging a message to indicate the end of the process
	console.log('Database setup and seeding done!');
}

// Exporting the run function to make it available to other modules
module.exports = run;
