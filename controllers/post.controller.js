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


module.exports = {
    save: save,
    show: show
};
