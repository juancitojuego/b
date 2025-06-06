import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import ComicBook from '@/models/ComicBook';
import mongoose from 'mongoose';

// Define a minimal interface for Mongoose's ValidatorError properties
interface ValidatorError {
  message: string;
  name: string;
  kind?: string;
  path?: string;
  value?: unknown; // The value that failed validation can be of any type, use unknown for type safety
}

// Define a minimal interface for Mongoose's ValidationError
interface MongooseValidationError extends Error {
  errors: { [path: string]: ValidatorError };
}

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json({ message: 'Invalid comic ID format' }, { status: 400 });
  }

  try {
    await connectDB();
    const comic = await ComicBook.findById(id);

    if (!comic) {
      return NextResponse.json({ message: 'Comic not found' }, { status: 404 });
    }

    return NextResponse.json(comic, { status: 200 });
  } catch (error) {
    console.error(`Error fetching comic with ID ${id}:`, error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    if (error instanceof Error && error.name === 'CastError') { // Mongoose CastError for invalid ID format during query
        return NextResponse.json({ message: 'Invalid comic ID format', error: errorMessage }, { status: 400 });
    }
    return NextResponse.json({ message: 'Failed to fetch comic', error: errorMessage }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json({ message: 'Invalid comic ID format' }, { status: 400 });
  }

  try {
    await connectDB();
    const data = await request.json();

    // Ensure `updatedAt` is updated by Mongoose, even if not explicitly in data
    data.updatedAt = new Date();

    const updatedComic = await ComicBook.findByIdAndUpdate(id, data, {
      new: true, // Return the modified document rather than the original
      runValidators: true, // Ensure schema validations are run on update
    });

    if (!updatedComic) {
      return NextResponse.json({ message: 'Comic not found' }, { status: 404 });
    }

    return NextResponse.json(updatedComic, { status: 200 });
  } catch (error) {
    console.error(`Error updating comic with ID ${id}:`, error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    if (error instanceof Error && error.name === 'ValidationError') {
      const validationError = error as MongooseValidationError;
      return NextResponse.json({ message: 'Validation failed', errors: validationError.errors }, { status: 400 });
    }
    if (error instanceof Error && error.name === 'CastError') {
      return NextResponse.json({ message: 'Invalid comic ID format or data', error: errorMessage }, { status: 400 });
    }
    return NextResponse.json({ message: 'Failed to update comic', error: errorMessage }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json({ message: 'Invalid comic ID format' }, { status: 400 });
  }

  try {
    await connectDB();
    const deletedComic = await ComicBook.findByIdAndDelete(id);

    if (!deletedComic) {
      return NextResponse.json({ message: 'Comic not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Comic deleted successfully', comic: deletedComic }, { status: 200 });
  } catch (error) {
    console.error(`Error deleting comic with ID ${id}:`, error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
     if (error instanceof Error && error.name === 'CastError') { // Should be caught by isValid check, but good as a safeguard
        return NextResponse.json({ message: 'Invalid comic ID format', error: errorMessage }, { status: 400 });
    }
    return NextResponse.json({ message: 'Failed to delete comic', error: errorMessage }, { status: 500 });
  }
}
