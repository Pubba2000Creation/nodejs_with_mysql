const Validator = require('fastest-validator');
const models = require('../models');
 

function createNew(req, res) {
    const address = {
        address: req.body.address,
        userId: req.body.userId,
        mobile: req.body.mobile
    };

    const schema = {
        address: { type: "string", optional: false, max: 500 },
        userId: { type: "number", optional: false },
        mobile: { type: "string", optional: false }
    };

    // Validate the schema
    const v = new Validator();
    const validationResponse = v.validate(address, schema);

    if (validationResponse !== true) {
        return res.status(400).json({
            message: "Validation failed",
            errors: validationResponse
        });
    }

    // Check if the userId exists
    models.User.findByPk(req.body.userId).then(user => {
        if (user === null) {
            return res.status(404).json({
                message: "User not found"
            });
        } else {
            // Save the new address
            models.Address.create(address).then(result => {
                res.status(201).json({
                    message: "Address created successfully",
                    address: result
                });
            }).catch(error => {
                console.error("Error creating address:", error);
                res.status(500).json({
                    message: "Error creating address",
                    error: error.message || error
                });
            });
        }
    }).catch(error => {
        console.error("Error finding user:", error);
        res.status(500).json({
            message: "Error finding user",
            error: error.message || error
        });
    });
}


module.exports={
    createNew,
}