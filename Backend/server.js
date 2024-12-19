import dotenv from "dotenv";
dotenv.config();
import app from "./app.js";
import mongoose from "mongoose";

const PORT = process.env.PORT || 5000;

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

const server = async () => {
  try {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
    await connectDB();
  } catch (error) {
    console.log(error);
  }
};

server();
