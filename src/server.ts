import mongoose from 'mongoose';
import { DATABASE_URI, PORT } from './app/config/config';
import app from './app';


// Server Engine😆
async function main( ) {
    try {
         await mongoose.connect(DATABASE_URI as string, {
            serverSelectionTimeoutMS: 5000
         });
         console.log("✅ Database connected");

         app.listen(PORT, () => {
            console.log(`server started on http://localhost:${PORT}`);
         })
    } catch (error) {
        console.log(error);
    }
};


// Start the Engine and boom💥
main();