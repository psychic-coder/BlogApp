import express from 'express';
import  {signup,signin} from '../controllers/auth.controller.js'
import bcrypt from 'bcryptjs';



const router=express.Router();

router.post('/signup',signup)
router.post('/signin',signin)

export default router;