// Import the Express library
const express = require('express');

// Import the post controller to handle the logic for the routes
const postController = require('../controllers/post.controller');

// Create a new router object to define routes
const router = express.Router();


// Define a GET endpoint for the root URL ("/") and associate it with the 'index' function from postController
//
router.post("/", postController.save);

//route for show post
router.get("/:id",postController.show);


//route for find all blog psot
router.get("/",postController.index);

//route for the updateing 
router.patch("/:id/:userId",postController.update);


// Export the router object so it can be used in other parts of the application
module.exports = router;
