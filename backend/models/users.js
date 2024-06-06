const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  address: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  mobileNumber: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['passenger', 'admin', 'conductor'],
    default: 'passenger'
  },
  password: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Users', userSchema);
