import mongoose from "mongoose";

export const connectDB = async () => {
    try{
       await mongoose.connect(process.env.MONGO_URL);
       console.log("MONGODB CONNECTED SUCCESSFULLY!");
    } catch(error) {
        console.log("Error Connecting To MONGODB!", error);
        process.exit(1) // Exit With Failure
    }
}