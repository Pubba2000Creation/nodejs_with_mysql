const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');


//endpoint for signup user 
router.post('/signup', userController.signup);

//end pint for login user
router.post('/login',userController.login);



module.exports = router;