const User = require('../models/User');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
}
exports.registerUser = async (req, res) => {
    if (!req.body) {
      return res.status(400).json({ message: "Request body is missing" });
    }
  
    const { fullName, email, password, profileImageUrl } = req.body;
  
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "Please fill all fields" });
    }
  
    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }
  
      const user = await User.create({
        fullName,
        email,
        password,
        profileImageUrl,
      });
  
      res.status(201).json({
        _id: user._id,
        user,
        token: generateToken(user._id),
      });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  };
  
exports.loginUser = async (req, res) => {
    if (!req.body) {
        return res.status(400).json({ message: "Request body is missing" });
      }
    
      const { email, password } = req.body;
    
      if (!email || !password) {
        return res.status(400).json({ message: "Please fill all fields" });
      }
    
      try {
        const user = await User.findOne({ email });
        if (!user) {
          return res.status(400).json({ message: "Invalid credentials" });
        }
    
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
          return res.status(400).json({ message: "Invalid credentials" });
        }
    
        res.status(200).json({
          _id: user._id,
          user,
          token: generateToken(user._id),
        });
      } catch (error) {
        res.status(500).json({ message: "Server error" });
      }
};
exports.getUserInfo = async (req, res) => {
    try{
        const user = await User.findById(req.user._id).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};