// routes/reportRouter.js
/*const express = require('express');
const pdf = require('pdfkit');

const router = express.Router();

// Example data (in practice, this data should come from your database)
const bookings = [
    { name: 'Booking 1', status: 'all' },
    { name: 'Booking 2', status: 'all' },
    { name: 'Approved Booking 1', status: 'approved' },
    { name: 'Approved Booking 2', status: 'approved' },
    { name: 'Canceled Booking 1', status: 'canceled' },
    { name: 'Canceled Booking 2', status: 'canceled' }
];

const userDetails = [
    { name: 'User 1' },
    { name: 'User 2' }
];

// Generate report endpoint
router.get('/generate-report', (req, res) => {
    const { status } = req.query; // Get the status from query parameters

    // Filter bookings based on status
    const filteredBookings = bookings.filter(booking => status === 'all' || booking.status === status);

    const doc = new pdf();

    // Create the PDF in memory
    let buffers = [];
    doc.on('data', buffers.push.bind(buffers));
    doc.on('end', () => {
        let pdfData = Buffer.concat(buffers);
        res.writeHead(200, {
            'Content-Length': Buffer.byteLength(pdfData),
            'Content-Type': 'application/pdf',
            'Content-Disposition': 'attachment;filename=report.pdf',
        }).end(pdfData);
    });

    // Add content to the PDF
    doc.fontSize(20).text('Booking Report', { align: 'center' }).moveDown();
    doc.fontSize(14).text('Bookings:', 50, 100).moveDown();
    filteredBookings.forEach((booking, index) => {
        doc.text(`${index + 1}. ${booking.name}`);
    });
    doc.moveDown();
    doc.fontSize(14).text('User Details:', 50, doc.y).moveDown();
    userDetails.forEach((user, index) => {
        doc.text(`${index + 1}. ${user.name}`);
    });

    // Finalize the PDF and end the stream
    doc.end();
});

module.exports = router;*/



const express = require('express');
const router = express.Router();
const Seat = require('../models/seat');
const User = require('../models/users');
const Conductor = require('../models/conductor');

// Define a function to handle different types of requests
const handleRequest = async (req, res) => {
    const { type} = req.query;
  
    try {
      switch (type) {
        case 'bookings':
          return res.json(await Seat.find());
        case 'approvedBookings':
          let filterApproved = { approved: true };
          if (startDate && endDate) {
            filterApproved.date = { $gte: new Date(startDate), $lte: new Date(endDate) };
          }
          return res.json(await Seat.find(filterApproved));
        case 'pendingBookings':
          const currentDate = new Date();
          return res.json(await Seat.find({ approved: false, date: { $gte: currentDate } }).sort({ createdAt: -1 }));
        case 'cancelledBookings':
          return res.json(await Seat.find({ cancel: true }));
        case 'Users':
          return res.json(await User.find());
        case 'conductors':
          return res.json(await Conductor.find());
        default:
          return res.status(400).json({ message: 'Invalid request type' });
      }
    } catch (error) {
      console.error('Error:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };

  // Route to handle data requests
router.get('/data', async (req, res) => {
    handleRequest(req, res);
  });
  
module.exports = router;
