import express from 'express';
import {
  getMenuItems,
  getMenuItemById,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem
} from '../controllers/menuController.js';
import { authMiddleware, adminMiddleware } from '../middlewares/auth.js';

const router = express.Router();

// Public routes
router.get('/', getMenuItems);
router.get('/:id', getMenuItemById);

// Admin only routes
router.post('/', authMiddleware, adminMiddleware, createMenuItem);
router.put('/:id', authMiddleware, adminMiddleware, updateMenuItem);
router.delete('/:id', authMiddleware, adminMiddleware, deleteMenuItem);

export default router;



