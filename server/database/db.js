import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectToMongoDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("MongoDB connected");
    } catch(error){
        console.log("MongoDB connection error:", error.message);
        // process.exit(1); // Exit process with failure
    }
}

export default connectToMongoDB;