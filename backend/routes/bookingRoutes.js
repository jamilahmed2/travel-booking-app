import express from 'express';
const router = express.Router();
import { createBooking, getAllBooking, getBooking } from '../controllers/bookingController.js'
import { verifyAdmin, verifyUser } from '../middleware/verifyTokens.js'

router.post('/', verifyUser, createBooking);
router.get('/:id', verifyUser, getBooking);
router.get('/', verifyAdmin, getAllBooking);

export default router
