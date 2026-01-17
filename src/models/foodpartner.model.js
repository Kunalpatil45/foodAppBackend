const mongoose = require('mongoose');

const foodPartnerSchema = new mongoose.Schema({
    RestaurantName: {
        type: String,
        required: true,
    },
     Name:{
        type: String,
        required: true,
    },
    PhoneNumber:
    {
        type: String,
        required: true,
    },
    Address:{
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },  
},
  { timestamps: true  } 
);

const FoodPartnerModel = mongoose.model('foodpartners', foodPartnerSchema);
module.exports = FoodPartnerModel;