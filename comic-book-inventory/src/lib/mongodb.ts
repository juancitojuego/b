import mongoose from 'mongoose';

// Placeholder for the MongoDB connection URI.
// IMPORTANT: This should be replaced with an environment variable in a real application.
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/comic_inventory_db';

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local or provide a default in mongodb.ts'
  );
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections from growing exponentially
 * during API Route usage.
 */
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) {
    console.log('MongoDB: Using existing connection.');
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false, // Disable command buffering if not connecting immediately
    };

    console.log('MongoDB: Attempting to connect...');
    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongooseInstance) => {
      console.log('MongoDB: Connection successful!');
      return mongooseInstance;
    }).catch(error => {
      console.error('MongoDB: Connection error:', error);
      cached.promise = null; // Reset promise on error to allow retry
      throw error; // Re-throw error to be caught by caller
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null; // Ensure promise is nullified on error so next call tries to reconnect
    throw e;
  }

  return cached.conn;
}

export default connectDB;
