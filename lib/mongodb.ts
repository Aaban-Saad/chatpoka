// lib/mongodb.ts
import mongoose, { Mongoose } from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    throw new Error("Please define the MONGODB_URI environment variable");
}

interface MongooseGlobal {
    conn: Mongoose | null;
    promise: Promise<Mongoose> | null;
}

// Extend the NodeJS global type to include mongoose
declare global {
    // eslint-disable-next-line no-var
    var mongoose: MongooseGlobal | undefined;
}

let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

export async function connectToDatabase(): Promise<Mongoose> {
    if (!cached) {
        throw new Error("Mongoose cache is not initialized");
    }
    if (cached.conn) return cached.conn;

    if (!cached.promise) {
        cached.promise = mongoose.connect(MONGODB_URI as string, {
            bufferCommands: false,
        }).then((mongoose) => mongoose);
    }

    cached.conn = await cached.promise;

    console.log(">>>>>>>>>> Connected to MongoDB <<<<<<<<");
    // Uncomment the line below to enable Mongoose debug mode

    return cached.conn;
}
