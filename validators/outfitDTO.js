const { body, param, validationResult } = require('express-validator');

// Validation for adding a new outfit
const validateAddOutfit = [
    // Ensure 'name' is a non-empty string
    body('name')
        .isString()
        .withMessage('Name must be a string')
        .notEmpty()
        .withMessage('Name is required'),

    // 'image' is optional, but if provided, it must be a Base64 string
    body('image')
        .optional()
        .isString()
        .withMessage('Image must be a Base64 string'),

    // 'details' is optional, but if provided, it must be a string
    body('details')
        .optional()
        .isString()
        .withMessage('Details must be a string'),

    // 'weather' is required and must be a string
    body('weather')
        .isString()
        .withMessage('Weather must be a string')
        .notEmpty()
        .withMessage('Weather is required'),

    // 'user_id' is required and must be an integer
    body('user_id')
        .notEmpty()
        .withMessage('User Id is required')
        .isInt()
        .withMessage('User Id must be an integer'),

    // Middleware to check for validation errors
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next(); // Proceed to the next middleware if validation is successful
    }
];

// Validation for updating an existing outfit
const validateSaveOutfit = [
    // Ensure 'name' is a non-empty string
    body('name')
        .isString()
        .withMessage('Name must be a string')
        .notEmpty()
        .withMessage('Name is required'),

    // Ensure 'image' is a Base64 string and required
    body('image')
        .isString()
        .withMessage('Image must be a Base64 string')
        .notEmpty()
        .withMessage('Image is required (Base64 string)'),

    // 'details' is optional, but if provided, it must be a string
    body('details')
        .optional()
        .isString()
        .withMessage('Details must be a string'),

    // 'weather' is required and must be a string
    body('weather')
        .isString()
        .withMessage('Weather must be a string')
        .notEmpty()
        .withMessage('Weather is required'),

    // 'user_id' is required and must be an integer
    body('user_id')
        .notEmpty()
        .withMessage('User Id is required')
        .isInt()
        .withMessage('User Id must be an integer'),
    
    body('selectedItems')
        .isArray()
        .withMessage('Selected items must be an array')
        .optional(), // This is optional, since it’s only included if items are selected

    // Middleware to check for validation errors
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next(); // Proceed to the next middleware if validation is successful
    }
];

// Validation for the outfit ID in route parameters (used in GET, PUT, DELETE routes)
const validateOutfitId = [
    // Ensure 'id' is an integer
    param('id')
        .isInt()
        .withMessage('Id must be an integer'),

    // Middleware to check for validation errors
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next(); // Proceed to the next middleware if validation is successful
    }
];

module.exports = {
    validateAddOutfit,
    validateSaveOutfit,
    validateOutfitId
}
