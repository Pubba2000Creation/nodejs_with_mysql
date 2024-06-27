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


function login(req, res) {
    // First, need to identify if there is a user with the given email address or not
    models.User.findOne({ where: { email: req.body.email } })
        .then(user => {
            if (user === null) {
                res.status(500).json({
                    message: "Invalid credentials"
                });
            } else {
                bcryptjs.compare(req.body.password, user.password, function(err, result) {
                    // If the result is true, the password matches
                    if (result) {
                        // Generate access token for the user
                        const token = jwt.sign({
                            email: user.email,
                            userId: user.id
                        }, 
                        process.env.JWT_KEY ,  // enter the nodemaon.jason enterd secret key into process 
                        function(err, token) {
                            res.status(200).json({
                                message: "Authentication successful",
                                token: token
                            });
                        });
                    } else {
                        res.status(500).json({
                            message: "Invalid password"
                        });
                    }
                });
            }
        })
        .catch(error => {
            res.status(500).json({
                message: "The given email does not have an account"
            });
        });
}

module.exports = {
    signup: signup, // Exporting the signup function
    login:login

};
