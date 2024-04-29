// Import the mongoose library
const mongoose = require('mongoose');

// Define a constant for the database name
const DBNAME = "dev-test";

// Define a function to connect to the database
const connect_to_db = URI => {
  // Initialize a variable to track the connection state
  let state = 'unresolved';

  // Log a message indicating that we're attempting to connect to the database
  console.info(`Attempting to connect to mongo database @ URI: \n${URI}`);

  // Use mongoose to connect to the database
  mongoose.connect(URI, {
    // Pass the database name as an option
    DBNAME
  })
   .then(result => {
      // If the connection is successful, set the state to 'established!'
      state = 'established!';
    })
   .catch(err => {
      // If there's an error, log it to the console and set the state to 'unresolved!'
      console.error('\n', err, '\n');
      state = 'unresolved!';
    })
   .finally(() => {
      // Log a message indicating whether the connection attempt was successful or not
      console.info(`Connection attempt finished! Connection to database ${state}`);
    });
};

// Export the connect_to_db function
module.exports = {
  connect_to_db,
};