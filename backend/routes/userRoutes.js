import express from 'express';
const router = express.Router();
import { updateUser, deleteUser, getSingleUser, getAllUsers } from '../controllers/userController.js'
import { verifyUser, verifyAdmin } from '../middleware/verifyTokens.js';

router.get('/', verifyAdmin, getAllUsers);
router.get('/:id', verifyUser, getSingleUser);
router.put('/:id', verifyUser, updateUser);
router.delete('/:id', verifyUser, deleteUser);

export default router
