// validators/userValidator.js
const { body, param, validationResult } = require('express-validator'); // Import validation functions from express-validator

// Validation rules for adding a new user
const validateAddUser = [
    // Validate 'name' - must be a non-empty string
    body('name')
        .isString()
        .withMessage('Name must be a string')
        .notEmpty()
        .withMessage('Name is required'),

    // Validate 'email' - must be a valid email format and non-empty
    body('email')
        .isEmail()
        .withMessage('Email must be valid')
        .notEmpty()
        .withMessage('Email is required'),

    // Validate 'pass' (password) - must be a non-empty string with at least 4 characters
    body('pass')
        .isString()
        .withMessage('Password must be valid')
        .notEmpty()
        .withMessage('Password is required')
        .isLength({ min: 4 })
        .withMessage('Password should be 4 characters minimum'),

    // Validate 'gender' - must be 'Male' or 'Female' and non-empty
    body('gender')
        .notEmpty()
        .withMessage('Gender is required')
        .isIn(['Male', 'Female'])
        .withMessage('Gender must be Male or Female'),

    // Optional validation for 'style' - must be a string if provided
    body('style')
        .optional()
        .isString()
        .withMessage('Style must be a string'),

    // Optional validation for 'fav_color' - must be a string if provided
    body('fav_color')
        .optional()
        .isString()
        .withMessage('Color must be a string'),

    // Handle validation errors
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next(); // Move to the next middleware if validation passes
    }
];

// Validation rules for updating a user
const validateSaveUser = [
    // Same validation rules as validateAddUser but all fields are required, including 'style' and 'fav_color'
    body('name')
        .isString()
        .withMessage('Name must be a string')
        .notEmpty()
        .withMessage('Name is required'),

    body('email')
        .isEmail()
        .withMessage('Email must be valid')
        .notEmpty()
        .withMessage('Email is required'),

    body('pass')
        .isString()
        .withMessage('Password must be valid')
        .notEmpty()
        .withMessage('Password is required'),

    body('gender')
        .notEmpty()
        .withMessage('Gender is required')
        .isIn(['Male', 'Female'])
        .withMessage('Gender must be Male or Female'),

    body('style')
        .notEmpty()
        .withMessage('Style is required')
        .isString()
        .withMessage('Style must be a string'),

    body('fav_color')
        .notEmpty()
        .withMessage('Favorite Color is required')
        .isString()
        .withMessage('Color must be a string'),

    // Handle validation errors
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

// Validation rules for user login
const validateUserLogin = [
    // Validate 'name' - must be a non-empty string
    body('name')
        .isString()
        .withMessage('Name must be a string')
        .notEmpty()
        .withMessage('Name is required'),

    // Validate 'pass' - must be a non-empty string
    body('pass')
        .isString()
        .withMessage('Password must be valid')
        .notEmpty()
        .withMessage('Password is required'),
];

// Validation for 'id' parameter in routes - must be an integer
const validateUserId = [
    param('id').isInt().withMessage('Id must be an integer'),

    // Handle validation errors
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

// Export the validation functions
module.exports = {
    validateAddUser,
    validateSaveUser,
    validateUserLogin,
    validateUserId
}
