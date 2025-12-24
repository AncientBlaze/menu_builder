import mongoose from "mongoose";

export const connectDB = async (): Promise<void> => {
    try {
        const conn = await mongoose.connect(process.env.DB_URL!);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        console.error("Error from connect DB:", errorMessage);
        throw error;
    }
};
