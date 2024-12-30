// services/outfitService.js
const { initDB } = require('../config/database'); // Import database initialization
const Outfit = require('../models/outfitModel'); // Import the Outfit model
const sharp = require("sharp"); // Import sharp for image processing

class OutfitService {
    constructor() {
        this.pool = null; // Initialize database pool as null
        this.init(); // Call init to set up the database connection
    }

    // Initialize database connection pool
    async init() {
        this.pool = await initDB();
    }

// Add a new outfit to the database
async addOutfit(outfitData) {
    const { name, base64Image = null, details = "No details", weather, user_id } = outfitData;
    
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

    if (imageBuffer) {
        try {
            // Compress and resize the image using sharp
            imageBuffer = await sharp(imageBuffer)
                .resize(800, 1000, { fit: 'inside' }) // Resize to fit within 800x1000, preserving aspect ratio
                .jpeg({ quality: 75 }) // Compress to JPEG with quality setting
                .toBuffer();
        } catch (e) {
            console.error('Error compressing image:', e);
            throw new Error('Image compression failed');
        }
    }

    // Insert the outfit record into the database
    const [result] = await this.pool.query(
        'INSERT INTO outfits (outfit_name, outfit_image, details, weather, user_id) VALUES (?, ?, ?, ?, ?)',
        [name, imageBuffer, details, weather, user_id]
    );

    // Return the newly created outfit with generated ID
    return { id: result.insertId, name, image: imageBuffer, details, weather, user_id };
}


    // Retrieve all outfits from the database
    async getAllOutfits() {
        try {
            const [rows] = await this.pool.query('SELECT * FROM outfits');
            return rows.map(Outfit.fromRow); // Map each row to an Outfit instance
        } catch (e) {
            console.error(e);
            throw new Error();
        }
    }

    // Retrieve a specific outfit by ID
    async getOutfitById(id) {
        const [rows] = await this.pool.query('SELECT * FROM outfits WHERE outfit_id = ?', [id]);
        if (rows.length === 0) return null; // Return null if no outfit is found
        return Outfit.fromRow(rows[0]); // Convert row to an Outfit instance
    }

    // Update an outfit by ID
    async saveOutfit(id, outfitData) {
        const { name, image, details, weather, user_id } = outfitData;

        // Decode the image from base64 if provided
        let imageBuffer = image ? Buffer.from(image, 'base64') : null;

        if (imageBuffer) {
            try {
                // Compress and resize the image using sharp
                imageBuffer = await sharp(imageBuffer)
                    .resize(800, 1000, { fit: 'inside' })
                    .jpeg({ quality: 75 })
                    .toBuffer();
            } catch (e) {
                console.error('Error compressing image:', e);
                throw new Error('Image compression failed');
            }
        }

        // Update the outfit record in the database
        const [result] = await this.pool.query(
            'UPDATE outfits SET outfit_name = ?, outfit_image = ?, details = ?, weather = ?, user_id = ? WHERE outfit_id = ?',
            [name, imageBuffer, details, weather, user_id, id]
        );

        // Return true if any row was affected (updated)
        return result.affectedRows > 0;
    }

    // Delete an outfit by ID
    async deleteOutfit(id) {
        const [result] = await this.pool.query('DELETE FROM outfits WHERE outfit_id = ?', [id]);
        return result.affectedRows > 0; // Return true if a row was deleted
    }

    async getOutfitsByUserId(userId) {
        try {
            // Query to get outfits for a specific user
            const [rows] = await this.pool.query(
                'SELECT * FROM outfits WHERE user_id = ?',
                [userId]
            );
            if (rows.length === 0) return [];
            return rows;
        } catch (e) {
            console.error('Error fetching outfits for user:', e);
            throw new Error('Failed to fetch outfits for the user.');
        }
    }
}

module.exports = new OutfitService(); // Export a singleton instance of OutfitService
