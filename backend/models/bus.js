const mongoose = require('mongoose');

const busSchema = new mongoose.Schema({
departureLocation: {
    type: String,
    required: true
},
arrivalLocation: {
    type: String,
    required: true
},
departureTime: {
    type: String,
    required: true
},
arrivalTime: {
    type: String,
    required: true
},
turnTime: {
    type: String,
    enum: ['Morning', 'Afternoon', 'Evening', 'Night'],
    required: true
},
duration: {
    type: Number,
    required: true
},
price: {
    type: Number,
    required: true
},
availableSeats: {
    type: Number,
    required: true
},
conductor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'conductor' // Reference to the Conductor model
}
});

module.exports = mongoose.model('Bus', busSchema);