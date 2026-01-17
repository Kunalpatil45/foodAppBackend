const express = require('express');
const authController = require('../controllers/auth.controllers');


const router = express.Router();

router.post('/user/register', authController.registerUser); 


router.post('/user/login', authController.loginUser);

router.post('/user/forget-password', authController.forgetPassword)

router.post('/user/logout', authController.logoutUser)


module.exports = router;