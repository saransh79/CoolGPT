import mongoose from 'mongoose';

const database = async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI);

        console.log("Connected to MongoDB Database.".bgGreen.white);
    } catch (error) {
        console.log(`Mongodb Database Error: ${error}`.bgRed.white);
    }
}

export default database;