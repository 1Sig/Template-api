// Importing necessary modules and middleware
const router = require('express').Router();
const { requireAuth } = require('../middleware/requireauth');
const {
    createuser,
    authenticateuser,
    createTEMPLATE,
    deleteuser
} = require('../controllers/usercontroller');

// Routing for user creation
// POST request to '/create-user'
router.post('/create-user', createuser);

// Routing for user authentication
// POST request to '/authenticate'
router.post('/authenticate', authenticateuser);

// Routing for creating a new TEMPLATE
// Protected route, requires authentication
// POST request to '/create-TEMPLATE'
router.post('/create-TEMPLATE', requireAuth, createTEMPLATE);

// Routing for deleting a user
// Protected route, requires authentication
// DELETE request to '/delete-user'
router.delete('/delete-user', requireAuth, deleteuser);

// Exporting the router for use in other modules
module.exports = router;