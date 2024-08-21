
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

// Get all buses based on query parameters
router.get('/buses', async (req, res) => {
    try {
        const { departureLocation, arrivalLocation, date } = req.query;

        // Construct query conditions based on provided parameters
        const query = {};
        if (departureLocation) {
            query.departureLocation = departureLocation;
        }
        if (arrivalLocation) {
            query.arrivalLocation = arrivalLocation;
        }

        // Parse the date query parameter
        if (date) {
            let searchDate = new Date(date);
            if (!searchDate.getTime()) {
                return res.status(400).json({ message: 'Invalid date format' });
            }

            // Get the day of the week for the provided date
            const dayOfWeek = searchDate.getDay();

            // Fetch all buses (assuming daily recurrence for simplicity)
            const buses = await Bus.find(query).populate('conductor', 'conductorname');

            // Filter buses that run on the specified date
            // For daily schedules, we assume that all buses run every day
            res.json(buses);
        } else {
            // Return all buses if no date is specified
            const buses = await Bus.find(query).populate('conductor', 'conductorname');
            res.json(buses);
        }
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