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

const __dirname = path.resolve();
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

// Serve static files
app.use(express.static(path.resolve(__dirname, "../../BlogAppFrontend/dist")));

// Route for all other requests (catch-all)
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../../BlogAppFrontend/dist/index.html"));
});

// Error handling middleware (should be at the end)
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

const port =process.env.PORT|| 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default app;
