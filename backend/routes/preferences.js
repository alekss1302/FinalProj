const express = require('express');
const User = require('../models/User');
const router = express.Router();

// Get user preferences
router.get('/:userId', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.json(user.preferences);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update user preferences
router.put('/:userId', async (req, res) => {
    try {
        const { preferences } = req.body;
        const user = await User.findByIdAndUpdate(
            req.params.userId,
            { preferences },
            { new: true }
        );
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.json(user.preferences);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.put('/:id', async (req, res) => {
    try {
        const { preferences } = req.body; // Get preferences from request
        const userId = req.params.id;

        const user = await User.findByIdAndUpdate(
            userId,
            { preferences },
            { new: true } // Return updated document
        );

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(user);
    } catch (error) {
        console.error('Error saving preferences:', error);
        res.status(500).json({ message: 'Server error' });
    }
});


module.exports = router;
