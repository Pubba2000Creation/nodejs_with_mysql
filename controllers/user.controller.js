const models = require("../models");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

function signup(req, res) {
    // Extract user details from the request body
    const user = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    };

    // Hash the password before saving the user
    bcryptjs.hash(user.password, 10, (err, hashedPassword) => {
        if (err) {
            return res.status(500).json({
                message: "Error hashing password",
                error: err
            });
        }

        // Replace the plain password with the hashed password
        user.password = hashedPassword;

        // Create the user in the database
        models.User.create(user).then(result => {
            // Optionally, generate a JWT token
            const token = jwt.sign(
                {
                    userId: result.id,
                    email: result.email
                },
                "your_jwt_secret_key", // Use a proper secret key
                { expiresIn: "1h" }
            );

            res.status(201).json({
                message: "User created successfully",
                user: result,
                token: token
            });
        }).catch(error => {
            res.status(500).json({
                message: "Something went wrong",
                error: error
            });
        });
    });
}

module.exports = {
    signup: signup
};
