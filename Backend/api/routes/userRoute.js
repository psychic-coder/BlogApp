import  express from  'express';
import {deleteUser, test, updateUser} from '../controllers/user.controller.js'
import { verifyToken } from '../utils/verifyUser.js';

const router=express.Router();

router.get('/test',test
);

router.put('/update/:userId',verifyToken,updateUser);
router.delete('/delete/:userId', verifyToken, deleteUser);

//we also have to import the user.controller in app.js
export default router;