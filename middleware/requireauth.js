// Import the jwt library
const jwt = require('jsonwebtoken');

// Define a function to require authentication
const requireAuth = (req, res, next) => {
  // Get the authorization header from the request
  const token = req.headers.authorization?.split(' ')[1];

  // Check if the token is present and is a string
  if (typeof token!== 'undefined' && typeof token === 'string') {
    // Use jwt.verify to verify the token
    jwt.verify(token, process.env.JWTSECRET, async (err, decodedtoken) => {
      // If there's no error, the token is valid
      if (!err) {
        // Get the user from the decoded token
        const { user } = decodedtoken;

        // Add the user to the request body
        req.body.user = user;

        // Call the next middleware function
        next();
      } else {
        // If there's an error, send a 404 response with an error message
        res.status(404).json({ message: "Access denied!" });
      }
    });
  } else {
    // If the token is not present or is not a string, send a 404 response with an error message
    res.status(404).json({ message: "Access denied!" });
  }
};

// Export the requireAuth function
module.exports = {
  requireAuth,
};