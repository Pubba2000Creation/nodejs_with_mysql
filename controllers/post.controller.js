const Validator = require("fastest-validator")
const { Where } = require('sequelize/lib/utils');
const models = require('../models');

// Create new function to save a new blog post
function save(req, res) {
    // This object should have all the attributes we want to insert into the table
    const post = {
        title: req.body.title,
        content: req.body.content,
        imageUrl: req.body.imageUrl,
        categoryId: req.body.categoryId,
        userId: req.body.userId
    };

    const schema = {
        type: "object",
        properties: {
          title: {
            type: "string",
            required: true,
            minLength: 1, // Enforce a minimum title length
            maxLength: 100,
          },
          content: {
            type: "string",
            required: true,
            minLength: 1, // Enforce a minimum content length
            maxLength: 500,
          },
          categoryId: {
            type: "integer", // Use "integer" for category ID validation
            required: true,
          },
          imageUrl: { // Include optional imageUrl with type validation
            type: "string",
            optional: true, // Mark imageUrl as optional
          },
          userId: {  // Include optional userId with type validation
            type: "integer", // Assuming userId is an integer
            optional: true,  // Mark userId as optional
          },
        },
        additionalProperties: false, // Restrict additional properties for stricter validation
      };

    const v = new Validator();
   const validationResponse=v.validate(post,schema);
   if (validationResponse != true) {

    return res.status(400).json({
        message:"validation is failed",
        errors:validationResponse
    });
    
   } 

    models.Post.create(post).then(result => {
        res.status(201).json({
            message: "Post created successfully",
            post: result
        });
    }).catch(error => {
        res.status(500).json({
            message: "Something went wrong",
            error: error
        });
    });
}


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
    const userId = req.params.userId; // Assuming userId is hardcoded for now

    // Log the request body to troubleshoot issues
    console.log('Request Params:', req.params);
    console.log('Request Body:', req.body);

    // Validate presence of required fields
    if (!id || !userId) {
        return res.status(400).json({
            message: "Post ID and User ID are required"
        });
    }

    const updatePost = {
        title: req.body.title,
        content: req.body.content,
        imageUrl: req.body.imageUrl,
        categoryId: req.body.categoryId,
    };

    models.Post.update(updatePost, {
        where: {
            id: id,
            userId: userId
        }
    }).then(result => {
        if (result[0] === 0) {
            return res.status(404).json({
                message: "Post not found or user not authorized"
            });
        }
        res.status(200).json({
            message: "Post updated successfully",
            result: result
        });
    }).catch(error => {
        console.error("Error updating post:", error);
        res.status(500).json({
            message: "Something went wrong in the update function",
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
