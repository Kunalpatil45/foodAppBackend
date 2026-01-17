const express = require('express');
const authMiddleware = require('../middlewares/auth.middleware');
const foodController = require('../controllers/food.controllers');
const authController = require('../controllers/auth.controllers');
const multer = require('multer');
const route = express.Router();

const upload = multer({
    storage: multer.memoryStorage(),
})

route.post('/register',authController.registerFoodPartner);

route.post('/login',authController.loginFoodPartner);

route.post('/logout',authController.logoutFoodPartner);


route.post('/', 
    authMiddleware.authfoodpartnermiddleware,
    upload.single('video'),
    foodController.createFood); 

route.get('/',authMiddleware.authusermiddleware , foodController.getFoodItems);


route.post('/like',
    authMiddleware.authusermiddleware,
    foodController.likeFood)


route.post('/save',
    authMiddleware.authusermiddleware,
    foodController.saveFood
)


route.get('/save',
    authMiddleware.authusermiddleware,
    foodController.getSaveFood
)

module.exports = route;