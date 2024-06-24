const express = require("express");
const imageController = require('../controllers/image.controller'); // Importing image controller
const imageUploader = require("../helpers/image-uploader"); // Importing the image uploader helper
const checkAuth = require('../middleware/check-auth'); // Importing the authentication middleware

// Create a new router instance
const router = express.Router();

// Endpoint for image upload with authentication and image uploading functionality
router.post('/upload', checkAuth.checkAuth, imageUploader.upload.single("image"), imageController.upload);

// Export the router
module.exports = router;
