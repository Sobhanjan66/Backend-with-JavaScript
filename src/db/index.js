import mongoose from "mongoose"
import {DB_NAME} from "../constants.js";

const connectDB = async () => {
    try {
        const conInstance = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
        console.log(`\n MongoDB connected !! DB HOST: ${conInstance.connection.host}`);  
    } catch (error) {
        console.log("MONGODB CONNECTION ERROR: ", error);
        process.exit(1)
    }
} 

export default connectDB