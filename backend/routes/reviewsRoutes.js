import express from 'express';
const router = express.Router();
import { createReview } from '../controllers/reviewController.js'
import {verifyUser} from '../middleware/verifyTokens.js'

router.post('/:id', verifyUser, createReview);

export default router
