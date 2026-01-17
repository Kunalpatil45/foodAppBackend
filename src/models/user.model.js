const moonoose = require('mongoose');

const userSchema = new moonoose.Schema({
    Name:{
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

    }
},

  { timestamps: true  } 
);


const UserModel = moonoose.model('users', userSchema);
module.exports = UserModel;