const Validator = require('fastest-validator');
const models = require('../models');

// Create new function to save a new blog post
function save(req, res) {
    // This object should have all the attributes we want to insert into the table
    const post = {
        title: req.body.title,
        content: req.body.content,
        imageUrl: req.body.imageUrl,
        categoryId: req.body.categoryId,
        userId: req.userData.userId
    };

    // Define the schema for validation
    const schema = {
        title: { type: "string", min: 1, max: 100 },
        content: { type: "string", min: 1, max: 500 },
        categoryId: { type: "number", integer: true }
        //imageUrl: { type: "string", optional: true },
        
    };

    // Instantiate the validator
    const v = new Validator();
    const validationResponse = v.validate(post, schema);

    // Check if validation failed
    if (validationResponse !== true) {
        // Return a 400 response with validation errors
        return res.status(400).json({
            message: "Validation failed",
            errors: validationResponse
        });
    }

      // Check if the category exists
      models.Category.findByPk(req.body.categoryId)
      .then(category => {
          if (category !== null) {
              // If the category exists, create the post
              models.Post.create(post)
                  .then(result => {
                      // Return a 201 response with the created post
                      res.status(201).json({
                          message: "Post created successfully",
                          post: result
                      });
                  })
                  .catch(error => {
                      // Handle any errors during the create operation
                      res.status(500).json({
                          message: "Something went wrong",
                          error: error.message
                      });
                  });
          } else {
              // If the category is not found, return a 400 response
              res.status(400).json({
                  message: "Invalid category"
              });
          }
      })
      .catch(error => {
          // Handle any errors during the find operation
          res.status(500).json({
              message: "Something went wrong",
              error: error.message
          });
      });
}


// create function for show blog post

function show(req, res) {
    const id = req.params.id; // Corrected to use req.params.id instead of req.param.id

    models.Post.findByPk(id).then(result => {
        if (!result) {
            return res.status(404).json({ message: "Post not found" });
        }
        res.status(200).json(result);
    }).catch(error => {
        console.error("Error retrieving post:", error);
        res.status(500).json({
            message: "Something went wrong in the show function"
        });
    });
}

function index(req, res) {
   

    models.Post.findAll().then(result => {
        if (!result) {
            return res.status(404).json({ message: "Post not found" });
        }
        res.status(200).json(result);
    }).catch(error => {
        console.error("Error retrieving post:", error);
        res.status(500).json({
            message: "Something went wrong in the show function"
        });
    });
}


// Function for updating a post
function update(req, res) {
    const id = req.params.id;
    const userId = req.params.userId; // Assuming userId is passed as a parameter

    // Validate presence of required fields
    if (!id || !userId) {
        return res.status(400).json({
            message: "Post ID and User ID are required"
        });
    }

    // Log the request body to troubleshoot issues
    console.log('Request Params:', req.params);
    console.log('Request Body:', req.body);

    // Prepare the updated post object
    const updatePost = {
        title: req.body.title,
        content: req.body.content,
        imageUrl: req.body.imageUrl,
        categoryId: req.body.categoryId,
    };

    // Define the schema for validation
    const schema = {
        title: { type: "string", min: 1, max: 100 },
        content: { type: "string", min: 1, max: 500 },
        categoryId: { type: "number", integer: true },
        imageUrl: { type: "string", optional: true }
    };

    // Instantiate the validator
    const v = new Validator();
    const validationResponse = v.validate(updatePost, schema);

    // Check if validation failed
    if (validationResponse !== true) {
        // Return a 400 response with validation errors
        return res.status(400).json({
            message: "Validation failed",
            errors: validationResponse
        });
    }

    // Check if the category exists before updating the post
    models.Category.findByPk(req.body.categoryId)
        .then(category => {
            if (!category) {
                return res.status(400).json({
                    message: "Invalid category"
                });
            }

            // Update the post
            models.Post.update(updatePost, {
                where: {
                    id: id,
                    userId: userId
                }
            })
            .then(result => {
                if (result[0] === 0) {
                    return res.status(404).json({
                        message: "Post not found or user not authorized"
                    });
                }
                res.status(200).json({
                    message: "Post updated successfully",
                    result: result
                });
            })
            .catch(error => {
                console.error("Error updating post:", error);
                res.status(500).json({
                    message: "Something went wrong in the update function",
                    error: error.message
                });
            });
        })
        .catch(error => {
            console.error("Error finding category:", error);
            res.status(500).json({
                message: "Something went wrong",
                error: error.message
            });
        });
}

function destroy(req, res) {
    // Getting the delete post id and userId from params
    const id = req.params.id;
    const userId = req.params.userId;

    if (!id || !userId) {
        return res.status(400).json({
            message: "The object id and userId are required to process",
        });
    }

    models.Post.destroy({
        where: {
            id: id,
            userId: userId
        }
    }).then(result => {
        if (result === 0) {
            return res.status(404).json({
                message: "Post not found or user not authorized",
            });
        }
        res.status(200).json({
            message: "Post deleted successfully",
            result: result
        });
    }).catch(error => {
        res.status(500).json({
            message: "Post not deleted successfully",
            error: error.message
        });
    });
}



module.exports = {
    save: save,
    show: show,
    index:index,
    update:update,
    destroy:destroy
};
