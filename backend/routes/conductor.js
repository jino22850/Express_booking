
const express = require('express');
const router = express.Router();
//const bcrypt = require('bcrypt');
const Conductor = require("../models/conductor");
//const { validate } = require('../models/bus');

// Create a new user (signup)
router.post('/conductoradd', async (req, res) => {
    try {
        const {
            conductorname,
             email, 
             password, 
             address,
             gender, 
             mobileNumber,
             role,
            } = req.body;
    /*try{
        const{error}=validate(req.body);
        if(error)
            return res.status(400).send({message: error.details[0].message});

        const User= await User.findOne({email:req.body.email});
        if(user)
            return res.status(409).send({message:})
    }     */   

        
    

        // Create a new user object
        const newConductor = new Conductor({
            conductorname,
            email,
            address,
            gender,
            mobileNumber,
            role,
            password,
        });

        // Save the user to the database
        await newConductor.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Get all users
router.get('/conductor/search', async (req, res) => {
    try {
        const conductor = await Conductor.find();
        res.json(conductor);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Update user details
router.put('/conductor/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { conductorname, email, password, address, gender, mobileNumber,role } = req.body;

        // Check if user exists
        const conductor = await Conductor.findById(id);
        if (!conductor) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update user details
        conductor.conductorname = conductorname || conductor.conductorname;
        conductor.email = email || conductor.email;
        conductor.address = address || conductor.address;
        conductor.gender = gender || conductor.gender;
        conductor.mobileNumber = mobileNumber || conductor.mobileNumber;
        conductor.role =role || conductor.role;
        
        if (password) {
            // Hash the new password
            conductor.password = await bcrypt.hash(password, 10);
        }

        await conductor.save();
        res.json({ message: 'User updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Delete a user
router.delete('/delete/:email', async (req, res) => {
    try {
        const { email } = req.params;
        console.log(email)

        // Check if user exists
        const conductor = await Conductor.findOneAndDelete({ email:email });
        if (!conductor) {
            return res.status(404).json({ message: 'User not found' });
        }

        // If user exists, remove it from the database
        
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Delete a bus
/*router.delete('/users/:email', async (req, res) => {
    try {
        const { email } = req.params;

        const user = await user.findByIdAndDelete(email);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});*/


module.exports = router;