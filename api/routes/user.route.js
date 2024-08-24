import express, { Router } from 'express';
import test from '../controllers/user.controller.js';
import { updateUser, deleteUser , getUserListing} from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';
const router = express.Router();

router.get('/test', test)
router.post('/update/:id', updateUser)
router.delete('/delete/:id', verifyToken, deleteUser)
router.get('/listings/:id', verifyToken, getUserListing)

export default router;