import mongoose from "mongoose";

const connectDb = async () => {

    mongoose.connection.on("connected", () => {
        console.log("DB connection established")
    })

    await mongoose.connect(`${process.env.MONGODB_URI}`)
};

export default connectDb;