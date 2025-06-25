import mongoose from 'mongoose';
import { DATABASE_URI, PORT } from './app/config/config';
import app from './app';


// Server Engine😆
async function main( ) {
    try {
         mongoose.connect(DATABASE_URI as string)
         .then(() => {
            console.log("Database connected");
         }).catch((e) => {
            console.log(e);
         });

         app.listen(PORT, () => {
            console.log(`server started on http://localhost:${PORT}`);
         })
    } catch (error) {
        console.log(error);
    }
};


// Start the Engine and boom💥
main();