import { NextFunction, Request, Response } from "express";
import { bookData } from "../validation/validate";
import books from "../models/book.model";
import { SortOrder } from "mongoose";


// Book Create
export const createBook = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const payload =  bookData.parse(req.body);
        const postBook =  new books(payload);
        await postBook.save();

        res.status(201).json({
            success: true,
            message: "Book created successfully",
            data: postBook
        })
    } catch (error) {
        next(error);
    }
};

// Get all book
export const getAllBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { filter, sortby, sort, limit } = req.query;

    const genreFilter = typeof filter === 'string' ? { genre: filter.toUpperCase() } : {};
    const sortField = typeof sortby === 'string' ? sortby : 'createdAt';
    const sortOrder: SortOrder = sort === 'desc' ? -1 : 1;
    const limitNumber = limit ? parseInt(limit as string) : 10;

    const sortQuery: { [key: string]: SortOrder } = {};
    sortQuery[sortField] = sortOrder;

    const data = await books.find(genreFilter).sort(sortQuery).limit(limitNumber);

    res.json({
      success: true,
      message: "Books retrieved successfully",
      data
    });
  } catch (error) {
    next(error);
  }
};


// Get book by id
export const getBookById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { bookId } = req.params;
        const data = await books.findById(bookId);
        res.json({
            success: true,
            message: "Book retrieved successfully",
            data: data
        })
    } catch (error) {
        next(error);
    }
}

// Update book by id
export const updateBook = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {bookId} = req.params;
        const payload = req.body;
        const updateBook = await books.findByIdAndUpdate(bookId, payload, {new: true});
        res.json({
            success: true,
            message: "Book updated successfully",
            data: updateBook
        })
    } catch (error) {
        next(error);
    }
}

// Delete book by id
export const deleteBook = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {bookId} = req.params;
        await books.findByIdAndDelete(bookId);
        res.json({
            success: true,
            message: "Book deleted successfully",
            data: null
        })
    } catch (error) {
        next(error);
    }
}
