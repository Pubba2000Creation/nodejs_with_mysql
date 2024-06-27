const express = require('express');
const commentController = require('../controllers/comment.controller');
const checkAuthMiddleware = require("../middleware/check-auth");

const router = express.Router();


router.post("/",checkAuthMiddleware.checkAuth,commentController.save);
router.get("/", commentController.index);
router.get("/:id", commentController.showOne);
router.patch("/:id", checkAuthMiddleware.checkAuth, commentController.update);
router.delete("/:id", checkAuthMiddleware.checkAuth,commentController.destroy);




module.exports = router;
