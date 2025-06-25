import { Router } from "express";
import { bookDetails, borrowAbook } from "../controllers/borrow.controller";

const borrowRouter = Router();

borrowRouter.post('/', borrowAbook);
borrowRouter.get('/', bookDetails);

export default borrowRouter;