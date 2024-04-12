import express from 'express';
import path  from 'path';
import cookieParser  from 'cookie-parser' ;
import logger  from 'morgan' ;
import mongoose from 'mongoose' ;
import dotenv from 'dotenv' ;
import userRoute from './routes/userRoute.js';
import authRoute from './routes/authRoute.js' 


dotenv.config();


mongoose.connect('mongodb://localhost:27017/blogApp')
.then(()=>{
    console.log('Mongodb is connected')
})
.catch((err)=>{
    console.log(err);
})


var app = express();

app.use(logger('dev'));
//this is used to send data to the json
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


//we have imported the userRoutes first on the top
app.use('/api/user',userRoute);
app.use('/api/auth',authRoute)




const port =process.env.PORT||5000;
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})
export default app;