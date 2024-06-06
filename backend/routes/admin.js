

const express = require('express');
const router = express.Router();
//const bcrypt = require('bcrypt');
const Admin = require("../models/admin");

// Create a new admin user (signup)
router.post('/admin', async (req, res) => {
    try {
        const { 
            username, 
            email,
            gender, 
            mobileNumber,
            password
        } = req.body;

        // Check if the email is already registered
        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        // Hash the password
        /*const hashedPassword = await bcrypt.hash(password, 10);*/

        // Create a new admin object
        const newAdmin = new Admin({
            username,
            email,
            gender,
            mobileNumber,
            password
        });

        // Save the admin to the database
        await newAdmin.save();

        res.status(201).json({ message: 'Admin registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});



module.exports = router;