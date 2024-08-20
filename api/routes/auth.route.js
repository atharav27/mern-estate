import express, { Router } from 'express';
import  {sigup, signin } from '../controllers/auth.controller.js';

const authRouter = express.Router();

authRouter.post('/signup', sigup)
authRouter.post('/signin', signin)
           
export default authRouter