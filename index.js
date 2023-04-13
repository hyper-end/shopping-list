const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const routes = require('./routes');
const morgan = require('morgan');
const config = require('./config/config');
const sequelize = require('./sequelize');
const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use('/', routes);


async function assertDatabaseConnectionOk() {
	console.log(`Checking database connection...`);
	try {
		await sequelize.authenticate();
		console.log('Database connection OK!');
	} catch (error) {
		console.log('Unable to connect to the database:');
		console.log(error.message);
		process.exit(1);
	}
}

async function assertDatabaseCreationOK() {
	// Making sure setup.js initialized in oder to create tables; otherwise, you will get no such table errors

	const fs = require('fs');
	if (fs.existsSync('.dbinit')) {
		return;
	}

	const runSetup = require('./sequelize/setup');

	await runSetup();

	fs.writeFile(".dbinit", "Database initialized", (err) => {
		if (err)
			console.log(err);
		else {
			console.log(fs.readFileSync(".dbinit", "utf8"));
		}
	});

}

async function init() {
	await assertDatabaseConnectionOk();

	await assertDatabaseCreationOK();

	console.log(`Starting on port ${config.app.port}...`);

	app.listen(config.app.port, () => {
		console.log(`Express server started on port ${config.app.port}. Try some routes, such as '/api/token'.`);
	});
}

init();

// sequelize.sync().then(() => {
//   app.listen();
//   console.log(`Server started on port ${config.app.port}`);
// });
