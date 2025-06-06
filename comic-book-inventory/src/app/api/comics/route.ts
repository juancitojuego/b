import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import ComicBook from '@/models/ComicBook';

export async function GET(request: Request) {
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
    if (error.name === 'ValidationError') {
      return NextResponse.json({ message: 'Validation failed', errors: error.errors }, { status: 400 });
    }
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ message: 'Failed to create comic', error: errorMessage }, { status: 500 });
  }
}
