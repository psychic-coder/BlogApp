import "dotenv/config";
import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import mongoose from "mongoose";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";

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

// Middleware
app.use(helmet()); // Security headers
app.use(compression()); // Compress responses

// CORS configuration - allow requests from Vercel frontend
const corsOptions = {
  origin: process.env.FRONTEND_URL || "http://localhost:5173", // URL from Vercel
  credentials: true,
};
app.use(cors(corsOptions));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// API Routes
app.use("/api/user", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/post", postRoute);
app.use("/api/comment", commentRoute);
app.use("/api/autocomplete", autocompleteRoute);

// Health check endpoint for Render
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "OK", timestamp: new Date().toISOString() });
});

// For Render deployment serving index.html on root
app.get("/", (req, res) => {
  res.json({ message: "API is running. Frontend should be on Vercel." });
});

// Error handling middleware
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

