import express from 'express';
import  signup from '../controllers/auth.controller.js'
import bcrypt from 'bcryptjs';



const router=express.Router();

router.post('/signup',signup)

export default router;