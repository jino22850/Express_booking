
const express = require('express');
const router = express.Router();
const Feedback = require('../models/feedback');
const Conductor = require('../models/conductor');

// Route for submitting feedback
router.post('/feedbackadd', async (req, res) => {
  try{
    const {
      fName,
      lName,
      email,
      phone,
      message
}= req.body;

    const newConductor= new Conductor({
      fName,
      lName,
      email,
      phone,
      message
    });

    await newConductor.save();
    res.status(201).json({ message: 'Bus added successfully' });
} catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
}
});
  
 /* try {
    const feedback = new Feedback(req.body);
    await feedback.save();
    res.status(201).json({ success: true, message: 'Feedback submitted successfully' });
  } catch (error) {
    console.error('Error submitting feedback:', error);
    res.status(500).json({ success: false, message: 'Failed to submit feedback' });
  }
});*/
// Route for retrieving all feedbacks
router.get('/feedback', async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 }); // Sorted by creation date
    res.status(200).json({ success: true, feedbacks });
  } catch (error) {
    console.error('Error fetching feedbacks:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch feedbacks' });
  }
});

/// Route for retrieving positive feedbacks
router.get('/feedback/positive', async (req, res) => {
  try {
    const positiveFeedbacks = await Feedback.find({ isPositive: true });
    res.status(200).json({ success: true, positiveFeedbacks });
  } catch (error) {
    console.error('Error fetching positive feedbacks:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch positive feedbacks' });
  }
});

// Approve feedback
router.post('/approve', async (req, res) => {
  const { id } = req.body;
  try {
    const feedback = await Feedback.findByIdAndUpdate(id, { approved: true }, { new: true });
    res.json({ success: true, feedback });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to approve feedback' });
  }
});

// Route for retrieving approved feedbacks
router.get('/feedback/approved', async (req, res) => {
  try {
    const approvedFeedbacks = await Feedback.find({ approved: true });
    res.status(200).json({ success: true, approvedFeedbacks });
  } catch (error) {
    console.error('Error fetching approved feedbacks:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch approved feedbacks' });
  }
});

// Route for retrieving all feedbacks
router.get('/feedback', async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 }); // Sorted by creation date
    res.status(200).json({ success: true, feedbacks });
  } catch (error) {
    console.error('Error fetching feedbacks:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch feedbacks' });
  }
});

module.exports = router;