import { NextFunction, Request, Response } from "express";
import borrow from './../models/borrow.model';
import books from "../models/book.model";


// Borrow A book
export const borrowAbook = async (req: Request, res: Response, next: NextFunction) => {
    try {
       let payload = req.body;
 
       // Get the actual book by book and met the quantity
       const verifyBookAvailable = await books.findOne({
        _id: payload.book,
        available: true,
        copies: {$gte: payload.quantity} 
       });

       // If don't have enough copies throw error
       if(verifyBookAvailable === null) throw new Error("Insufficient books copy");

       // Deducted quantity from document and 
       // update available to false using "Static method"
       borrow.updateCopy(payload.quantity, payload.book);

       // Create Borrow
       const borrowBook = await borrow.create(payload);

    

       res.json({
        success: true,
        message: "Book borrowed successfully",
        data: borrowBook
          
       })
    } catch (error) {
        next(error);
    }
}

// Book details
export const bookDetails = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const JoinStage = {$lookup: { from: "books", localField: "_id", foreignField: "_id", as: "book" }};
        const unwind = {$unwind: "$book"};
        const groupByBook = {
            $group: {
                _id: "$book",
                totalQuantity: { $sum: "$quantity"}
            }
        };
        const project = {
            $project: {
                _id: 0,
                book: {
                    title: "$book.title",
                    isbn: "$book.isbn"
                },
                totalQuantity: 1
            }
        }

        const data = await borrow.aggregate([
                groupByBook,
                JoinStage,
                unwind,
                project
                 
        ])

        res.json({
            success: true,
            message: "Borrowed books summary retrieved successfully",
            data: data
        })
    } catch (error) {
        next(error);
    }
}