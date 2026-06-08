import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import leadRoutes from "./routes/leadRoutes";
import authRoutes from "./routes/authRoutes"; 

dotenv.config();

const app = express();

// MIDDLEWARE
app.use(cors());
app.use(express.json());

// TEST ROUTE
app.get("/", (req, res) => {
  res.send("API Working");
});

// ROUTES
app.use("/api/leads", leadRoutes);
app.use("/api/auth", authRoutes); // signup/login goes here

// DB CONNECTION
mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => {
    console.log("Mongo Error:", err);
  });

// SERVER START
const PORT = 5000;

app.listen(PORT, () => {
  console.log("SERVER STARTED");
  console.log(`Server running on port ${PORT}`);
});
