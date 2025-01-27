const express = require('express');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


const router = express.Router();

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// Middleware to verify token
const verifyToken = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'No token provided, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
};

// Update user registration to include default preferences
router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            preferences: { timeZones: [], favoriteLocations: [], countdowns: [] }, // Default preferences
        });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error registering user' });
    }
});

// Ensure preferences are included in user data
router.get('/user', verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) return res.status(404).json({ message: 'User not found' });

        // Initialize preferences if missing
        if (!user.preferences) {
            user.preferences = { timeZones: [], favoriteLocations: [], countdowns: [] };
            await user.save();
        }

        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching user details' });
    }
});






// Login user
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Log the email and password received
        console.log("Login attempt with email:", email);
        
        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            console.log("User not found for email:", email);
            return res.status(404).json({ error: 'User not found' });
        }

        // Log the user's hashed password
        console.log("Hashed password from DB:", user.password);

        // Compare the entered password with the hashed password
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        console.log("Password comparison result:", isPasswordMatch);

        if (!isPasswordMatch) {
            console.log("Password mismatch for email:", email);
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        // Generate and return a token
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        });
    } catch (error) {
        console.error('Login error:', error.message);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;