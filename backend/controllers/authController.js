const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Users = require('../models/users'); // Adjust the path as necessary

// Register User
exports.register = async (req, res) => {
  const { username, email, address, gender, mobileNumber, role, password } = req.body;

  try {
    const userExists = await Users.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Check if the user being registered is an admin
    if (role === 'admin') {
      // Set default email and password for admin
      const defaultEmail = 'admin@gmail.com';
      const defaultPassword = 'admin123';

      const hashedPassword = await bcrypt.hash(defaultPassword, 10);

      const newUser = new Users({
        username,
        email: defaultEmail,
        address,
        gender,
        mobileNumber,
        role,
        password: hashedPassword,
      });

      const savedUser = await newUser.save();

      const token = jwt.sign({ _id: savedUser._id, role: savedUser.role }, process.env.JWT_SECRET, {
        expiresIn: '7d',
      });

      return res.status(201).json({ token });
    }

     // For non-admin users, proceed with regular registration process
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new Users({
      username,
      email,
      address,
      gender,
      mobileNumber,
      role,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();

    const token = jwt.sign({ _id: savedUser._id, role: savedUser.role }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error });
  }
};

// Login User
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await Users.findOne({email});
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Check if the user is an admin
    /*if (user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admin credentials required.' });
    }*/

    const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error });
  }
};

// Check if a user is registered
exports.isRegistered = async (req, res) => {
  try {
    
    const user = await Users.findOne({email:req.params.email});
    if (user) {
      res.status(200).json({ isRegistered: true });
    } else {
      res.status(404).json({ message: 'User not registered' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error checking registration status', error });
  }
};