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


function index(req, res) {
    models.Address.findAll()
        .then(result => {
            if (result.length === 0) {
                return res.status(404).json({
                    message: "No addresses found"
                });
            }
            res.status(200).json(result);
        })
        .catch(error => {
            console.error("Error fetching addresses:", error);
            res.status(500).json({
                message: "Something went wrong!",
                error: error.message || error
            });
        });
}


function showOne(req,res){

    
        const id = req.params.id; //get id from the param
    
        models.Address.findByPk(id).then(result => {
            if (result) {
                res.status(200).json(result);
            } else {
                res.status(404).json({
                    message: "Address not found!"
                });
            }
        }).catch(error => {
            res.status(500).json({
                message: "Something went wrong!",
                error: error.message || error
            });
        });
    
}


function update(req, res) {
    const id = req.params.id;
    const userId = req.body.userId; // Assuming this is coming from the request body for now

    const updateAddress = {
        address: req.body.address,
        mobile: req.body.mobile
    };

    const schema = {
        address: { type: "string", optional: false, max: 500 },
        mobile: { type: "string", optional: false }
    };

    const v = new Validator();
    const validationResponse = v.validate(updateAddress, schema);

    if (validationResponse !== true) {
        return res.status(400).json({
            message: "Validation failed",
            errors: validationResponse
        });
    }

    models.Address.update(updateAddress, { where: { id: id, userId: userId } })
        .then(result => {
            if (result[0] === 0) {
                return res.status(404).json({
                    message: "Address not found or user not authorized"
                });
            }
            res.status(200).json({
                message: "Address updated successfully",
                address: updateAddress
            });
        })
        .catch(error => {
            res.status(500).json({
                message: "Something went wrong",
                error: error.message || error
            });
        });
}

function destroy(req, res) {
    const id = req.params.id;
    const userId = req.body.userId; // Assuming userId is passed in the request body

    models.Address.destroy({ where: { id: id, userId: userId } })
        .then(result => {
            if (result === 0) {
                return res.status(404).json({
                    message: "Address not found or user not authorized"
                });
            }
            res.status(200).json({
                message: "Address deleted successfully"
            });
        })
        .catch(error => {
            res.status(500).json({
                message: "Something went wrong",
                error: error.message || error
            });
        });
}



module.exports={
    createNew,
    show:index,
    showOne,
    update,
    destroy
}