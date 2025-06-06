import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import ComicBook from '@/models/ComicBook';

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

export async function GET() {
  try {
    await connectDB();
    const comics = await ComicBook.find({});
    return NextResponse.json(comics, { status: 200 });
  } catch (error) {
    console.error('Error fetching comics:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ message: 'Failed to fetch comics', error: errorMessage }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const data = await request.json();
    const newComic = new ComicBook(data);
    await newComic.save();
    return NextResponse.json(newComic, { status: 201 });
  } catch (error) {
    console.error('Error creating comic:', error);
    // Check if it's a Mongoose validation error
    if (error instanceof Error && error.name === 'ValidationError') {
      const validationError = error as MongooseValidationError;
      return NextResponse.json({ message: 'Validation failed', errors: validationError.errors }, { status: 400 });
    }
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ message: 'Failed to create comic', error: errorMessage }, { status: 500 });
  }
}
