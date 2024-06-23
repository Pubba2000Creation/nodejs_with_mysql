const models = require("../models");  // Importing the models
const bcryptjs = require("bcryptjs"); // Importing bcryptjs for password hashing
const jwt = require("jsonwebtoken");  // Importing jsonwebtoken for token generation

// Function to handle user signup
function signup(req, res) {
    // Generate a salt for hashing the password
    bcryptjs.genSalt(10, function(err, salt) {
        if (err) {
            return res.status(500).json({
                message: "Error generating salt",
                error: err
            });
        }

        // Hash the password using the generated salt
        bcryptjs.hash(req.body.password, salt, function(err, hash) {
            if (err) {
                return res.status(500).json({
                    message: "Error hashing password",
                    error: err
                });
            }

            // Extract user details from the request body
            const user = {
                name: req.body.name,
                email: req.body.email,
                password: hash // Use the hashed password
            };

            // Create the user in the database
            models.User.create(user).then(result => {
                res.status(201).json({
                    message: "User created successfully",
                    // Optionally, you could return the user data here
                    user: result
                });
            }).catch(error => {
                res.status(500).json({
                    message: "Something went wrong",
                    error: error.message
                });
            });
        });
    });
}

module.exports = {
    signup: signup // Exporting the signup function
};
