// validators/itemDTO.js
const { body, param, validationResult } = require('express-validator');

// Validation rules for adding an item
const validateAddItem = [
    // Validate 'name' field: must be a non-empty string
    body('name')
        .isString()
        .withMessage('Name must be a string')
        .notEmpty()
        .withMessage('Name is required'),
    
    // Validate 'image' field: optional, must be a base64 string if provided
    body('image')
        .optional()
        .isString()
        .withMessage('Image must be a Base64 string'),
    
    // Validate 'category' field: must be a non-empty string and match allowed categories
    body('category')
        .notEmpty()
        .withMessage('Category is required')
        .isIn(['Tops', 'Bottoms', 'Footwear', 'Headwear', 'Accessories'])
        .withMessage('Must be one of those: Tops, Bottoms, Footwear, Headwear, Accessories'),
    
    // Validate 'style' field: must be a non-empty string
    body('style')
        .isString()
        .withMessage('Style must be a string')
        .notEmpty()
        .withMessage('Style is required'),
    
    // Validate 'brand' field: must be a non-empty string
    body('brand')
        .isString()
        .withMessage('Brand must be a string')
        .notEmpty()
        .withMessage('Brand is required'),
    
    // Validate 'color' field: must be a non-empty string
    body('color')
        .isString()
        .withMessage('Color must be a string')
        .notEmpty()
        .withMessage('Color is required'),
    
    // Validate 'user_id' field: must be a non-empty integer
    body('user_id')
        .notEmpty()
        .withMessage('User Id is required')
        .isInt()
        .withMessage('User Id must be an integer'),
    
    // Middleware to check for validation errors
    (req, res, next) => {
        const errors = validationResult(req); // Collect validation errors
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() }); // If errors, respond with 400
        }
        next(); // If no errors, proceed to the next middleware
    }
];

// Validation rules for saving an item
const validateSaveItem = [
    // 'name' validation as before
    body('name')
        .isString()
        .withMessage('Name must be a string')
        .notEmpty()
        .withMessage('Name is required'),
    
    // 'image' validation as before, but required in this case
    body('image')
        .isString()
        .withMessage('Image must be a Base64 string')
        .notEmpty()
        .withMessage('Image is required (Base64 string)'),
    
    // 'category' validation as before
    body('category')
        .notEmpty()
        .withMessage('Category is required')
        .isIn(['Tops', 'Bottoms', 'Footwear', 'Headwear', 'Accessories'])
        .withMessage('Must be one of those: Tops, Bottoms, Footwear, Headwear, Accessories'),
    
    // 'style' validation as before
    body('style')
        .isString()
        .withMessage('Style must be a string')
        .notEmpty()
        .withMessage('Style is required'),
    
    // 'brand' validation as before
    body('brand')
        .isString()
        .withMessage('Brand must be a string')
        .notEmpty()
        .withMessage('Brand is required'),
    
    // 'color' validation as before
    body('color')
        .isString()
        .withMessage('Color must be a string')
        .notEmpty()
        .withMessage('Color is required'),
    
    // 'user_id' validation as before
    body('user_id')
        .notEmpty()
        .withMessage('User Id is required')
        .isInt()
        .withMessage('User Id must be an integer'),
    
    // Middleware to check for validation errors
    (req, res, next) => {
        const errors = validationResult(req); // Collect validation errors
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() }); // If errors, respond with 400
        }
        next(); // If no errors, proceed to the next middleware
    }
];

// Validation rules for validating an item's ID in the URL parameters
const validateItemId = [
    // Validate 'id' parameter: must be an integer
    param('id').isInt().withMessage('Id must be an integer'),
    
    // Middleware to check for validation errors
    (req, res, next) => {
        const errors = validationResult(req); // Collect validation errors
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() }); // If errors, respond with 400
        }
        next(); // If no errors, proceed to the next middleware
    }
];

module.exports = {
    validateAddItem,
    validateSaveItem,
    validateItemId
};
