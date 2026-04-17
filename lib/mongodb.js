import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!global.mongooseConnection) {
  global.mongooseConnection = { conn: null, promise: null };
}

export async function connectToDatabase() {
  if (!MONGODB_URI) {
    throw new Error("MONGODB_URI is not defined.");
  }

  if (global.mongooseConnection.conn) {
    return global.mongooseConnection.conn;
  }

  if (!global.mongooseConnection.promise) {
    global.mongooseConnection.promise = mongoose
      .connect(MONGODB_URI, {
        bufferCommands: false,
        serverSelectionTimeoutMS: 3000,
        connectTimeoutMS: 3000,
        socketTimeoutMS: 5000,
      })
      .catch((error) => {
        global.mongooseConnection.promise = null;
        throw error;
      });
  }

  global.mongooseConnection.conn = await global.mongooseConnection.promise;
  return global.mongooseConnection.conn;
}

export function getMongoConfig() {
  const uri = process.env.MONGODB_URI || "";

  return {
    configured: Boolean(uri),
    isAtlas: uri.includes("mongodb+srv://"),
    maskedUri: uri
      ? uri.replace(/\/\/([^:]+):([^@]+)@/, "//***:***@")
      : "",
  };
}
