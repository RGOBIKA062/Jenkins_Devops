import express from 'express';
import { authMiddleware } from '../middleware/auth.js';
import { validateCreateEvent, validateUpdateEvent, validateReview } from '../utils/eventValidators.js';
import {
  createEvent,
  getAllEvents,
  getEventById,
  registerForEvent,
  addToWishlist,
  removeFromWishlist,
  getUserEvents,
  getUserRegisteredEvents,
  updateEvent,
  deleteEvent,
  addReview,
  trackShare,
} from '../controllers/eventController.js';

const router = express.Router();

// PUBLIC ROUTES
router.get('/all', getAllEvents);
router.get('/:id', getEventById);

// PROTECTED ROUTES
router.post('/create', authMiddleware, validateCreateEvent, createEvent);
router.post('/:eventId/register', authMiddleware, registerForEvent);
router.post('/:eventId/wishlist', authMiddleware, addToWishlist);
router.delete('/:eventId/wishlist', authMiddleware, removeFromWishlist);
router.get('/user/events', authMiddleware, getUserEvents);
router.get('/user/registered', authMiddleware, getUserRegisteredEvents);
router.put('/:eventId/update', authMiddleware, validateUpdateEvent, updateEvent);
router.delete('/:eventId/delete', authMiddleware, deleteEvent);
router.post('/:eventId/review', authMiddleware, validateReview, addReview);
router.post('/:eventId/track-share', authMiddleware, trackShare);

export default router;
