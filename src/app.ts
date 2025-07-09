import express, { NextFunction, Request, Response } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import hpp from 'hpp';
import bookRouter from './app/router/book.router';
import borrowRouter from './app/router/borrow.router';

const app = express();

// Middleware
app.use(cors({
    origin: "https://libraryapp-three-iota.vercel.app"
}))
app.use(helmet());
app.use(hpp());
app.use(express.json());


// Application routing
app.use('/api/book', bookRouter);
app.use('/api/borrow', borrowRouter);

// No route matching handler
app.use((req: Request, res: Response) => {
    res.status(404).json({message: "No route matches"})
} );


// Global error handling
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    if(err.name === "ValidationError") {
        res.status(500).json({
        message: "Validation error",
        success: false,
        error: err
    });
    }else {
        res.status(500).json({
            success: false,
            error: err.message
        })
    }

    next();
});


export default app;