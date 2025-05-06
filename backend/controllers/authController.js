const User = require('../models/User');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '1h',
    });
}
exports.registerUser = async (req, res) => {
    const { fullName, email, password } = req.body;
    if(!fullName || !email || !password) {
        return res.status(400).json({ message: "Please fill all fields" });
    }
    try {
        const exsistingUser = await User.findOne({  email });
        if (exsistingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        const user = await User.create({
            fullName,
            email,
            password,
            profileImageUrl
        });
        res.status(201).json({
            _id: user._id,
            user,
            token: generateToken(user._id),
        });
    }
    catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};
exports.loginUser = async (req, res) => {

};
exports.getUserInfo = async (req, res) => {
};