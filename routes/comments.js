const express = require('express');
const commentController = require('../controllers/comment.controller');

const router = express.Router();

router.post("/", commentController.save);
router.get("/", commentController.index);
router.get("/:id", commentController.showOne);
router.patch("/:id", commentController.update);
router.delete("/:id", commentController.destroy);

module.exports = router;