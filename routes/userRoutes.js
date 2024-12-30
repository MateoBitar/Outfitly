// routes/userRoutes.js
const express = require('express'); // Import Express framework
const { validateAddUser, validateSaveUser, validateUserLogin, validateUserId } = require('../validators/userDTO'); // Import validation middleware
const userController = require('../controllers/userController'); // Import UserController to handle request logic

const router = express.Router(); // Create a new router instance

// Define routes

// Route to add a new user, with validation for user data
router.post('/signIn', validateAddUser, (req, res) => userController.addUser(req, res));

// Route to log in a user, with validation for login credentials
router.post('/login', validateUserLogin, (req, res) => userController.checkLogin(req, res));

router.get('/updateUser', (req, res) => {
    // Assuming user is available in req.locals
    res.render('user', { user: res.locals.user });
});

// Route to get all users without any specific validation required
router.get('/', (req, res) => userController.getAllUsers(req, res));

// Route to get a specific user by ID, with ID validation
router.get('/:id', validateUserId, (req, res) => userController.getUserById(req, res));

// Route to update a user by ID, with both ID and user data validation
router.post('/saveUser/:id', [validateUserId, validateSaveUser], (req, res) => userController.saveUser(req, res));

// Route to delete a user by ID, with ID validation
router.delete('/:id', validateUserId, (req, res) => userController.deleteUser(req, res));

module.exports = router; // Export the router for use in the main app
