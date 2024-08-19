import express, { Router } from 'express';
import sigup from '../controllers/auth.controller.js';

const authRouter = express.Router();

authRouter.post('/signup', sigup)

export default authRouter
