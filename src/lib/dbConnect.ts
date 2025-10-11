import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
    throw new Error(
        "⚠️ Please define the MONGODB_URI environment variable in .env.local"
    );
}

/* Maintain cached connection across hot reloads in development */
let cached = (global as any).mongoose;

if (!cached) {
    cached = (global as any).mongoose = { conn: null, promise: null };
}

export async function dbConnect() {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        const opts = {
            bufferCommands: false,
            dbName: "local_blog", // You can rename this
        };

        cached.promise = mongoose
            .connect(MONGODB_URI, opts)
            .then((mongoose) => mongoose);
    }

    if (mongoose.connection.readyState >= 1) {
        console.log("✅ Using existing database connection");
        return;
    }

    try {
        await mongoose.connect(MONGODB_URI);
        console.log("✅ New database connection established");
    } catch (e) {
        console.error("❌ Database connection error:", e);
        throw e;
    }

    try {
        cached.conn = await cached.promise;
    } catch (e) {
        cached.promise = null;
        throw e;
    }

    return cached.conn;
}
