
const express = require('express');
const router = express.Router();
const Bus = require('../models/bus');
const Conductor = require('../models/conductor');

// Create a new bus
router.post('/buses', async (req, res) => {
    try {
        const {
            departureLocation,
            arrivalLocation,
            departureTime,
            arrivalTime,
            turnTime,
            duration,
            price,
            availableSeats,
            conductor
        } = req.body;

        const newBus = new Bus({
            departureLocation,
            arrivalLocation,
            departureTime,
            arrivalTime,
            turnTime,
            duration,
            price,
            availableSeats,
            conductor
        });
        

        await newBus.save();
        res.status(201).json({ message: 'Bus added successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Get all buses
router.get('/buses', async (req, res) => {
    try {
        const { departureLocation, arrivalLocation, turnTime } = req.query;

        // Construct query conditions based on provided parameters
        const query = {};
        if (departureLocation) {
            query.departureLocation = departureLocation;
        }
        if (arrivalLocation) {
            query.arrivalLocation = arrivalLocation;
        }
        if (turnTime) {
            query.turnTime = turnTime;
        }

        // Find buses matching the query conditions and populate the conductor field
        const buses = await Bus.find(query).populate('conductor', 'conductorname');

        res.json(buses);
    } catch (error) {
        console.error('Error searching buses:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Update a bus
router.put('/buses/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { departureLocation, arrivalLocation, departureTime, arrivalTime, turnTime, duration, price, availableSeats, conductor } = req.body;

        const updatedBus = await Bus.findByIdAndUpdate(id, {
            departureLocation,
            arrivalLocation,
            departureTime,
            arrivalTime,
            turnTime,
            duration,
            price,
            availableSeats,
            conductor
        }, { new: true });

        if (!updatedBus) {
            return res.status(404).json({ message: 'Bus not found' });
        }

        res.json(updatedBus);
    } catch (error) {
        console.error('Error updating bus:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Delete a bus
router.delete('/buses/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedBus = await Bus.findByIdAndDelete(id);

        if (!deletedBus) {
            return res.status(404).json({ message: 'Bus not found' });
        }

        res.json({ message: 'Bus deleted successfully' });
    } catch (error) {
        console.error('Error deleting bus:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;