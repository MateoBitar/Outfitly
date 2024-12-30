// validators/containsDTO.js
const { body, param, validationResult } = require('express-validator');

// Validator for linking an item to an outfit
const validateLink = [
    // Validate that 'item_id' is not empty and is an integer
    body('item_id')
        .notEmpty()  // Ensures item_id is provided
        .withMessage('Item Id is required')  // Custom error message
        .isInt()  // Ensures item_id is an integer
        .withMessage('Item Id must be an integer'),  // Custom error message

    // Validate that 'outfit_id' is not empty and is an integer
    body('outfit_id')
        .notEmpty()  // Ensures outfit_id is provided
        .withMessage('Outfit Id is required')  // Custom error message
        .isInt()  // Ensures outfit_id is an integer
        .withMessage('Outfit Id must be an integer'),  // Custom error message

    // Middleware to handle validation errors
    (req, res, next) => {
        const errors = validationResult(req);  // Collect validation errors
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });  // Send 400 with error details if validation fails
        }
        next();  // Proceed to the next middleware if no errors
    }
];

// Validator for validating item_id in route parameters
const validateItem_Id = [
    param('item_id').isInt().withMessage('Item Id must be an integer'),  // Ensure item_id is an integer
    // Middleware to handle validation errors
    (req, res, next) => {
        const errors = validationResult(req);  // Collect validation errors
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });  // Return 400 status with errors if validation fails
        }
        next();  // Proceed to the next middleware if validation passes
    }
];

// Validator for validating outfit_id in route parameters
const validateOutfit_Id = [
    param('outfit_id').isInt().withMessage('Outfit Id must be an integer'),  // Ensure outfit_id is an integer
    // Middleware to handle validation errors
    (req, res, next) => {
        const errors = validationResult(req);  // Collect validation errors
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });  // Return 400 status with errors if validation fails
        }
        next();  // Proceed to the next middleware if validation passes
    }
];

// Export the validation middleware to be used in routes
module.exports = {
    validateLink,
    validateItem_Id,
    validateOutfit_Id
}
