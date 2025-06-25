export interface Ibook {
    title: String,
    author: String,
    genre: "FICTION" | "NON_FICTION" | "SCIENCE" | "HISTORY" | "BIOGRAPHY" | "FANTASY",
    isbn: Number,
    description: String,
    copies: Number,
    available: Boolean
}