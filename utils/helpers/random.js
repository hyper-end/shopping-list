/*
	Since we are using these for seeding some data to database, the random function accuracy is not important.
*/

// Function to pick a random element from an array
function pickRandom(args) {
	return args[Math.floor(Math.random() * args.length)];
}

// Function to generate a random date within the past 5 years
function randomDate() {
	return new Date(new Date() - 200000000000 * Math.random());
}

// Export the functions for use in other files
module.exports = { pickRandom, randomDate };
