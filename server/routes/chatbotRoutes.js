import express from 'express';
import { chatWithBot } from '../controllers/chatbotController.js';
import { authMiddleware } from '../middlewares/auth.js';

const router = express.Router();

// Chatbot endpoint (works with or without auth, but provides better context if authenticated)
router.post('/', async (req, res, next) => {
  // Try to authenticate, but don't fail if no token
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (token) {
      const jwt = await import('jsonwebtoken');
      const decoded = jwt.default.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
    } else {
      req.user = null;
    }
  } catch (error) {
    req.user = null;
  }
  next();
}, chatWithBot);

export default router;



