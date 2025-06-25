import { model, Schema } from "mongoose";
import { IBrrow, ICopyStatic, IUpdateAvailable } from "../interfaces/borrow.interface";
import books from "./book.model";

const borrowSchema = new Schema<IBrrow, ICopyStatic>({
    book: {type: Schema.Types.ObjectId, ref: "book", required: [true, "Book id must be included"]},
    quantity: {type: Number, required: [true, "Quantity must included"]},
    dueDate: {type: Date, required: [true, "Due date must be inclued"]}
}, {
    timestamps: true,
    versionKey: false
})

// Static method
borrowSchema.static('updateCopy', async function(quantity, bookId) {
     await books.findOneAndUpdate(
        {_id: bookId},
        [
            {
                $set: {
                    copies: {$subtract: ["$copies", quantity]},
                    available: {
                        $cond: [
                             {$lte: [{$subtract: ["$copies", quantity]}, 0]},
                             false,
                             true
                        ]
                    }
                }
            }
        ]
     )
});

 

const borrow = model<IBrrow, ICopyStatic>('borrow', borrowSchema);

export default borrow;