import User from "../models/userModel.js";
import bcryptjs from "bcryptjs";
import errorHandler from "../utils/error.js";


const signup = async (req, res,next) => {
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
export default signup;
