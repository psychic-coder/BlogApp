import  express from  'express';
import test from '../controllers/user.controller.js'

const router=express.Router();

router.get('/test',test
);

//we also have to import the user.controller in app.js
export default router;