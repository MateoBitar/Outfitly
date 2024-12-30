// controllers/userController.js
const userService = require('../services/userService'); // Import the UserService for user operations

// Define the UserController class to handle HTTP requests related to user actions
class UserController {

    // Controller method to add a new user
    async addUser(req, res) {
        try {
            const { name, email, pass, gender, style, fav_color } = req.body; // Extract user data from request body
            // Check if the username already exists
            const existingUser = await userService.findUserByName(name);
            if (existingUser) {
                //return res.status(409).json({ message: 'Username already exists' }); // Respond with error if username is taken
                return res.status(409).render('signInView', { error: 'Username already exists' });
            }
            const newUser = await userService.addUser({ name, email, pass, gender, style, fav_color }); // Call the service to add user
            //res.status(201).json(newUser); // Send back the newly created user with status 201
            // Redirect to login page after successful signup
            if (newUser) {
                return res.redirect('/outfitly/login');
            } else {
                return res.status(500).render('signInView', { error: 'Unable to create user. Please try again later.' });
            }
        } catch (e) {
            //console.error('Error creating user:', e); // Log error to the console
            //res.status(500).json({ message: 'Internal server error' }); // Respond with a 500 error
            return res.status(500).render('signInView', { error: 'Something went wrong' });
        }
    }

    // Controller method to get all users
    async getAllUsers(req, res) {
        try {
            const users = await userService.getAllUsers(); // Call the service to get all users
            res.status(200).json(users); // Respond with the list of users and status 200
        } catch (e) {
            console.error('Error fetching users:', e); // Log error to the console
            res.status(500).json({ message: 'Internal server error' }); // Respond with a 500 error
        }
    }

    // Controller method to get a user by their ID
    async getUserById(req, res) {
        try {
            const userId = req.session.user ? req.session.user.id : null;
            if (!userId) {
                // Redirect to login if no user is logged in
                return res.redirect('/outfitly/login');
            }
            const user = await userService.getUserById(userId); // Call the service to get user by ID
            if (!user) {
                //return res.status(404).json({ message: 'User not found' }); // Respond with 404 if user not found
                // If the user is not found, log out the session and redirect to login
                req.session.destroy();
                return res.redirect('/outfitly/login');
            }
            //res.status(200).json(user); // Respond with the user data and status 200
            res.render('eventsView', { user });
        } catch (e) {
            //console.error('Error fetching user:', e); // Log error to the console
            //res.status(500).json({ message: 'Internal server error' }); // Respond with a 500 error
            return res.status(500).render('/outfitly/login', { error: 'Unable to reach user data' });
        }
    }

    // Controller method to update a user's data
    async saveUser(req, res) {
        try {
            const id = parseInt(req.params.id, 10); // Convert ID parameter to integer
            const { name, email, pass, gender, style, fav_color } = req.body; // Extract updated user data from request body
            // Fetch the current user by ID
            const currentUser = await userService.getUserById(id);
            // Check if user exists
            if (!currentUser) {
                //return res.status(404).json({ message: 'User not found'}); // Respond with 404 if user not found
                return res.status(404).render('errorView', { error: 'User not found'}); // Respond with 404 if user not found
            }
            // Check if the username has changed
            if (name !== currentUser.name) {
                // If the username has changed, check if the new username already exists
                const existingUser = await userService.findUserByName(name);
                if (existingUser) {
                    //return res.status(409).json({ message: 'Username already exists' }); // Respond with 409 if username already exists
                    return res.status(409).render('errorView', { error: 'User already exists'});
                }
            }

            const success = await userService.saveUser(id, { name, email, pass, gender, style, fav_color }); // Call the service to update user
            if (!success) {
                //return res.status(304).json({ message: 'No changes made' }); // Respond with 304 if no update occurred
                return res.status(304).render('errorView', { error: 'No changes made'});
            }

            req.session.user = {
                id: id,
                name: name,
                email: email,
                pass: pass,
                gender: gender,
                style: style,
                fav_color: fav_color
            };
            
            //res.status(200).json({ message: 'User updated successfully' }); // Respond with success message and status 200
            res.status(200).redirect(`/outfitly/attends/user_id/${res.locals.user.id}#user-popup`);
        } catch (e) {
            //console.error('Error saving user:', e); // Log error to the console
            //res.status(500).json({ message: 'Internal server error' }); // Respond with a 500 error
            return res.status(500).render('errorView' , { error: 'Internal server error'});
        }
    }

    // Controller method to delete a user by their ID
    async deleteUser(req, res) {
        try {
            const id = parseInt(req.params.id, 10); // Convert ID parameter to integer
            const success = await userService.deleteUser(id); // Call the service to delete user
            if (!success) {
                return res.status(404).json({ message: 'User not found' }); // Respond with 404 if user not found
            }
            res.status(200).json({ message: 'User deleted successfully' }); // Respond with success message and status 200
        } catch (e) {
            console.error('Error deleting user:', e); // Log error to the console
            res.status(500).json({ message: 'Internal server error' }); // Respond with a 500 error
        }
    }

    // Controller method to check user login credentials
    async checkLogin(req, res) {
        try {
            const { name, pass } = req.body; // Extract login credentials from request body
            const success = await userService.checkLogin(name, pass); // Call the service to check login credentials
            if (!success) {
                //return res.status(401).json({ message: 'Incorrect Username or Password' }); // Respond with 401 if login fails
                // In your checkLogin method
                return res.status(401).render('loginView', { error: 'Invalid credentials' });

            }
            //res.status(200).json({ message: 'User login successful' }); // Respond with success message and status 200
            req.session.user = {
                id: success.user_id,
                name: success.username,
                email: success.email,
                pass: success.pass,
                gender: success.gender,
                style: success.style,
                fav_color: success.fav_color
            }; 
            res.redirect(`/outfitly/attends/user_id/${req.session.user.id}`);
        } catch (e) {
            //console.error('Error during login:', e); // Log error to the console
            //res.status(500).json({ message: 'Internal server error' }); // Respond with a 500 error
            res.status(500).render('loginView', { error: 'Something went wrong' });
        }
    }
}

module.exports = new UserController(); // Export an instance of UserController
