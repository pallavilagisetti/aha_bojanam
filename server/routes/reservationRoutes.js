import express from 'express';
import {
  createReservation,
  getReservations,
  getReservationById,
  updateReservationStatus
} from '../controllers/reservationController.js';
import { authMiddleware, adminMiddleware } from '../middlewares/auth.js';

const router = express.Router();

// Create reservation (public - no auth required, but will link to user if token provided)
router.post('/', async (req, res, next) => {
  // Try to authenticate, but don't fail if no token
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (token) {
      const jwt = await import('jsonwebtoken');
      const decoded = jwt.default.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
    } else {
      req.user = { userId: null, role: 'customer' };
    }
  } catch (error) {
    req.user = { userId: null, role: 'customer' };
  }
  next();
}, createReservation);

// Get reservations (requires auth)
router.get('/', authMiddleware, getReservations);
router.get('/:id', authMiddleware, getReservationById);
router.put('/:id/status', authMiddleware, adminMiddleware, updateReservationStatus);

export default router;

