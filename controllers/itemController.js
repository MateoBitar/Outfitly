// controllers/itemController.js
const itemService = require('../services/itemService');
const userService = require('../services/userService');

class ItemController {

    // Method to add a new item
    async addItem(req, res) {
        try {
            // Destructuring the request body to extract item data
            const { name, base64Image, category, style, brand, color, user_id } = req.body;
            
            // Checking if the user exists before proceeding
            const user = await userService.getUserById(user_id);
            if (!user) {
                //return res.status(404).json({ message: 'User not found' });
                res.status(404).render('errorView', { error: 'User not found' });
            }

            
            if (!base64Image.startsWith('data:image')) {
                throw new Error('Invalid image format');
            }
            
            // Calling the service to add the item
            await itemService.addItem({ name, base64Image, category, style, brand, color, user_id });
            // Redirect back to the garments tab after adding the item
            res.redirect(`/outfitly/items/user_id/${res.locals.user.id}`);
        } catch (e) {
            //console.error('Error creating outfit:', e);
            //res.status(500).json({ message: 'Internal server error' });
            res.status(500).render('errorView', { error: 'Failed to create item' });
        }
    }

    // Method to get all items
    async getAllItems(req, res) {
        try {
            // Fetching all items from the service
            const items = await itemService.getAllItems();
            res.status(200).json(items); // Returning the list of items
        } catch (e) {
            console.error('Error fetching items:', e);
            res.status(500).json({ message: 'Internal server error' }); // Handling errors
        }
    }

    // Method to get an item by its ID
    async getItemById(req, res) {
        try {
            const id = parseInt(req.params.id, 10); // Extracting ID from URL parameters
            const item = await itemService.getItemById(id);
            if (!item) {
                return res.status(404).json({ message: 'Item not found' }); // Handling item not found
            }
            res.status(200).json(item); // Returning the item data
        } catch (e) {
            console.error('Error fetching item:', e);
            res.status(500).json({ message: 'Internal server error' }); // Handling errors
        }
    }

    // Method to update an existing item
    async saveItem(req, res) {
        try {
            const id = parseInt(req.params.id, 10); // Extracting ID from URL parameters
            const { name, image, category, style, brand, color, user_id } = req.body;
            
            // Calling the service to update the item
            const success = await itemService.saveItem(id, { name, image, category, style, brand, color, user_id });
            if (!success) {
                return res.status(404).json({ message: 'Item not found or no changes made' }); // Handling item not found or no changes
            }

            // Checking if the user exists
            const user = await userService.getUserById(user_id);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json({ message: 'Item updated successfully' }); // Returning success message
        } catch (e) {
            console.error('Error saving item:', e);
            res.status(500).json({ message: 'Internal server error' }); // Handling errors
        }
    }

    // Method to delete an item
    async deleteItem(req, res) {
        try {
            const id = parseInt(req.params.id, 10); // Extracting ID from URL parameters
            const success = await itemService.deleteItem(id);
            
            if (!success) {
                //return res.status(404).json({ message: 'Item not found' }); // Handling item not found
                return res.status(404).render('errorView', { error: 'Item not found' });
            }
            
            //res.status(200).json({ message: 'Item deleted successfully' }); // Returning success message
            res.status(404).redirect(`/outfitly/items/user_id/${res.locals.user.id}`);
        } catch (e) {
            console.error('Error deleting item:', e);
            res.status(500).json({ message: 'Internal server error' }); // Handling errors
        }
    }

    async getUserItems(req, res) {
        try {
            const userId = res.locals.user.id; // Assuming the user ID is stored in res.locals.user
    
            // Call the service to fetch items
            const items = await itemService.getUserItems(userId);
    
            // Render the item selection view with the fetched items
            res.status(200).render('selectItemsView', { items });
        } catch (e) {
            //console.error('Error fetching user items:', e);
            res.status(500).render('errorView', { error: 'Failed to fetch items.' });
        }
    }

    async getGarmentsByUserId(req, res) {
        try {
            const id = parseInt(req.params.id, 10); // Assuming the user ID is stored in res.locals.user

            // Call the service to fetch items
            const garments = await itemService.getUserItems(id);
            
            if (!garments) {
                //return res.status(404).json({ message: 'User not found' });
                return res.status(404).render('errorView', { error: 'User not found' });
            }

            // Render the item selection view with the fetched items
            res.status(200).render('garmentsView', { garments });
        } catch (e) {
            //console.error('Error fetching user items:', e);
            //res.status(500).json({ message: 'Internal server error' });
            res.status(500).render('errorView', { error: 'Failed to fetch items.' });
        }
    }
    
}

// Exporting a single instance of the controller class
module.exports = new ItemController();
