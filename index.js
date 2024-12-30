// server.js

// Importing required dependencies
const express = require('express');
const dotenv = require('dotenv');
const session = require('express-session');

// Initialize Express application
const app = express();

// Load environment variables from the .env file
dotenv.config();

  
// Middleware for parsing JSON request bodies, with a 5MB size limit
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

app.use(session({
  secret: 'Mateo',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
}));

// Middleware to set user in locals
app.use((req, res, next) => {
    res.locals.user = req.session.user || null; // Make sure to handle the case where the user is not logged in
    next();
});  

const path = require('path');
// Serve static files (like CSS, JS, images) from the 'css' folder
app.use('/css', express.static(path.join(__dirname, 'css')));

// Importing route modules for different API endpoints
const userRoutes = require('./routes/userRoutes');
const eventRoutes = require('./routes/eventRoutes');
const weekRoutes = require('./routes/weekRoutes');
const itemRoutes = require('./routes/itemRoutes');
const outfitRoutes = require('./routes/outfitRoutes');
const outfitSuggestionRoutes = require('./routes/outfit_suggestRoutes');
const scheduleRoutes = require('./routes/scheduleRoutes');
const attendsRoutes = require('./routes/attendsRoutes');
const associatedwithRoutes = require('./routes/associatedwithRoutes');
const containsRoutes = require('./routes/containsRoutes');
const relatedtoRoutes = require('./routes/relatedtoRoutes');

// Set up API routes with prefixed paths for better organization
app.use('/outfitly/users', userRoutes); // Route for user-related operations
app.use('/outfitly/events', eventRoutes); // Route for event-related operations
app.use('/outfitly/weeks', weekRoutes); // Route for week-related operations
app.use('/outfitly/items', itemRoutes); // Route for item-related operations
app.use('/outfitly/outfits', outfitRoutes); // Route for outfit-related operations
app.use('/outfitly/outfitsuggestions', outfitSuggestionRoutes); // Route for outfit suggestions
app.use('/outfitly/schedule', scheduleRoutes); // Route for scheduling-related operations
app.use('/outfitly/attends', attendsRoutes); // Route for attendances-related operations
app.use('/outfitly/associations', associatedwithRoutes); // Route for associations-related operations
app.use('/outfitly/contains', containsRoutes); // Route for contains-related operations
app.use('/outfitly/relations', relatedtoRoutes); // Route for relations-related operations

//initialize the template engine
app.set('view engine', 'ejs');

// Root route for basic server check or welcome message
app.get('/outfitly', (req, res) => {
    res.render('welcomeView');
});

app.get('/outfitly/aboutus', (req, res) => { 
    res.render('aboutus'); 
}); 

app.get('/outfitly/signIn', (req, res) => {
    res.render('signInView'); 
});

app.get('/outfitly/login', (req, res) => {
    res.render('loginView'); 
});

app.get('/outfitly/privacy', (req, res) => {
    res.render('PrivacyView'); 
});

app.get('/outfitly/terms', (req, res) => {
    res.render('TermsView'); 
});

app.get('/outfitly/coming-soon', (req, res) => {
    res.render('comingSoonView'); 
});

// Handle 404 errors
app.use((req, res, next) => {
    res.status(404).render('errorView', { error: "Page not found. Please check the URL." });
});

// Centralized error handler for other errors
app.use((err, req, res, next) => {
    console.error(err.stack); // Log the error
    res.status(500).render('errorView', { error: "An internal server error occurred." });
});


// Start the server on the port defined in the .env file
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`); // Log server startup message
});
