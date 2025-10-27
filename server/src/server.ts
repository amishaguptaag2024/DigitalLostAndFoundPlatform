import app from "./app";
import mongoose from "mongoose";

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/digital_lost_and_found";

mongoose
	.connect(MONGO_URI)
	.then(() => {
		app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
	})
	.catch((err) => {
		console.error("Failed to connect to MongoDB", err);
		// Still start the server (use in-memory or limited functionality) so dev can see endpoints fail gracefully
		app.listen(PORT, () => console.log(`Server running on port ${PORT} (no DB)`));
	});
