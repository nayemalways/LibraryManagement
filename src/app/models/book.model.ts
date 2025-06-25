import {model, Schema} from 'mongoose';
import { Ibook } from '../interfaces/book.interface';

const bookSchema = new Schema<Ibook>({
    title: {
        type: String,
        required: [true, "Title must be included"],
        min: [5, "Title should be minumum 5 character"],
        trim: true
    },
    author: {
        type: String,
        required: [true, "Author name must be included"],
        min: [2, "Author name must be at least 2 character"],
        trim: true
    },
    genre: {
        type: String,
        uppercase: true,
        enum: {
            values: ["FICTION", "NON_FICTION", "SCIENCE", "HISTORY", "BIOGRAPHY", "FANTASY"],
            message: "Invalid genre"
        },
        required: [true, "genre must be included"]
    },
    isbn: {
        type: String,
        required: [true, "isbn must be included"]
    },
    description: {
        type: String, 
        min: [5, "Must be at least 5 character"]
    },
    copies: {
        type: Number,
        required: [true, "Must be included"],
        default: 0
    },
    available: {
        type: Boolean,
        required: true,
        default: true
    }

}, {
    versionKey: false,
    timestamps: true
})

const books = model('book', bookSchema);

export default books;