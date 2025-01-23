import mongoose from "mongoose";
import { mongoUri } from "./env";

const connectDB = async () => {
    try {
        await mongoose.connect(mongoUri);
        console.log("MongoDB connected successfully...");
    } catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1);
    }
};

export default connectDB;
