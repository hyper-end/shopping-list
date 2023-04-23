// Import required modules
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const routes = require('./controllers/routes');
const morgan = require('morgan');
const config = require('./config/config');
const sequelize = require('./sequelize');

// Create an instance of the express application
const app = express();

// Set up middleware
app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use('/', routes);

// Function to check database connection status
async function assertDatabaseConnectionOk() {
	console.log(`Checking database connection...`);
	try {
		// Attempt to authenticate with sequelize
		await sequelize.authenticate();
		console.log('Database connection OK!');
	} catch (error) {
		// If authentication fails, log the error and exit the process
		console.log('Unable to connect to the database:');
		console.log(error.message);
		process.exit(1);
	}
}

// Function to create database tables
async function assertDatabaseCreationOK() {
	// Check if '.dbinit' file exists
	const fs = require('fs');
	if (fs.existsSync('.dbinit')) {
		return;
	}

	// If file does not exist, run database setup script
	const runSetup = require('./sequelize/setup');
	await runSetup();

	// Write a new '.dbinit' file to indicate successful initialization
	fs.writeFile(".dbinit", "Database initialized", (err) => {
		if (err) {
			console.log(err);
		} else {
			console.log(fs.readFileSync(".dbinit", "utf8"));
		}
	});
}

// Main initialization function
async function init() {
	// Check database connection status
	await assertDatabaseConnectionOk();

	// Ensure that database tables have been created
	await assertDatabaseCreationOK();

	// Start the express server
	console.log(`Starting on port ${config.app.port}...`);
	app.listen(config.app.port, () => {
		console.log(`Express server started on port ${config.app.port}. Try some routes, such as '/api/token'.`);
	});
}

// Call the initialization function
init();