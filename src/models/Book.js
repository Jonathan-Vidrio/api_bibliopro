import { Schema, model } from 'mongoose';

const bookSchema = new Schema({
    title: String,
    isbn: String,
    author: [{
        ref: "Author",
        type: Schema.Types.ObjectId
    }],
    category: [{
        ref: "Category",
        type: Schema.Types.ObjectId
    }],
    editorial: [{
        ref: "Editorial",
        type: Schema.Types.ObjectId
    }],
    stock: Number,
    pages: Number,
    description: String,
    status: {
        type: Boolean,
        default: true
    }
});