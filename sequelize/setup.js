const sequelize = require('.');
const { pickRandom, randomDate } = require('../utils/helpers/random');

async function run() {
	console.log('Rewriting the database, adding some dummy data.');

	// Syncing the database tables
	await sequelize.sync({ force: true });

	// Adding some dummy users
	await sequelize.models.User.bulkCreate([
		{ username: 'hossein', password:'123123' },
		{ username: 'aria', password:'123123' },
		{ username: 'rebekka', password:'123123' }
	]);

	// Let's create random todos for each user
	for (const user of await sequelize.models.User.findAll()) {
		for (let i = 0; i < 10; i++) {
			const title = pickRandom([
				'Do the POD',
				'Review assessment course goals',
				'Do the team building activities',
				'Talk to the product owner',
				'Meeting with the scrum master',
				'Attend the classes',
				'Thank Hossein for this amazing project',
				'Buy a cofee for Hossein',
			]);

			const completed = pickRandom([
				true,false
			]);

			await user.createTodo({
				title: title,
				completed: completed
			});
		}
	}

	console.log('Database setup and seeding done!');
}

module.exports = run;