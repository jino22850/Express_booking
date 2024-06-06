
const mongoose = require('mongoose');

const SeatSchema = new mongoose.Schema({
  busId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Bus',
    required: true,
  },
  passengerName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  from: {
    type: String,
    required: true
  },
  departure: {
    type: String,
    required: true
  },
  turnTime: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  /*number:{
    type: Number,
    required:true
  },*/
  approved: {
    type: Boolean,
    default: false
  },
  cancel: { 
    type: Boolean, 
    default: false 
  }
});

const Seat = mongoose.model('Seat', SeatSchema);

module.exports = Seat;