// Import the dotenv module to load environment variables from a.env file
require('dotenv').config();

// Import the express module to create an Express.js application
const express = require('express');

// Create an instance of an Express.js application
const app = express();

// Import the default_routes module and use it as middleware for the app
// This will handle requests to the root (/) route of the application
const default_routes = require('./routes/default_routes');
app.use(default_routes);

// Import the user_api module and use it as middleware for the app
// This will handle requests to the /api/users route of the application
const user_api = require('./routes/api_user_routes');
app.use(user_api);

// Define the PORT constant as the value of the PORT environment variable or 3000 if it's not set
// This is the port number that the server will listen on
const PORT = process.env.PORT || 3000;

// Define the DBURI constant as the value of the DBURI environment variable or an empty string if it's not set
// This is the connection string for the database that the application will use
const DBURI = process.env.DBURI || '';

// Use the express.urlencoded() middleware to parse incoming request bodies as URL-encoded data
// This is necessary for handling form data in HTML forms
app.use(express.urlencoded({ extended: true }));

// Use the express.json() middleware to parse incoming request bodies as JSON data
// This is necessary for handling JSON data in API requests
app.use(express.json());

// Start the server and listen on the specified PORT
app.listen(PORT, () => {
    // Log a message to the console indicating that the server has started
    console.log(`Revving engine...`);
    console.log(`Server started at port ${PORT}\n------------------------------------`);

    // Call the connect_to_db() function to connect to the database using the specified DBURI
    // This is necessary for the application to be able to access the database
    connect_to_db(DBURI);
});