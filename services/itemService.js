const { initDB } = require('../config/database');
const Item = require('../models/itemModel');
const sharp = require("sharp");

class ItemService {
    constructor() {
        this.pool = null;
        this.init();
    }

    // Initializes the database connection pool
    async init() {
        this.pool = await initDB();
    }

    // Adds a new item to the wardrobe
    async addItem(itemData) {
        const {name, base64Image = null, category, style, brand, color, user_id} = itemData;
        
        if (!base64Image || base64Image.length < 100) {
            throw new Error('Base64 image data is empty or invalid');
        }
        
        // Decode the base64 image data
        let imageBuffer = null;
        if (base64Image.startsWith('data:image')) {
            // Strip out the MIME type and base64 header
            imageBuffer = base64Image.replace(/^data:image\/[a-zA-Z]+;base64,/, '');
        }
    
        // Now decode the base64 string to a buffer
        if (imageBuffer) {
            imageBuffer = Buffer.from(imageBuffer, 'base64');
        }

        // If an image is provided, compress and resize it using sharp
        if (imageBuffer) {
            try {
                imageBuffer = await sharp(imageBuffer)
                    .resize(800, 1000, { fit: 'inside' }) // Resize while preserving aspect ratio
                    .jpeg({ quality: 75 }) // Compress with quality setting
                    .toBuffer();
            } catch (e) {
                console.error('Error compressing image:', e);
                throw new Error('Image compression failed');
            }
        }

        // Insert the item data into the wardrobe_items table
        const [result] = await this.pool.query(
            'INSERT INTO wardrobe_items (item_name, item_image, category, item_style, brand, color, user_id) VALUES (?, ?, ?, ?, ?, ?, ?)', 
            [name, imageBuffer, category, style, brand, color, user_id]
        );

        // Return the newly inserted item data with its generated ID
        return {id: result.insertId, name, image: imageBuffer, category, style, brand, color, user_id};
    }

    // Retrieves all items from the wardrobe
    async getAllItems() {
        try {
            const [rows] = await this.pool.query('SELECT * FROM wardrobe_items');
            // Map the rows to Item objects using the fromRow method
            return rows.map(Item.fromRow);
        } catch (e) {
            console.error(e);
            throw new Error('Error fetching items');
        }
    }

    // Retrieves a single item by its ID
    async getItemById(id) {
        const [rows] = await this.pool.query('SELECT * FROM wardrobe_items WHERE item_id = ?', [id]);
        if (rows.length === 0) return null;
        // Return the mapped Item object for the row
        return Item.fromRow(rows[0]);
    }

    // Updates an existing item in the wardrobe
    async saveItem(id, itemData) {
        const {name, image, category, style, brand, color, user_id} = itemData;

        // Decode the image from base64 if provided, otherwise set it to null
        let imageBuffer = image ? Buffer.from(image, 'base64') : null;

        // If an image is provided, compress and resize it using sharp
        if (imageBuffer) {
            try {
                imageBuffer = await sharp(imageBuffer)
                    .resize(800, 1000, { fit: 'inside' }) // Resize while preserving aspect ratio
                    .jpeg({ quality: 75 }) // Compress with quality setting
                    .toBuffer();
            } catch (e) {
                console.error('Error compressing image:', e);
                throw new Error('Image compression failed');
            }
        }

        // Update the item data in the wardrobe_items table
        const [result] = await this.pool.query(
            'UPDATE wardrobe_items SET item_name = ?, item_image = ?, category = ?, item_style = ?, brand = ?, color = ?, user_id = ? WHERE item_id = ?',
            [name, imageBuffer, category , style, brand, color, user_id, id]
        );
        
        // Return true if the update affected any rows (i.e., the item was updated)
        return result.affectedRows > 0;
    }

    // Deletes an item from the wardrobe by its ID
    async deleteItem(id) {
        const [result] = await this.pool.query('DELETE FROM wardrobe_items WHERE item_id = ?', [id]);
        // Return true if the deletion affected any rows (i.e., the item was deleted)
        return result.affectedRows > 0;
    }

    async getUserItems(id) {
        try {
            const [items] = await this.pool.query(
            'SELECT * FROM wardrobe_items WHERE user_id = ?', [id]
            );
            if(items.length === 0) return [];
            return items;
        } catch (e) {
            console.error('Error fetching items for user:', e);
            throw new Error('Failed to fetch items for the user.');
        }
    }
}

module.exports = new ItemService();
