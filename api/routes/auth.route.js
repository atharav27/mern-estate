import express, { Router } from 'express';
import  {sigup, signin, google, signOut } from '../controllers/auth.controller.js';

const authRouter = express.Router();

authRouter.post('/signup', sigup)
authRouter.post('/signin', signin)
authRouter.post('/google', google)
authRouter.get('/signout', signOut)

           
export default authRouter