import User from "../models/userModel.js";
import bcryptjs from "bcryptjs";
import errorHandler from "../utils/error.js";
import jwt from "jsonwebtoken"


export const signup = async (req, res,next) => {
  const { username, email, password } = req.body;
  if (
    !username ||
    !email ||
    !password ||
    username === "" ||
    email === "" ||
    password === ""
  ) {
    //in the below code are accessing the error handler using our middleware function
    next(errorHandler(400,"All fields are required"));
  }

const hashPassword=bcryptjs.hashSync(password,10);

  const newUser = new User({
    username,
    email,
    password:hashPassword,
  });
  try {
    await newUser.save();
    res.json("Signup is successful");
  } catch (error) {
    //on typing the next were are directly accessing our middleware
    next(error)
  }
};

export const signin=async (req,res,next)=>{
  const {email ,password}=req.body;

  if(!email || !password || email==='' || password==='' ){
    //in the below code are accessing the error handler using our middleware function
    next(errorHandler(400,'All fields are required'));
  }
  try {

    const validUser=await User.findOne({email});
    if(!validUser){
     return  next(errorHandler(400,'No user with this email '))
    }
    {/*we added return so it does not goes to the next line*/}
    const validPassword=bcryptjs.compareSync(password,validUser.password);
    if(!validPassword){
     return next(errorHandler(400,'Invalid Password'))
    }

    //if everything is correct then we are creating a token
    const token =jwt.sign(
     {id:validUser._id},
     process.env.JWT_SECRET,
    )

    //in the below line we are removing the password by seperating it from the rest
    //we are storing the value of password in pass and the other goes in rest
    const {password:pass,...rest}=validUser._doc;


    //now we are storing the user on the cookie of the user
    //httpOnly:true is done to make the user safe
    res.status(200).cookie('access_token',token,{
      httpOnly:true,

    }).json(rest);
    
  } catch (error) {
    next(error)
  }
}



