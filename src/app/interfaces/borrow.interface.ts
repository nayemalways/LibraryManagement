import { Model, Schema } from "mongoose";

export interface IBrrow {
    book: Schema.Types.ObjectId,
    quantity: Number,
    dueDate: Date
}

export interface ICopyStatic extends Model<IBrrow> {
    updateCopy(quantity: Number, bookId: String) : any
}

export interface IUpdateAvailable extends Model<IBrrow> {
    updateAvailable(copies: number) : any
}