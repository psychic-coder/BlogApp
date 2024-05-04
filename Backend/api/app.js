import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoute from "./routes/userRoute.js";
import authRoute from "./routes/authRoute.js";
import postRoute from "./routes/postRoute.js";
import commentRoute from "./routes/commentRoute.js";

const __dirname=path.resolve();
//the below code is written to config the .env file
dotenv.config();

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Mongodb is connected");
  })
  .catch((err) => {
    console.log(err);
  });

var app = express();

app.use(logger("dev"));
//this is used to send data to the json
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//we have imported the userRoutes first on the top
app.use("/api/user", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/post", postRoute);
app.use("/api/comment", commentRoute);

app.use(express.static(path.join(__dirname, '../../BlogAppFrontend/dist')));

app.get('*', (req, res) => {
  try {
    res.sendFile(path.join(__dirname, '../../BlogAppFrontend','dist','index.html'));
  } catch (err) {
    console.log('Error sending index.html:', err);
    res.status(500).send('Internal Server Error');
  }
});

//its a custom middleware  we created for showing the error
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

const port = 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
export default app;
