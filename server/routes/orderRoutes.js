import express from 'express';
import {
  getOrders,
  getOrderById,
  checkout,
  updateOrderStatus
} from '../controllers/orderController.js';
import { authMiddleware, adminMiddleware } from '../middlewares/auth.js';

const router = express.Router();

// All routes require authentication
router.use(authMiddleware);

router.get('/', getOrders);
router.get('/:id', getOrderById);
router.post('/checkout', checkout);
router.put('/:id/status', adminMiddleware, updateOrderStatus);

export default router;


