const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController'); // Adjust the path as necessary
const { auth, authorizeRoles } = require('../middleware/auth'); // Adjust the path as necessary

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/user/:email', authController.isRegistered);
module.exports = router;
