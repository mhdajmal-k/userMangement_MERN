import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect("mongodb://localhost:27017/usm-react");
    console.log("db connected successfully ");
  } catch (error) {
    console.log(error);
  }
};
