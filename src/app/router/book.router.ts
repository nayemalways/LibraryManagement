import { Router } from "express";
import { createBook, deleteBook, getAllBook, getBookById, updateBook } from "../controllers/book.controller";

const bookRouter = Router();

bookRouter.post('/', createBook);
bookRouter.get('/', getAllBook);
bookRouter.get('/:bookId', getBookById);
bookRouter.put('/:bookId', updateBook);
bookRouter.delete('/:bookId', deleteBook);



export default bookRouter;