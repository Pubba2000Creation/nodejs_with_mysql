// Import the Express library
const express = require('express');

// Create an instance of an Express application
const app = express();

// Import the post routes from the 'posts' module in the 'routes' directory
const postRouter = require('./routes/posts');

// Use the imported post routes for any requests to the "/posts" URL path
// This means that any request to "/posts" will be handled by the 'postRouter'
app.use("/posts", postRouter);

// Export the Express application instance to be used in other parts of the application
module.exports = app;
