import Feedback from '../models/Feedback.js';

export const createFeedback = async (req, res) => {
  try {
    const { name, email, rating, message } = req.body;

    if (!name || !email || !rating || !message) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({ message: 'Rating must be between 1 and 5' });
    }

    const feedback = new Feedback({
      name,
      email,
      rating: parseInt(rating),
      message
    });

    await feedback.save();

    res.status(201).json({
      message: 'Feedback submitted successfully. Thank you!',
      feedback
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getFeedbacks = async (req, res) => {
  try {
    // Only admins can view all feedbacks
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admin only.' });
    }

    const feedbacks = await Feedback.find({})
      .sort({ createdAt: -1 }); // Most recent first

    res.json(feedbacks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getFeedbackById = async (req, res) => {
  try {
    // Only admins can view individual feedbacks
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admin only.' });
    }

    const feedback = await Feedback.findById(req.params.id);

    if (!feedback) {
      return res.status(404).json({ message: 'Feedback not found' });
    }

    res.json(feedback);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

