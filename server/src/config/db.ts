import mongoose from "mongoose";

/**
 * Establishes connection to MongoDB using Mongoose.
 * This function should be called before starting the server.
 */
const connectDB = async () => {
  try {
    // Connect to MongoDB using connection string from environment variables
    await mongoose.connect(process.env.MONGO_URI!);

    console.log("MongoDB Connected");
  } catch (error) {
    // Log any connection errors for debugging purposes
    console.log(error);
  }
};

export default connectDB;