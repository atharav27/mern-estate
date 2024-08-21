import express, { Router } from 'express';
import  {sigup, signin, google } from '../controllers/auth.controller.js';

const authRouter = express.Router();

authRouter.post('/signup', sigup)
authRouter.post('/signin', signin)
authRouter.post('/google', google)

           
export default authRouter