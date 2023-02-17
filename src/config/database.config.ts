import mongoose from 'mongoose';

const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.DB_URI!);
    console.log(`mongodb connected`);
  } catch (error) {
    console.log(`mongodb connect error :::: ${error}`);
  }
}

export default dbConnect;