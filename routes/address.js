const express = require('express');
const addressController = require('../controllers/address.controller');
const checkAuthMiddleware = require("../middleware/check-auth");

const router = express.Router();


router.post("/",addressController.createNew);
router.get("/", addressController.show);
router.get("/:id", addressController.showOne);
//router.patch("/:id", checkAuthMiddleware.checkAuth, addressController.update);
//router.delete("/:id", checkAuthMiddleware.checkAuth,addressController.destroy);




module.exports = router;
