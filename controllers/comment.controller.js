const { Validator } = require("fastest-validator"); // Ensure fastest-validator is installed
const models = require("../models"); // Adjust the path as necessary


//create comment function
function save(req, res) {
    const comment = {
        content: req.body.content,
        postId: req.body.post_id,
        userId: req.userData.userId //get userid in login user
    };

    const schema = {
        content: { type: "string", optional: false, max: 500 },
        postId: { type: "number", optional: false }
    };

    const v = new Validator();
    const validationResponse = v.validate(comment, schema);

    if (validationResponse !== true) {
        return res.status(400).json({
            message: "Validation failed",
            errors: validationResponse
        });
    }

    models.Post.findByPk(req.body.post_id)
        .then(post => {
            if (!post) {
                return res.status(404).json({
                    message: "Post not found"
                });
            }

            return models.Comment.create(comment);
        })
        .then(result => {
            if (result) {
                res.status(201).json({
                    message: "Comment created successfully",
                    comment: result
                });
            }
        })
        .catch(error => {
            res.status(500).json({
                message: "Something went wrong",
                error: error.message || error
            });
        });
}


//show spesific comment showing function

function show(req, res) {
    const id = req.params.id;

    models.Comment.findByPk(id)
        .then(result => {
            if (result) {
                res.status(200).json(result);
            } else {
                res.status(404).json({
                    message: "Comment not found!"
                });
            }
        })
        .catch(error => {
            console.error("Error fetching comment:", error);
            res.status(500).json({
                message: "Something went wrong!",
                error: error.message || error
            });
        });
}


/**
 * Fetches all comments from the database.
 * 
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
function index(req, res) {
    // Find all comments using the Comment model
    models.Comment.findAll()
        .then(result => {
            // If successful, send the result with a 200 status code
            res.status(200).json(result);
        })
        .catch(error => {
            // Log the error for debugging purposes
            console.error("Error fetching comments:", error);
            // If an error occurs, send a 500 status code with a generic error message
            res.status(500).json({
                message: "Something went wrong!",
                error: error.message || error // Optionally include the error message
            });
        });
}


function update(req, res) {
    const id = req.params.id; // ID of the comment to be updated
    const updatedComment = {
        content: req.body.content // New content for the comment
    };

    const userId = req.userData.userId; // Assuming user ID is available in req.userData

    // Define the schema for validation
    const schema = {
        content: { type: "string", optional: false, max: 500 }
    };

    // Instantiate the validator
    const v = new Validator();
    const validationResponse = v.validate(updatedComment, schema);

    // Check if validation failed
    if (validationResponse !== true) {
        // Return a 400 response with validation errors
        return res.status(400).json({
            message: "Validation failed",
            errors: validationResponse
        });
    }

    // Update the comment in the database
    models.Comment.update(updatedComment, { where: { id: id, userId: userId } })
        .then(result => {
            // Check if any rows were affected (comment was found and updated)
            if (result[0] === 0) {
                return res.status(404).json({
                    message: "Comment not found or user not authorized"
                });
            }
            // Return a 200 response with the updated comment
            res.status(200).json({
                message: "Comment updated successfully",
                comment: updatedComment
            });
        })
        .catch(error => {
            // Log the error for debugging purposes
            console.error("Error updating comment:", error);
            // Return a 500 response with an error message
            res.status(500).json({
                message: "Something went wrong",
                error: error.message || error // Optionally include the error message
            });
        });
}


function destroy(req, res) {
    const id = req.params.id; // ID of the comment to be deleted
    const userId = req.userData.userId; // Assuming user ID is available in req.userData

    // Delete the comment from the database
    models.Comment.destroy({ where: { id: id, userId: userId } })
        .then(result => {
            // Check if any rows were affected (comment was found and deleted)
            if (result === 0) {
                return res.status(404).json({
                    message: "Comment not found or user not authorized"
                });
            }
            // Return a 200 response if the comment was deleted successfully
            res.status(200).json({
                message: "Comment deleted successfully"
            });
        })
        .catch(error => {
            // Log the error for debugging purposes
            console.error("Error deleting comment:", error);
            // Return a 500 response with an error message
            res.status(500).json({
                message: "Something went wrong",
                error: error.message || error // Optionally include the error message
            });
        });
}

module.exports = {
    save: save,
    show: show,
    index: index,
    update: update,
    destroy: destroy
}