import mongoose from 'mongoose';
const connectDB  = async () => {
    try{
        const conn = await mongoose.connect(process.env.MONGO_URL)
        console.log(`Connected To Mongodb Database ${conn.connection.host}`.bgMagenta.white);

    } catch (error){
        // console.log(`Error in Mongodb $ {error}`.bgRed.white);
        console.log(`Error  in Mongodb ${error.message}`);
        // if there is any error then exit forcefully
        process.exit(1);
    }
}

export default connectDB;