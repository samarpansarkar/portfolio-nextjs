import mongoose from "mongoose";

const mongoURL = process.env.MONGO_URL;

export const dbConnect = async () => {
  if (mongoose.connection.readyState >= 1) return;
  return mongoose;
};
