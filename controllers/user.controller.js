const models = require("../models");  // Importing the models
const bcryptjs = require("bcryptjs"); // Importing bcryptjs for password hashing
const jwt = require("jsonwebtoken");  // Importing jsonwebtoken for token generation
const { where } = require("sequelize"); // Importing Sequelize's where function

// Function to handle user signup
function signup(req, res) {
    // Check if the entered email already exists in the database
    models.User.findOne({ where: { email: req.body.email } }).then(result => {
        if (result) {
            return res.status(409).json({
                message: "Email is already taken",
            });
        } else {
            // Generate a salt for hashing the password
            bcryptjs.genSalt(10, function(err, salt) {
                if (err) {
                    return res.status(500).json({
                        message: "Error generating salt",
                        error: err.message
                    });
                }

                // Hash the password using the generated salt
                bcryptjs.hash(req.body.password, salt, function(err, hash) {
                    if (err) {
                        return res.status(500).json({
                            message: "Error hashing password",
                            error: err.message
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
    }).catch(error => {
        res.status(500).json({
            message: "Something went wrong",
            error: error.message
        });
    });
}

module.exports = {
    signup: signup // Exporting the signup function
};
