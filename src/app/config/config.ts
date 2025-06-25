import dotenv from 'dotenv';
dotenv.config();


export const DATABASE_URI = process.env.MONGODB_URI;
export const PORT = process.env.PORT || 5000;