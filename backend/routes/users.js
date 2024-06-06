
const express = require('express');
const router = express.Router();
//const bcrypt = require('bcrypt'); // Ensure bcrypt is required
const User = require("../models/users");
//const {authenticateToken} = require('../middleware/auth')

// Create a new user (signup)
router.post('/users', async (req, res) => {
    try {
        const {
            username,
            email, 
            password, 
            address, 
            gender, 
            mobileNumber,
            role
        } = req.body;

        // Create a new user object
        const newUser = new User({
            username,
            email,
            address,
            gender,
            mobileNumber,
            role,
            password: await bcrypt.hash(password, 10) // Hash the password before saving
        });

        // Save the user to the database
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Get all users
router.get('/users/search', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Get monthly user count
router.get('/users/monthly-count', async (req, res) => {
    try {
        const startOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
        const endOfMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0);

        const userCount = await User.countDocuments({
            createdAt: { $gte: startOfMonth, $lte: endOfMonth }
        });

        res.status(200).json({ count: userCount });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Update user details
router.put('/users/:email', async (req, res) => {
    try {
        const { email } = req.params;
        const { 
            username,
            password, 
            address, 
            gender, 
            mobileNumber,
            role 
        } = req.body;

        // Check if user exists
        const user = await User.findById(email);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update user details
        user.username = username || user.username;
        user.email = email || user.email;
        user.address = address || user.address;
        user.gender = gender || user.gender;
        user.mobileNumber = mobileNumber || user.mobileNumber;
        user.role = role || user.role;

        if (password) {
            // Hash the new password
            user.password = await bcrypt.hash(password, 10);
        }

        await user.save();
        res.json({ message: 'User updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Delete a user
router.delete('/users/delete/:email', async (req, res) => {
    try {
        const { email} = req.params;

        // Check if user exists
        const user = await User.findByIdAndDelete(email);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Get count of passengers for the current month
router.get('/users/count', async (req, res) => {
    try {
      const startOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
      const endOfMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0);
      const count = await Seat.countDocuments({
        approved: true,
        date: { $gte: startOfMonth, $lte: endOfMonth }
      }).populate('passenger'); // Assuming you have a 'passenger' field to count passengers
      res.status(200).json({ count });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  

module.exports = router;