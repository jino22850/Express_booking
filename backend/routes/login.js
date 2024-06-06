const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const adminCredentials = [
  { email: 'admin@gmail.com', password: 'admin@1234' },
];

const generateToken = (user) => {
  return jwt.sign({ _id: user._email, role: user.role }, '343faa590d347ced1bd8acc24c4c8a0ff7ce2dd6be6b2bfa6761b5dc2051f3fc6f1135d7e99f136779ad8df4c6e7a1321ebe06bac2ccab9cc581f39ef368cfc6', { expiresIn: '1d' });
};

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email);
    console.log(password);

    // Find admin credentials
    const admin = adminCredentials.find(a => a.email === email && a.password === password);

    if (!admin) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = generateToken({ _id: admin.email, role: 'admin' }); // Assuming email as _id

    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
