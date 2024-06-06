
const express = require('express');
const router = express.Router();
const Seat = require('../models/seat');

router.put("/approve/:bookingid", async (req, res) => {
    try {
        const booking = await Seat.findById(req.params.id);
        if (!booking) return res.status(404).send('Job not found');
        
        const approvedBooking = new approvedBooking(booking.toObject());
        await approvedBooking.save();
        await booking.findByIdAndDelete(req.params.id);
        
        res.send('Job approved successfully');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});