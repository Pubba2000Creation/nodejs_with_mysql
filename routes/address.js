const express = require('express');
const addressController = require('../controllers/address.controller');
const checkAuthMiddleware = require("../middleware/check-auth");

const router = express.Router();


router.post("/",addressController.createNew);
//router.get("/", commentController.index);
//router.get("/:id", commentController.showOne);
//router.patch("/:id", checkAuthMiddleware.checkAuth, commentController.update);
//router.delete("/:id", checkAuthMiddleware.checkAuth,commentController.destroy);




module.exports = router;
