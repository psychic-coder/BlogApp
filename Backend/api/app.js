import "dotenv/config";
import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import mongoose from "mongoose";
import userRoute from "./routes/userRoute.js";
import authRoute from "./routes/authRoute.js";
import postRoute from "./routes/postRoute.js";
import commentRoute from "./routes/commentRoute.js";
import autocompleteRoute from "./routes/autocompleteRoute.js";
const __dirname = path.resolve();

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
app.use("/api/autocomplete", autocompleteRoute);

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "OK", timestamp: new Date().toISOString() });
});

// Serve static files


// Route for all other requests (catch-all)
app.get("/", (req, res) => {
  const frontendPath = path.resolve(__dirname, "..", "BlogAppFrontend", "dist");
  app.use(express.static(frontendPath));
  res.sendFile(path.join(frontendPath, "index.html"));
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

export default app;
