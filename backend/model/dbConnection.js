import mongoose from "mongoose";
import "dotenv/config";
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.db_url);
    console.log("Database connected successfully ");
  } catch (error) {
    console.error("Error in connecting to the database:", error);
  }
};

export default connectDB;
