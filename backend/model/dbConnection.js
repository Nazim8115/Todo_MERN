import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/todoapp");
    console.log("Database connected successfully ");
  } catch (error) {
    console.error("Error in connecting to the database:", error);
  }
};

export default connectDB;
