import app from "./app";
import mongoose from "mongoose";
import { STORAGE_TYPE, MONGO_URI, PORT } from "./config";
import { getStorageService } from "./services/storageFactory";

// Initialize storage service early to set up the instance
getStorageService();

// Only connect to MongoDB if using MongoDB storage
if (STORAGE_TYPE === "mongodb") {
  mongoose
    .connect(MONGO_URI)
    .then(() => {
      console.log("✅ Connected to MongoDB");
      app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
    })
    .catch((err) => {
      console.error("❌ Failed to connect to MongoDB", err);
      console.error("💡 Tip: Set STORAGE_TYPE=memory to use in-memory storage");
      process.exit(1);
    });
} else {
  // Using in-memory storage, no MongoDB needed
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
}
