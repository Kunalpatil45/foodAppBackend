const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const foodpartnersModel = require("../models/foodpartner.model");
const jwt = require("jsonwebtoken");



async function registerUser(req, res) {

    const { Name ,  email, password } = req.body;


    const isuseralreadyexist = await userModel.findOne({ email: email });



    if (isuseralreadyexist) {
        return res.status(400).json({ message: "User already exists" });
    }

    console.log(password);

    const hashpassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
        Name,
        email,
        password: hashpassword,
    })

    

    const token = jwt.sign({
        id: user._id
    }, process.env.JWT_SECRET, { expiresIn: '1d' })
    res.cookie("token", token)

    res.status(201).json({
        message: "User registered successfully",
        user: {
            id: user._id,
            Name: user.Name,
            email: user.email,

        },
    });

}

async function loginUser(req, res) {
    // Login user logic here

    const { email, password } = req.body;
    const user = await userModel.findOne({ email: email });

    if (!user) {
        return res.status(400).json({ message: "User does not exist" });
    }

    const ispasswordcorrect = await bcrypt.compare(password, user.password);

    if (!ispasswordcorrect) {
        return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({
        id: user._id
    }, process.env.JWT_SECRET, { expiresIn: '1d' })
    res.cookie("token", token)
    res.status(200).json({
        message: "User logged in successfully",
        user: {  
            id: user._id,
            Name: user.Name,
            email: user.email
        },
    }); 


}

function logoutUser(req, res) {
    res.clearCookie("token");
    res.status(200).json({ message: "User logged out successfully" });
}

async function forgetPassword(req,res)
{
    

    const email = req.body.email;
    console.log(email)

    isavailable = await userModel.findOne( {email})

    if(!isavailable)
    {
        return res.status(400).json({ message : "invaild email!!!"})
    }

    

    res.status(201).json({
        message: "route hit correctly"
    });

}

async function registerFoodPartner(req, res) {
    // Registration logic for food partner here
    const { RestaurantName, Name , PhoneNumber , Address ,  email, password } = req.body;

    const isfoodpartnerexist = await foodpartnersModel.findOne({ email: email });

    const isnumberexist = await foodpartnersModel.findOne({ PhoneNumber: PhoneNumber });

    if(isnumberexist){
        return res.status(400).json({ message: "Phone Number already exists" });
    }

    if (isfoodpartnerexist) {
        return res.status(400).json({ message: "Food Partner already exists" });
    }   
    const hashpassword = await bcrypt.hash(password, 10);

    const foodpartner = new foodpartnersModel({
        Name: Name,
        RestaurantName: RestaurantName,
        PhoneNumber: PhoneNumber,
        Address: Address,
        email: email,
        password: hashpassword,
    })

    await foodpartner.save();
    res.status(201).json({
        message: "Food Partner registered successfully",
        foodpartner: {
            id: foodpartner._id,
            Name: foodpartner.Name,
            email: foodpartner.email,
            RestaurantName: foodpartner.RestaurantName,
            PhoneNumber: foodpartner.PhoneNumber,
            Address: foodpartner.Address
        },
    });
}

async function loginFoodPartner(req, res) {
    // Login food partner logic here
    const { email, password } = req.body;
    const foodpartner = await foodpartnersModel.findOne({ email: email });

    if (!foodpartner) {
        return res.status(400).json({ message: "Food Partner does not exist" });
    }   

    const ispasswordcorrect = await bcrypt.compare(password, foodpartner.password);

    if (!ispasswordcorrect) {
        return res.status(400).json({ message: "Invalid credentials" });
    }  
    const token = jwt.sign({
        id: foodpartner._id
    }, process.env.JWT_SECRET, { expiresIn: '1d' })


  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
    maxAge: 24 * 60 * 60 * 1000,
  });

    res.status(200).json({
        message: "Food Partner logged in successfully",
        foodpartner: {
            id: foodpartner._id,
            Name: foodpartner.Name,
            email: foodpartner.email,
            RestaurantName: foodpartner.RestaurantName,
            PhoneNumber: foodpartner.PhoneNumber,
            Address: foodpartner.Address
        },
    });
}

function logoutFoodPartner(req, res) {
    res.clearCookie("token");
    res.status(200).json({ message: "Food Partner logged out successfully" });
}

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    registerFoodPartner,
    loginFoodPartner,
    logoutFoodPartner,
    forgetPassword
};