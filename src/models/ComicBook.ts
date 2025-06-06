import mongoose, { Schema, Document } from 'mongoose';

// Define the interface for the ComicBook document
export interface IComicBook extends Document {
  title: string;
  author: string;
  publisher?: string; // Optional field
  quantity: number;
  price: number;
  createdAt: Date;
  updatedAt: Date;
}

// Define the Mongoose schema for ComicBook
const ComicBookSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    publisher: {
      type: String,
    },
    quantity: {
      type: Number,
      required: true,
      default: 0,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  {
    // Enable automatic timestamps (createdAt, updatedAt)
    timestamps: true,
  }
);

// Create and export the Mongoose model
// Check if the model already exists to prevent OverwriteModelError
const ComicBook = mongoose.models.ComicBook || mongoose.model<IComicBook>('ComicBook', ComicBookSchema);

export default ComicBook;
