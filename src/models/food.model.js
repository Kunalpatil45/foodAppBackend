const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    video: {
        type: String,
        required: true,
    },
    foodPartnerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'foodpartners',
    },
},
  { timestamps: true  } 
);

module.exports = mongoose.model('foods', foodSchema);