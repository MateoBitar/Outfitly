// controllers/outfit_suggestController.js
const outfitSuggestionService = require('../services/outfit_suggestService');
const userService = require('../services/userService');
const outfitService = require('../services/outfitService');

// OutfitSuggestionController handles the logic for managing outfit suggestions
class OutfitSuggestionController {

    // Add a new outfit suggestion to the system
    async addOutfitSuggestion(req, res) {
        try {
            const { user_id, outfit_id } = req.body;

            // Check if the user exists
            const user = await userService.getUserById(user_id);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            // Check if the outfit exists
            const outfit = await outfitService.getOutfitById(outfit_id);
            if (!outfit) {
                return res.status(404).json({ message: 'Outfit not found' });
            }

            // Create a new outfit suggestion
            const newOutfitSuggestion = await outfitSuggestionService.addOutfitSuggestion({ user_id, outfit_id });
            res.status(201).json(newOutfitSuggestion); // Return the created outfit suggestion
        } catch (e) {
            console.error('Error creating outfit suggestion:', e);
            res.status(500).json({message: 'Internal server error'}); // Return error if something goes wrong
        }
    }

    // Get all outfit suggestions from the database
    async getAllOutfitSuggestions(req, res) {
        try {
            const outfitsuggestions = await outfitSuggestionService.getAllOutfitSuggestions();
            res.status(200).json(outfitsuggestions); // Return all outfit suggestions
        } catch (e) {
            console.error('Error fetching outfit suggestions:', e);
            res.status(500).json({ message: 'Internal server error' }); // Return error if fetching fails
        }
    }

    // Get a specific outfit suggestion by its ID
    async getOutfitSuggestionById(req, res) {
        try {
            const id = parseInt(req.params.id, 10);

            // Fetch outfit suggestion by ID
            const outfitsuggestion = await outfitSuggestionService.getOutfitSuggestionById(id);
            if (!outfitsuggestion) {
                return res.status(404).json({ message: 'Outfit Suggestion not found' });
            }
            res.status(200).json(outfitsuggestion); // Return the found outfit suggestion
        } catch (e) {
            console.error('Error fetching outfit suggestion:', e);
            res.status(500).json({ message: 'Internal server error' }); // Return error if fetching fails
        }
    }

    // Update an existing outfit suggestion
    async saveOutfitSuggestion(req, res) {
        try {
            const id = parseInt(req.params.id, 10);
            const { user_id, outfit_id } = req.body;

            // Check if the user exists
            const user = await userService.getUserById(user_id);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            // Check if the outfit exists
            const outfit = await outfitService.getOutfitById(outfit_id);
            if (!outfit) {
                return res.status(404).json({ message: 'Outfit not found' });
            }

            // Save the outfit suggestion
            const success = await outfitSuggestionService.saveOutfitSuggestion(id, { user_id, outfit_id });
            if (!success) {
                return res.status(404).json({ message: 'Outfit Suggestion not found or no changes made' });
            }
            res.status(200).json({ message: 'Outfit Suggestion updated successfully' }); // Return success message
        } catch (e) {
            console.error('Error saving outfit suggestion:', e);
            res.status(500).json({ message: 'Internal server error' }); // Return error if saving fails
        }
    }

    // Delete an outfit suggestion
    async deleteOutfitSuggestion(req, res) {
        try {
            const id = parseInt(req.params.id, 10);

            // Delete the outfit suggestion
            const success = await outfitSuggestionService.deleteOutfitSuggestion(id);
            if (!success) {
                return res.status(404).json({ message: 'Outfit Suggestion not found' });
            }
            res.status(200).json({ message: 'Outfit Suggestion deleted successfully' }); // Return success message
        } catch (e) {
            console.error('Error deleting outfit suggestion:', e);
            res.status(500).json({ message: 'Internal server error' }); // Return error if deletion fails
        }
    }

    async getOutfitSuggestionsByUserId(req, res) {
        try {
            const userId = res.locals.user.id; // Assume user is authenticated
            const suggestions = await outfitSuggestionService.getOutfitSuggestionsByUserId(userId);
            
            res.render('suggestOutfitView', { user: req.session.user, suggestions });
        } catch (e) {
            //console.error('Error fetching outfit suggestions:', error);
            //res.status(500).send('Error fetching outfit suggestions');
            return res.status(500).render('addEventView', { error: 'Must create an Outfit first!' });
        }
    };
    
}

module.exports = new OutfitSuggestionController();
