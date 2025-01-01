import mongoose from 'mongoose';

export const db = async () => {
    try {
        const con = await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to database');
    } catch (error) {
        console.error('Error connecting to database: ', error);
        process.exit(1);
    }
}