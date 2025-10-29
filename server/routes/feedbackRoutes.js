import express from 'express';
import {
  createFeedback,
  getFeedbacks,
  getFeedbackById
} from '../controllers/feedbackController.js';
import { authMiddleware, adminMiddleware } from '../middlewares/auth.js';

const router = express.Router();

// Create feedback (public - no auth required)
router.post('/', createFeedback);

// Get all feedbacks (admin only)
router.get('/', authMiddleware, adminMiddleware, getFeedbacks);

// Get feedback by ID (admin only)
router.get('/:id', authMiddleware, adminMiddleware, getFeedbackById);

export default router;

