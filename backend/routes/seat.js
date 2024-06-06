

const express = require('express');
const router = express.Router();
//const { auth } = require('../middleware/auth');
const Seat = require('../models/seat');
const Bus = require('../models/bus');
const nodemailer = require('nodemailer');

// Create a new booking
router.post('/book', async (req, res) => {
  const { busId, passengerName, date, turnTime, email, departure, from } = req.body;

  try {
    const seat = new Seat({ busId, passengerName, date, turnTime, email, departure, from, approved: false });
    await seat.save();
    res.status(201).json(seat);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Check seat availability
router.get('/availability', async (req, res) => {
  const { busId, date, turnTime } = req.query;

  try {
    // Find the bus by ID
    const bus = await Bus.findById(busId);
    if (!bus) {
      return res.status(404).json({ message: 'Bus not found' });
    }

    // Count the booked seats for the given bus, date, and turn time
    const bookedSeatsCount = await Seat.countDocuments({ busId, date, turnTime, approved: true });

    // Calculate the available seats
    const availableSeats = bus.totalSeats - bookedSeatsCount;

    // Send the response
    res.status(200).json({ totalSeats: bus.totalSeats, bookedSeats: bookedSeatsCount, availableSeats });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get all bookings (GET)
router.get('/bookings', async (req, res) => {
  try {
    const bookings = await Seat.find();
    res.status(200).json(bookings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Approve a booking
router.put('/seat/approve/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const seatId = id.replace(/^:/, ''); // Remove leading colon if it exists
    const seat = await Seat.findById(seatId);
    if (!seat) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Add busId validation
    if (!seat.busId) {
      return res.status(400).json({ message: 'busId is required' });
    }

    seat.approved = true;
    await seat.save();

    const { email, passengerName } = seat;
    const subject = 'Booking Approved';
    const text = `Dear ${passengerName},\n\nYour booking has been approved.\n\n Your Booking date is ${date},\n\nYour booking id: ${id}, Thank you for choosing our service.\n\nBest regards,\nYour Company Name`;

    await sendEmail(email, subject, text);

    res.status(200).json({ message: 'Booking approved successfully', seat });
  } catch (error) {
    console.error('Error approving booking:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get all approved bookings
router.get('/bookings/approved', async (req, res) => {
  try {
    const { fromDate } = req.query;
    let filter = { approved: true };

    if (fromDate) {
      filter.date = { $gte: new Date(fromDate) };
    }
    const approvedBookings = await Seat.find(filter);
    res.status(200).json(approvedBookings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get count of approved bookings for the current month
router.get('/bookings/approved/count', async (req, res) => {
  try {
    const startOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
    const endOfMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0);
    const count = await Seat.countDocuments({
      approved: true,
      date: { $gte: startOfMonth, $lte: endOfMonth }
    });
    res.status(200).json({ count });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all pending bookings sorted by latest date
router.get('/bookings/pending', async (req, res) => {
  try {
    const currentDate = new Date();
    const pendingBookings = await Seat.find({ approved: false, date: { $gte: currentDate } }).sort({ createdAt: -1 });
    res.status(200).json(pendingBookings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


/*const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: 'xpressbookings14@gmail.com',
    pass: 'Xpress@123',
  },
});

// Function to send email
const sendEmail = async (to, subject, text) => {
  try {
    // send mail with defined transport object
    await transporter.sendMail({
      from: '"XpressBookings" <xpressbookings14@gmail.com>', // sender address
      to, // list of receivers
      subject, // Subject line
      text, // plain text body
    });

    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
  }
};*/

// Get all approved bookings or filter by date
/*router.get('/bookings/approved', async (req, res) => {
  try {
    const { fromDate, toDate } = req.query;
    let filter = { approved: true };

    if (fromDate) {
      filter.date = { $gte: new Date(fromDate) };
    }

    if (toDate) {
      filter.date = { ...filter.date, $lte: new Date(toDate) };
    }

    const approvedBookings = await Seat.find(filter);
    res.status(200).json(approvedBookings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all pending bookings
router.get('/bookings/pending', async (req, res) => {
  try {
    const pendingBookings = await Seat.find({ approved: false, cancel: false });
    res.status(200).json(pendingBookings);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Cancel a booking
/*router.delete('/seat/cancel/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const seatId = id.replace(/^:/, '');
    const seat = await Seat.findOne({ _id: seatId }); // Use findOne() instead of findById()
    if (!seat) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Optionally, add additional validation here

    

    /*const { email, passengerName } = seat;
    const subject = 'Booking Cancelled';
    const text = `Dear ${passengerName},\n\nYour booking has been cancelled. We apologize for any inconvenience caused.\n\nBest regards,\nYour Company Name`;

    await sendEmail(email, subject, text);*/
    
    /*seat.cancel = true;
    await seat.save();

    res.status(200).json({ message: 'Booking cancelled successfully' });
  } catch (error) {
    console.error('Error cancelling booking:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});*/


// Mark booking as cancelled and send email
router.put('/bookings/cancel-request/:id', async (req, res) => {
  const { id } = req.params;

  // Check if the id is a valid MongoDB ObjectId
  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({ message: 'Invalid booking ID' });
  }

  try {
    const seat = await Seat.findById(id);
    if (!seat) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    
    // Check if the booking is approved
    if (!seat.approved) {
      return res.status(400).json({ message: 'Booking is not approved yet' });
    }

    // If the booking is already cancelled, return a message indicating that it's already cancelled
    if (seat.cancel) {
      return res.status(400).json({ message: 'Booking is already cancelled' });
    }

    // Mark the booking as cancelled
    seat.cancel = true;
    await seat.save();
    
    const { email, passengerName } = seat;
    const subject = 'Booking Cancelled';
    const text = `Dear ${passengerName},\n\nYour reservation with ID ${id} has been cancelled. We apologize for any inconvenience caused.\n\nBest regards,\nXpress Bookings`;

    await sendEmail(email, subject, text);

    res.status(200).json({ message: 'Reservation cancelled successfully', seat });
  } catch (error) {
    console.error('Error cancelling reservation:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get all cancelled bookings
router.get('/bookings/cancelled', async (req, res) => {
  try {
    const cancelledBookings = await Seat.find({ cancel: true });
    res.status(200).json(cancelledBookings);
  } catch (error) {
    console.error('Error fetching cancelled bookings:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get count of cancelled bookings for the current month
router.get('/bookings/cancelled/count', async (req, res) => {
  try {
    const startOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
    const endOfMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0);
    const count = await Seat.countDocuments({
      approved: false,
      date: { $gte: startOfMonth, $lte: endOfMonth }
    });
    res.status(200).json({ count });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});




// Get cancellation request and booking details by booking ID
router.get('/booking/cancel-requests/:id', async (req, res) => {
  const { id } = req.params;

  // Check if the id is a valid MongoDB ObjectId
  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({ message: 'Invalid booking ID' });
  }

  try {
    // Find the cancellation request by booking ID
    const cancellationRequest = await Seat.findOne({ _id: id, cancel: true });
    if (!cancellationRequest) {
      return res.status(404).json({ message: 'Cancellation request not found' });
    }

    // Find the associated booking details
    const bookingDetails = await Seat.findById(id);
    if (!bookingDetails) {
      return res.status(404).json({ message: 'Booking details not found' });
    }

    res.status(200).json({ cancellationRequest, bookingDetails });
  } catch (error) {
    console.error('Error fetching cancellation request and booking details:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/*router.get('/booking/cancel-requests', async (req, res) => {
  try {
    // Find all cancellation requests
    const cancellationRequests = await Seat.find({ cancel: true });

    // Check if there are no cancellation requests
    if (!cancellationRequests || cancellationRequests.length === 0) {
      return res.status(404).json({ message: 'No cancellation requests found' });
    }

    res.status(200).json(cancellationRequests);
  } catch (error) {
    console.error('Error fetching cancellation requests:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});*/

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: 'xpressbookings14@gmail.com',
    pass: 'tizh hnfd bxst xpzs',
  },
});

// Function to send email
const sendEmail = async (to, subject, text) => {
  try {
    // send mail with defined transport object
    await transporter.sendMail({
      from: '"XpressBookings" <xpressbookings14@gmail.com>', // sender address
      to, // list of receivers
      subject, // Subject line
      text, // plain text body
    });

    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
  }
};


// Get all pending cancellation requests
/*router.get('/notifications/cancellations', async (req, res) => {
  try {
    const cancellationRequests = await Seat.find({ cancel: true, approved: false });
    res.status(200).json(cancellationRequests);
  } catch (error) {
    console.error('Error fetching cancellation requests:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});*/

// Delete requested cancel
/*router.delete('/notification/cancellations/:id', async (req, res) => {
  const { id } = req.params;

  // Check if the id is a valid MongoDB ObjectId
  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({ message: 'Invalid cancellation request ID' });
  }

  try {
    const cancellationRequest = await Seat.findById(id);
    if (!cancellationRequest) {
      return res.status(404).json({ message: 'Cancellation request not found' });
    }

    await Seat.deleteOne({ _id: id });

    res.status(200).json({ message: 'Cancellation request deleted successfully' });
  } catch (error) {
    console.error('Error deleting cancellation request:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});*/

// Helper function to get the start and end of a month
const getMonthRange = (year, month) => {
  const startOfMonth = new Date(year, month, 1);
  const endOfMonth = new Date(year, month + 1, 0);
  return { startOfMonth, endOfMonth };
};

// Get monthly approved and canceled bookings count
router.get('/bookings/monthly-stats', async (req, res) => {
  try {
      const currentYear = new Date().getFullYear();
      const currentMonth = new Date().getMonth();
      const previousMonth = currentMonth === 0 ? 11 : currentMonth - 1;
      const previousYear = previousMonth === 11 ? currentYear - 1 : currentYear;

      const { startOfMonth: startOfCurrentMonth, endOfMonth: endOfCurrentMonth } = getMonthRange(currentYear, currentMonth);
      const { startOfMonth: startOfPreviousMonth, endOfMonth: endOfPreviousMonth } = getMonthRange(previousYear, previousMonth);

      const currentMonthApprovedCount = await Booking.countDocuments({
          approved: true,
          createdAt: { $gte: startOfCurrentMonth, $lte: endOfCurrentMonth }
      });

      const currentMonthCanceledCount = await Booking.countDocuments({
          canceled: true,
          createdAt: { $gte: startOfCurrentMonth, $lte: endOfCurrentMonth }
      });

      const previousMonthApprovedCount = await Booking.countDocuments({
          approved: true,
          createdAt: { $gte: startOfPreviousMonth, $lte: endOfPreviousMonth }
      });

      const previousMonthCanceledCount = await Booking.countDocuments({
          canceled: true,
          createdAt: { $gte: startOfPreviousMonth, $lte: endOfPreviousMonth }
      });

      res.status(200).json({
          currentMonth: {
              approved: currentMonthApprovedCount,
              canceled: currentMonthCanceledCount
          },
          previousMonth: {
              approved: previousMonthApprovedCount,
              canceled: previousMonthCanceledCount
          }
      });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
  }
});



// Endpoint to get all bookings for a specific date and turn time
router.get('/bookings/bydate', async (req, res) => {
  const { fromDate, toDate } = req.query;

  if (!fromDate || !toDate) {
    return res.status(400).json({ message: 'Both fromDate and toDate are required' });
  }

  try {
    const fromDateObj = new Date(fromDate);
    const toDateObj = new Date(toDate);
    toDateObj.setHours(23, 59, 59, 999); // Include the entire toDate day

    const bookings = await Seat.find({ date: { $gte: fromDateObj, $lte: toDateObj } });
    const approvedBookings = await Seat.find({ date: { $gte: fromDateObj, $lte: toDateObj }, approved: true });
    const cancelledBookings = await Seat.find({ date: { $gte: fromDateObj, $lte: toDateObj }, cancel: true });

    res.status(200).json({
      bookings,
      approvedBookings,
      cancelledBookings,
    });
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});



module.exports = router;