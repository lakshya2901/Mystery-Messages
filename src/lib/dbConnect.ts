import mongoose from "mongoose";

type ConnectionObject = {
    isConnected?: number;
}

// Global cached connection object
const connection: ConnectionObject = {};

async function dbConnect(): Promise<void> {
    // If we're already connected, return early
    if(connection.isConnected) {
        console.log("Already connected to database");
        return;
    }

    // Check if MONGODB_URI is defined
    if (!process.env.MONGODB_URI) {
        throw new Error("MONGODB_URI not defined in environment variables");
    }

    try {
        // Set connection options to help with timeouts
        const options = {
            connectTimeoutMS: 10000, // 10 seconds connection timeout
            socketTimeoutMS: 30000,  // 30 seconds socket timeout
            serverSelectionTimeoutMS: 10000, // 10 seconds server selection timeout
            heartbeatFrequencyMS: 10000, // Heartbeat every 10 seconds
            retryWrites: true,
            maxPoolSize: 10, // Maintain up to 10 connections
        };

        // Connect to MongoDB
        const db = await mongoose.connect(process.env.MONGODB_URI, options);
        
        // Update connection state
        connection.isConnected = db.connections[0].readyState;
        
        console.log("Connected to database");
    } catch (error) {
        console.log("Error connecting to database: ", error);
        // Don't exit process in production as this will terminate the serverless function
        if (process.env.NODE_ENV === "development") {
            process.exit(1);
        }
    }
}

export default dbConnect;