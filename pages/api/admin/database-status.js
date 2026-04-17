import mongoose from "mongoose";
import { connectToDatabase, getMongoConfig } from "../../../lib/mongodb";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed." });
  }

  const config = getMongoConfig();

  if (!config.configured) {
    return res.status(200).json({
      configured: false,
      connected: false,
      isAtlas: false,
      maskedUri: "",
      message: "MONGODB_URI is not configured yet.",
    });
  }

  try {
    await connectToDatabase();

    return res.status(200).json({
      configured: true,
      connected: mongoose.connection.readyState === 1,
      isAtlas: config.isAtlas,
      maskedUri: config.maskedUri,
      message: config.isAtlas
        ? "MongoDB Atlas is connected."
        : "MongoDB is connected, but the URI does not look like an Atlas cluster.",
    });
  } catch (error) {
    return res.status(200).json({
      configured: true,
      connected: false,
      isAtlas: config.isAtlas,
      maskedUri: config.maskedUri,
      message: error.message || "Unable to connect to MongoDB.",
    });
  }
}
