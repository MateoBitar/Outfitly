// validator/eventDTO.js
const { body, param, validationResult } = require('express-validator');  // Import necessary functions from express-validator

// Validator for adding a new event
const validateAddEvent = [
    // Check if 'name' is a string and is not empty
    body('name')
        .isString()
        .withMessage('Name must be a string')
        .notEmpty()
        .withMessage('Name is required'),

    // 'desc' is optional but if provided, it must be a string
    body('desc')
        .optional()
        .isString()
        .withMessage('Description must be a string'),

    // Handle validation errors
    (req, res, next) => {
        const errors = validationResult(req);  // Collect validation errors
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });  // Send errors with 400 status if validation fails
        }
        next();  // If no errors, move to the next middleware
    }
];

// Validator for updating an event
const validateSaveEvent = [
    // 'name' must be a non-empty string
    body('name')
        .isString()
        .withMessage('Name must be a string')
        .notEmpty()
        .withMessage('Name is required'),

    // 'desc' is required and must be a string
    body('desc') 
        .notEmpty()
        .withMessage('Description is required')
        .isString()
        .withMessage('Description must be a string'),

    // Handle validation errors
    (req, res, next) => {
        const errors = validationResult(req);  // Collect validation errors
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });  // Send errors with 400 status if validation fails
        }
        next();  // If no errors, move to the next middleware
    }
];

// Validator for event ID (used in routes to validate ID parameters)
const validateEventId = [
    // 'id' should be an integer
    param('id').isInt().withMessage('Id must be an integer'),

    // Handle validation errors
    (req, res, next) => {
        const errors = validationResult(req);  // Collect validation errors
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });  // Send errors with 400 status if validation fails
        }
        next();  // If no errors, move to the next middleware
    }
];

module.exports = {
    validateAddEvent,
    validateSaveEvent,
    validateEventId  // Export all validators for use in routes
}
