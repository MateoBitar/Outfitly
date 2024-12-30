// controllers/weekController.js
const weekService = require('../services/weekService');   // Import the week service for database operations
const userService = require('../services/userService');   // Import the user service to check if the user exists

class WeekController {

    // Method to add a new week entry
    async addWeek(req, res) {
        try {
            const { day, user_id } = req.body;  // Extract day and user_id from the request body
            const user = await userService.getUserById(user_id);  // Check if the user exists
            if (!user) {  // If user doesn't exist, return a 404 response
                return res.status(404).json({ message: 'User not found' });
            }
            // Add the new week to the database and return the created week
            const newWeek = await weekService.addWeek({ day, user_id });
            res.status(201).json(newWeek);
        } catch (e) {
            console.error('Error creating week:', e);  // Log any errors
            res.status(500).json({ message: 'Internal server error' });  // Return a 500 server error
        }
    }

    // Method to retrieve all weeks from the database
    async getAllWeeks(req, res) {
        try {
            const weeks = await weekService.getAllWeeks();  // Get all weeks
            res.status(200).json(weeks);  // Return the list of weeks
        } catch (e) {
            console.error('Error fetching weeks:', e);  // Log any errors
            res.status(500).json({ message: 'Internal server error' });  // Return a 500 server error
        }
    }

    // Method to retrieve a specific week by ID
    async getWeekById(req, res) {
        try {
            const id = parseInt(req.params.id, 10);  // Get the week ID from the request parameters
            const week = await weekService.getWeekById(id);  // Fetch the week from the service
            if (!week) {  // If no week is found, return a 404 response
                res.status(404).json({ message: 'Week not found' });
            }
            res.status(200).json(week);  // Return the week data
        } catch (e) {
            console.error('Error fetching week:', e);  // Log any errors
            res.status(500).json({ message: 'Internal server error' });  // Return a 500 server error
        }
    }

    // Method to save changes to an existing week
    async saveWeek(req, res) {
        try {
            const id = parseInt(req.params.id, 10);  // Get the week ID from the request parameters
            const { day, user_id } = req.body;  // Get the new week data from the request body
            const success = await weekService.saveWeek(id, { day, user_id });  // Save the updated week
            if (!success) {  // If no rows are updated, return a 404 response
                return res.status(404).json({ message: 'Week not found or no changes made' });
            }
            const user = await userService.getUserById(user_id);  // Check if the user exists
            if (!user) {  // If user doesn't exist, return a 404 response
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json({ message: 'Week updated successfully' });  // Return a success message
        } catch (e) {
            console.error('Error saving week:', e);  // Log any errors
            res.status(500).json({ message: 'Internal server error' });  // Return a 500 server error
        }
    }

    // Method to delete a specific week by ID
    async deleteWeek(req, res) {
        try {
            const id = parseInt(req.params.id, 10);  // Get the week ID from the request parameters
            const success = await weekService.deleteWeek(id);  // Delete the week from the service
            if (!success) {  // If no rows are deleted, return a 404 response
                return res.status(404).json({ message: 'Week not found' });
            }
            res.status(200).json({ message: 'Week deleted successfully' });  // Return a success message
        } catch (e) {
            console.error('Error deleting week:', e);  // Log any errors
            res.status(500).json({ message: 'Internal server error' });  // Return a 500 server error
        }
    }
}

module.exports = new WeekController();  // Export an instance of the WeekController class
