import mongoose from 'mongoose';
import config from '../Configs.js';

const MONGO_URI = config.MONGO_URI;

function connectDB() {
    mongoose.connect(MONGO_URI)
    .then(() => {
        console.log("Database Connected Successfully");
    })
    .catch((error) => {
        console.log("Error Connecting Database", error);
    })
}

export default connectDB;
